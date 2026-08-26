/**
 * Generador de imágenes para el cuerpo de un artículo del blog.
 * Inyecta <figure data-ai-body-image="1"> tras los H2 elegidos por el planner.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import sharp from "sharp";
import {
  OPENAI_IMAGE_MODEL as DEFAULT_IMAGE_MODEL,
  OPENAI_TEXT_MODEL as DEFAULT_TEXT_MODEL,
  chatCompletionConfig,
  chatMessageText,
} from "@/lib/openai-config";
import {
  asSingleRelation,
  cleanPrompt,
  collapseWhitespace,
  parseArticleUrl,
  safeJsonParse,
  slugifyEs,
  stripHtml,
  truncate,
} from "@/lib/blog/blog-html-utils";
import { SITE_URL } from "@/lib/structuredData";

const OPENAI_TEXT_MODEL =
  process.env.BLOG_BODY_TEXT_MODEL?.trim() || process.env.BLOG_COVER_TEXT_MODEL?.trim() || DEFAULT_TEXT_MODEL;
const OPENAI_IMAGE_MODEL =
  process.env.BLOG_BODY_IMAGE_MODEL?.trim() || process.env.BLOG_COVER_IMAGE_MODEL?.trim() || DEFAULT_IMAGE_MODEL;
const IMAGE_SIZE = "1536x1024";
const BLOG_BUCKET = "blog-images";
const MIN_BODY_IMAGES = 2;
const MAX_BODY_IMAGES_HARD = 4;
const BLOG_BODY_WEBP_QUALITY = (() => {
  const raw = process.env.BLOG_BODY_WEBP_QUALITY?.trim();
  if (!raw) return 85;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 && n <= 100 ? n : 85;
})();

type BodyPost = {
  id: string;
  titulo: string | null;
  slug: string | null;
  resumen: string | null;
  contenido: string | null;
  imagen_destacada: string | null;
  meta_descripcion: string | null;
  meta_keywords: string[] | null;
  tiempo_lectura: number | null;
  tags: string[] | null;
  categoria: {
    id: string;
    nombre: string | null;
    slug: string | null;
  } | null;
};

type H2Section = {
  anchorIndex: number;
  text: string;
  slug: string;
  matchStart: number;
  matchEnd: number;
};

export type BodySceneType = "architecture" | "interior" | "human_experience" | "detail";

type PlanItem = {
  anchor_index: number;
  scene_type: BodySceneType;
  section_focus: string;
  alt_es: string;
  caption_es: string;
  draft_prompt: string;
};

type FinalImagePlan = PlanItem & {
  anchor_slug: string;
  anchor_text: string;
  final_prompt: string;
};

type GeneratedImage = {
  publicUrl: string;
  storagePath: string;
};

export type BodyImagesManifestItem = {
  anchor_slug: string;
  anchor_index: number;
  anchor_text: string;
  url: string;
  storage_path: string;
  alt_es: string;
  caption_es: string;
  scene_type: BodySceneType;
  prompt: string;
  generated_at: string;
};

const IMAGE_REALISM_TAIL =
  "Tomada como fotografia real con camara full frame profesional, luz existente creible, color natural, texturas de obra y materiales autenticos, sin HDR agresivo, sin render 3D, sin ilustracion, sin tipografia y sin logotipos.";

const PROMPT_BODY_PLANNER_SYSTEM = `Eres un editor visual senior y planner de imagenes interiores para articulos del blog de Alemán y Pajarón (arquitectura, licencias y reformas en Murcia).

Recibes un DOSSIER, una LISTA DE SECCIONES H2 y TARGET_IMAGE_COUNT.

Para cada imagen decide un scene_type:
- "architecture": fachada, calle, edificio u obra vista desde fuera.
- "interior": espacio interior (reforma, local, vivienda, cocina, baño).
- "human_experience": personas haciendo algo concreto (reunion, visita de obra, midiendo).
- "detail": planos, muestras, herramientas, documentacion. Sin persona de cuerpo entero.

Reglas:
- Reparte las imagenes; no elijas dos H2 consecutivos si puedes evitarlo. Si hay >=4 H2, evita el H2 0 (compite con la portada).
- Al menos UNA imagen debe usar un scene_type distinto al de la portada si se indica COVER_SCENE_TYPE.
- Honestidad geografica: si la seccion menciona Murcia o un local concreto, la escena debe ser coherente.
- Cada draft_prompt debe ser un parrafo en espanol, fotografico, concreto.

Devuelve UNICA Y EXCLUSIVAMENTE un JSON:
{
  "items": [
    {
      "anchor_index": <int>,
      "scene_type": "architecture" | "interior" | "human_experience" | "detail",
      "section_focus": "<frase corta>",
      "alt_es": "<alt descriptivo, 60-140 caracteres>",
      "caption_es": "<pie de foto, 60-160 caracteres>",
      "draft_prompt": "<parrafo fotografico en espanol>"
    }
  ]
}`;

const PROMPT_BODY_REFINER_SYSTEM = `Eres un editor fotografico especializado en imagenes interiores de articulo (no portadas) para el blog de Alemán y Pajarón.

REESCRIBE el draft a un solo parrafo en espanol que parezca una FOTOGRAFIA REAL de arquitectura o reforma.

Debe diferenciarse de la portada en encuadre, hora del dia o atmosfera.
Empieza por "Fotografia hiperrealista y cinematografica de".
Sin markdown, sin listas, sin explicaciones.`;

function createServiceSupabase(): SupabaseClient {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function loadPostById(supabase: SupabaseClient, postId: string): Promise<BodyPost> {
  const { data, error } = await supabase
    .from("blog_articulos")
    .select(
      `id, titulo, slug, resumen, contenido, imagen_destacada, meta_descripcion, meta_keywords, tiempo_lectura, tags,
       categoria:categorias_blog(id, nombre, slug)`
    )
    .eq("id", postId)
    .single();
  if (error || !data) {
    throw new Error(error?.message || "No se pudo cargar el artículo");
  }
  return {
    ...(data as Omit<BodyPost, "categoria">),
    categoria: asSingleRelation((data as { categoria?: BodyPost["categoria"] | BodyPost["categoria"][] }).categoria),
  };
}

async function loadPostByUrl(supabase: SupabaseClient, articleUrl: string) {
  const parsed = parseArticleUrl(articleUrl);
  const { data, error } = await supabase
    .from("blog_articulos")
    .select(
      `id, titulo, slug, resumen, contenido, imagen_destacada, meta_descripcion, meta_keywords, tiempo_lectura, tags,
       categoria:categorias_blog(id, nombre, slug)`
    )
    .eq("slug", parsed.slug)
    .single();
  if (error || !data) {
    throw new Error(error?.message || "No se encontró el artículo asociado a la URL");
  }
  return {
    post: {
      ...(data as Omit<BodyPost, "categoria">),
      categoria: asSingleRelation((data as { categoria?: BodyPost["categoria"] | BodyPost["categoria"][] }).categoria),
    },
    canonicalUrl: parsed.canonicalUrl,
  };
}

function findH2Sections(html: string): H2Section[] {
  const sections: H2Section[] = [];
  if (!html) return sections;
  const pattern = /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    if (!text) continue;
    sections.push({
      anchorIndex: i,
      text,
      slug: slugifyEs(text),
      matchStart: match.index,
      matchEnd: match.index + match[0].length,
    });
    i += 1;
  }
  return sections;
}

function stripExistingAiBodyFigures(html: string): string {
  return html.replace(/<figure[^>]*data-ai-body-image="1"[^>]*>[\s\S]*?<\/figure>\s*/gi, "");
}

function hasExistingAiBodyFigures(html: string): boolean {
  return /data-ai-body-image="1"/i.test(html);
}

function escapeHtmlAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeHtmlText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildFigureHtml(plan: FinalImagePlan, gen: GeneratedImage): string {
  const alt = escapeHtmlAttribute(plan.alt_es);
  const caption = escapeHtmlText(plan.caption_es);
  const anchor = escapeHtmlAttribute(plan.anchor_slug);
  return `<figure data-ai-body-image="1" data-anchor="${anchor}"><img src="${gen.publicUrl}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
}

function injectFiguresAfterH2(
  html: string,
  plans: FinalImagePlan[],
  generated: (GeneratedImage | null)[]
): string {
  const cleaned = stripExistingAiBodyFigures(html);
  const h2s = findH2Sections(cleaned);

  const insertions = plans
    .map((plan, idx) => ({ plan, gen: generated[idx] }))
    .filter((entry): entry is { plan: FinalImagePlan; gen: GeneratedImage } => Boolean(entry.gen))
    .sort((a, b) => b.plan.anchor_index - a.plan.anchor_index);

  let out = cleaned;
  for (const { plan, gen } of insertions) {
    const target = h2s[plan.anchor_index];
    if (!target) continue;
    const figure = buildFigureHtml(plan, gen);
    out = `${out.slice(0, target.matchEnd)}\n\n${figure}\n${out.slice(target.matchEnd)}`;
  }
  return out;
}

function decideTargetImageCount(post: BodyPost): number {
  const wordCount = stripHtml(post.contenido).split(/\s+/).filter(Boolean).length;
  if (wordCount >= 800) return 3;
  return 2;
}

function buildBodyDossier(
  post: BodyPost,
  canonicalUrl: string | undefined,
  h2List: H2Section[],
  targetCount: number,
  coverPromptHint?: string,
  coverSceneType?: string
) {
  const headings = h2List
    .map((h2) => `- [${h2.anchorIndex}] ${h2.text}`)
    .join("\n");
  return collapseWhitespace(`
TITULO: ${post.titulo || ""}
RESUMEN: ${post.resumen || post.meta_descripcion || ""}
CATEGORIA: ${post.categoria?.nombre || "Blog"}
KEYWORDS: ${(post.meta_keywords || post.tags || []).join(", ")}
URL: ${canonicalUrl || `${SITE_URL}/blog/${post.slug || ""}`}
COVER_SCENE_TYPE: ${coverSceneType || "desconocido"}
COHERENCIA_PORTADA: ${coverPromptHint ? truncate(coverPromptHint, 500) : "no disponible"}
TARGET_IMAGE_COUNT: ${targetCount}

CONTENIDO:
${truncate(stripHtml(post.contenido), 3500)}

SECCIONES H2:
${headings}
`);
}

function validatePlan(parsed: { items?: unknown[] } | null, h2Count: number, targetCount: number): PlanItem[] {
  const items = Array.isArray(parsed?.items) ? parsed!.items! : [];
  const seen = new Set<number>();
  const validated: PlanItem[] = [];
  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Record<string, unknown>;
    const anchor = Number(item.anchor_index);
    const scene = String(item.scene_type || "");
    if (!Number.isInteger(anchor) || anchor < 0 || anchor >= h2Count || seen.has(anchor)) continue;
    if (!["architecture", "interior", "human_experience", "detail"].includes(scene)) continue;
    seen.add(anchor);
    validated.push({
      anchor_index: anchor,
      scene_type: scene as BodySceneType,
      section_focus: String(item.section_focus || "").slice(0, 200),
      alt_es: String(item.alt_es || "").slice(0, 160),
      caption_es: String(item.caption_es || "").slice(0, 180),
      draft_prompt: String(item.draft_prompt || ""),
    });
  }
  if (validated.length === 0) {
    throw new Error("El planner no devolvió ningún item válido");
  }
  return validated.slice(0, Math.min(targetCount, MAX_BODY_IMAGES_HARD));
}

async function callPlanner(openai: OpenAI, dossier: string, h2Count: number, targetCount: number) {
  const completion = await openai.chat.completions.create({
    ...chatCompletionConfig({
      model: OPENAI_TEXT_MODEL,
      temperature: 0.32,
      maxTokens: 2500,
      reasoningEffort: "low",
      json: true,
    }),
    messages: [
      { role: "system", content: PROMPT_BODY_PLANNER_SYSTEM },
      { role: "user", content: dossier },
    ],
  });
  return validatePlan(safeJsonParse<{ items: unknown[] }>(chatMessageText(completion)), h2Count, targetCount);
}

async function refinePromptForImage(
  openai: OpenAI,
  ctx: { title: string; sectionText: string; draftPrompt: string; sceneType: BodySceneType; coverPromptHint?: string }
) {
  const completion = await openai.chat.completions.create({
    ...chatCompletionConfig({
      model: OPENAI_TEXT_MODEL,
      temperature: 0.18,
      maxTokens: 1400,
      reasoningEffort: "low",
    }),
    messages: [
      { role: "system", content: PROMPT_BODY_REFINER_SYSTEM },
      {
        role: "user",
        content: collapseWhitespace(`
TITULO_ARTICULO: ${ctx.title}
SECCION (H2): ${ctx.sectionText}
DRAFT_PROMPT: ${ctx.draftPrompt}
SCENE_TYPE: ${ctx.sceneType}
COHERENCIA_PORTADA: ${ctx.coverPromptHint ? truncate(ctx.coverPromptHint, 600) : "(no disponible)"}
`),
      },
    ],
  });
  const refined = cleanPrompt(chatMessageText(completion));
  if (refined.length < 120) {
    throw new Error("El refiner devolvió un prompt demasiado corto");
  }
  return truncate(cleanPrompt(`${refined} ${IMAGE_REALISM_TAIL}`), 4000);
}

async function generateSingleBodyImageBuffer(openai: OpenAI, prompt: string): Promise<Buffer> {
  const result = await openai.images.generate({
    model: OPENAI_IMAGE_MODEL,
    prompt,
    size: IMAGE_SIZE,
    quality: "high",
    output_format: "png",
    n: 1,
  });
  const b64 = result.data?.[0]?.b64_json;
  if (!b64) {
    throw new Error("OpenAI no devolvió datos de imagen body en base64");
  }
  return Buffer.from(b64, "base64");
}

async function uploadBodyImageToStorage(
  supabase: SupabaseClient,
  post: BodyPost,
  imageBuffer: Buffer,
  index: number
): Promise<GeneratedImage> {
  const webpBuffer = await sharp(imageBuffer)
    .webp({ quality: BLOG_BODY_WEBP_QUALITY, effort: 6, smartSubsample: true })
    .toBuffer();
  const timestamp = Date.now();
  const safeSlug = (post.slug || post.id || "articulo")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  const filePath = `ai-body/${safeSlug}-${index + 1}-${timestamp}.webp`;

  const { error: uploadError } = await supabase.storage.from(BLOG_BUCKET).upload(filePath, webpBuffer, {
    cacheControl: "2592000",
    contentType: "image/webp",
    upsert: false,
  });
  if (uploadError) {
    throw new Error(`Error subiendo imagen body: ${uploadError.message}`);
  }
  const {
    data: { publicUrl },
  } = supabase.storage.from(BLOG_BUCKET).getPublicUrl(filePath);
  if (!publicUrl) {
    throw new Error("No se pudo obtener la URL pública de la imagen body");
  }
  return { publicUrl, storagePath: filePath };
}

export type GenerateBodyImagesInput = {
  postId?: string;
  articleUrl?: string;
  coverPromptHint?: string;
  coverSceneType?: string;
  forceRegenerate?: boolean;
  maxImages?: number;
};

export type GenerateBodyImagesResult = {
  ok: true;
  postId: string;
  title: string | null;
  content: string;
  insertedCount: number;
  manifest: BodyImagesManifestItem[];
  skippedReason?: string;
};

export async function generateBlogBodyImagesFromTarget(
  input: GenerateBodyImagesInput
): Promise<GenerateBodyImagesResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Falta OPENAI_API_KEY en el entorno");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en el entorno");
  }

  const supabase = createServiceSupabase();
  const { postId, articleUrl, forceRegenerate = false } = input;
  if (!postId && !articleUrl) {
    throw new Error("Debes indicar postId o articleUrl");
  }

  const loaded = postId
    ? { post: await loadPostById(supabase, postId), canonicalUrl: articleUrl }
    : await loadPostByUrl(supabase, articleUrl!);
  const post = loaded.post;

  if (!post.contenido) {
    return {
      ok: true,
      postId: post.id,
      title: post.titulo,
      content: "",
      insertedCount: 0,
      manifest: [],
      skippedReason: "El artículo no tiene contenido HTML",
    };
  }

  const h2List = findH2Sections(post.contenido);
  if (h2List.length < MIN_BODY_IMAGES) {
    return {
      ok: true,
      postId: post.id,
      title: post.titulo,
      content: post.contenido,
      insertedCount: 0,
      manifest: [],
      skippedReason: `El artículo solo tiene ${h2List.length} secciones <h2> (se necesitan al menos ${MIN_BODY_IMAGES}).`,
    };
  }

  if (hasExistingAiBodyFigures(post.contenido) && !forceRegenerate) {
    return {
      ok: true,
      postId: post.id,
      title: post.titulo,
      content: post.contenido,
      insertedCount: 0,
      manifest: [],
      skippedReason: "Ya existen imágenes de cuerpo. Usa forceRegenerate para sobreescribir.",
    };
  }

  const targetCount = Math.min(
    Math.max(decideTargetImageCount(post), MIN_BODY_IMAGES),
    Math.min(input.maxImages ?? MAX_BODY_IMAGES_HARD, MAX_BODY_IMAGES_HARD, h2List.length)
  );

  const dossier = buildBodyDossier(
    post,
    loaded.canonicalUrl,
    h2List,
    targetCount,
    input.coverPromptHint,
    input.coverSceneType
  );

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  console.log(`[BLOG-BODY] Artículo: ${post.titulo}`);
  console.log(`[BLOG-BODY] H2 detectados: ${h2List.length}; objetivo: ${targetCount}`);

  let planItems = await callPlanner(openai, dossier, h2List.length, targetCount);
  if (planItems.length === 0) {
    throw new Error("El planner no devolvió anclas");
  }

  const finalPlans: FinalImagePlan[] = [];
  for (const item of planItems) {
    const targetH2 = h2List[item.anchor_index];
    const finalPrompt = await refinePromptForImage(openai, {
      title: post.titulo || "",
      sectionText: targetH2?.text || "",
      draftPrompt: item.draft_prompt,
      sceneType: item.scene_type,
      coverPromptHint: input.coverPromptHint,
    });
    finalPlans.push({
      ...item,
      anchor_slug: targetH2?.slug || `h2-${item.anchor_index}`,
      anchor_text: targetH2?.text || "",
      final_prompt: finalPrompt,
    });
  }

  const generated: (GeneratedImage | null)[] = [];
  const manifest: BodyImagesManifestItem[] = [];
  for (let i = 0; i < finalPlans.length; i += 1) {
    const plan = finalPlans[i];
    try {
      console.log(
        `[BLOG-BODY] Generando imagen ${i + 1}/${finalPlans.length} (H2 ${plan.anchor_index}: ${plan.anchor_text})`
      );
      const buffer = await generateSingleBodyImageBuffer(openai, plan.final_prompt);
      const uploaded = await uploadBodyImageToStorage(supabase, post, buffer, i);
      generated.push(uploaded);
      manifest.push({
        anchor_slug: plan.anchor_slug,
        anchor_index: plan.anchor_index,
        anchor_text: plan.anchor_text,
        url: uploaded.publicUrl,
        storage_path: uploaded.storagePath,
        alt_es: plan.alt_es,
        caption_es: plan.caption_es,
        scene_type: plan.scene_type,
        prompt: plan.final_prompt,
        generated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.warn(`[BLOG-BODY] Fallo en imagen ${i + 1}:`, error);
      generated.push(null);
    }
  }

  const insertedCount = generated.filter(Boolean).length;
  if (insertedCount === 0) {
    throw new Error("No se pudo generar ninguna imagen de cuerpo");
  }

  const updatedHtml = injectFiguresAfterH2(post.contenido || "", finalPlans, generated);
  const { error: updateError } = await supabase
    .from("blog_articulos")
    .update({
      contenido: updatedHtml,
      actualizado_at: new Date().toISOString(),
    })
    .eq("id", post.id);

  if (updateError) {
    throw new Error(`No se pudo guardar el contenido actualizado: ${updateError.message}`);
  }

  return {
    ok: true,
    postId: post.id,
    title: post.titulo,
    content: updatedHtml,
    insertedCount,
    manifest,
  };
}
