/**
 * Generación de portadas de blog con IA.
 * OpenAI devuelve PNG; antes de subir a Supabase se convierte a WebP.
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
  stripHtml,
  truncate,
} from "@/lib/blog/blog-html-utils";
import { SITE_URL } from "@/lib/structuredData";

const OPENAI_TEXT_MODEL = process.env.BLOG_COVER_TEXT_MODEL?.trim() || DEFAULT_TEXT_MODEL;
const OPENAI_IMAGE_MODEL = process.env.BLOG_COVER_IMAGE_MODEL?.trim() || DEFAULT_IMAGE_MODEL;
const IMAGE_SIZE = "1536x1024";
const BLOG_BUCKET = "blog-images";
const BLOG_COVER_WEBP_QUALITY = (() => {
  const raw = process.env.BLOG_COVER_WEBP_QUALITY?.trim();
  if (!raw) return 85;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 1 && n <= 100 ? n : 85;
})();

export type CoverSceneType = "architecture" | "interior" | "human_experience" | "detail";

const COVER_SCENE_TYPES: CoverSceneType[] = ["architecture", "interior", "human_experience", "detail"];

const SCENE_CLASSIFIER_SYSTEM = `Eres el director de arte del blog de Alemán y Pajarón (estudio de arquitectura, licencias y reformas en Murcia). El listing de portadas se lee como un feed: cada imagen debe evocar una IDEA distinta.

Recibes un DOSSIER del articulo y, si existe, una AUDITORIA VISUAL de las 5 portadas mas recientes. Elige el registro que FALTA en ese feed y que aun asi encaja con el articulo.

Tu unica salida es un JSON valido EXACTAMENTE con esta forma:
{
  "scene_type": "architecture" | "interior" | "human_experience" | "detail",
  "visual_idea": "<una escena concreta, fotografiable, de 12-28 palabras, distinta de las 5 ultimas>",
  "rationale": "<frase corta: que tropo reciente evitas y que idea nueva aporta esta portada>"
}

Registros:
- "architecture": fachada, calle, edificio, obra o entorno urbano de Murcia/España. Sin planos flotantes.
- "interior": espacio reformado o en obra (vivienda, local, cocina, baño, clinica). Luz real, materiales visibles.
- "human_experience": personas HACIENDO algo concreto (reunion con planos, visita de obra, midiendo, eligiendo materiales). Rostros no protagonistas; sin contacto visual con la camara.
- "detail": still life de planos, muestras de material, herramientas, carpeta de licencia, azulejos, madera. Sin persona de cuerpo entero.

PROHIBIDO SIEMPRE:
- Texto legible, logotipos, marcas, renders 3D, ilustracion, collage, interfaces.
- Stock de "arquitecto sonriendo a camara", casco amarillo heroico, skyline generico de Dubai.
- Golden hour de catalogo si las portadas recientes ya lo usan.

Devuelve SOLO el JSON, sin markdown.`;

const PROMPT_BUILDER_SYSTEM_BASE = `Eres un agente senior: director de arte y especialista en prompts para generacion de imagenes fotorrealistas. Recibes un DOSSIER COMPLETO de un articulo del blog de Alemán y Pajarón y un SCENE_TYPE ya decidido. Tu UNICA salida es UN parrafo en espanol que el modelo de imagen usara tal cual.

ANTES de escribir, piensa mentalmente y no lo imprimas:
1. Lee la auditoria de las 5 portadas recientes y SALTE de esos tropos.
2. Si el dossier trae "Idea visual obligatoria", ESA es la escena.
3. Elige UNA escena concreta, fotografiable y honesta, alineada con el articulo y con el SCENE_TYPE.
4. Introduce 2-4 materiales o texturas reales (yeso, ladrillo, madera, acero, papel de plano, hormigon, azulejo).
5. Piensa como fotografo de revista de arquitectura, no como generador de stock.

CLICHES PROHIBIDOS:
- Arquitecto de stock sonriendo a camara con casco amarillo.
- Render 3D, ilustracion, maqueta CGI, collage de planos flotantes.
- Texto legible, logotipos, marcas, interfaces.
- Skyline generico que no sea Murcia/España si el articulo es local.

REGLAS POR SCENE_TYPE:

[scene_type=architecture]
- Fachada, calle, edificio o entorno urbano creible. Murcia o España mediterranea cuando el tema lo pida.

[scene_type=interior]
- Espacio real: reforma, local, vivienda. Materiales visibles. Luz existente.

[scene_type=human_experience]
- Personas haciendo algo concreto. Sin pose de catalogo. Sin contacto visual.

[scene_type=detail]
- Escala de mesa o manos: planos, muestras, herramientas. Sin persona de cuerpo entero.

FORMATO DE SALIDA:
- Exactamente UN parrafo en espanol.
- Sin comillas, sin markdown, sin listas y sin saltos de linea.
- Debe empezar con: Fotografia hiperrealista y cinematografica de
- Debe integrar en su cierre: composicion editorial premium, profundidad de campo natural, texturas realistas, encuadre horizontal amplio, sin texto ni logos, realismo fotografico absoluto, portada web de alta conversion.`;

const PROMPT_REFINER_SYSTEM_BASE = `Eres un editor fotografico obsesionado con el hiperrealismo y con que el feed del blog no se repita. Recibiras un DOSSIER, un SCENE_TYPE y un primer prompt.

REESCRIBE el prompt para que parezca una fotografia real, RESPETANDO el SCENE_TYPE y la idea visual del dossier.

Prioridades:
- Debe parecer FOTO REAL, no arte generativo.
- Rebaja catalogo, glow, HDR, sonrisas, simetria.
- Luz existente, materiales concretos, composicion editorial sobria.

Reglas:
- Un parrafo en espanol, sin explicaciones.
- Debe empezar por "Fotografia hiperrealista y cinematografica de".`;

const IMAGE_REALISM_TAIL =
  "Tomada como fotografia real con camara full frame profesional y optica de reportaje de alta calidad, luz existente fisicamente creible, color natural y balance de blancos realista, contraste moderado, grano minimo natural, detalle autentico en materiales de construccion, papel, madera, metal o yeso segun la escena; siempre luminosa, clara y util para portada editorial horizontal de blog, sin HDR agresivo, sin acabado plastico, sin render 3D, sin pintura digital, sin ilustracion, sin tipografia y sin logotipos.";

type CoverPost = {
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

type RecentCoverRow = {
  id: string;
  titulo: string | null;
  imagen_destacada: string | null;
};

type CoverFeedAudit = {
  covers: Array<{ title: string; trope: string; one_liner: string }>;
  missingRegisters: string[];
  brief: string;
};

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

async function loadPostById(supabase: SupabaseClient, postId: string): Promise<CoverPost> {
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
    ...(data as Omit<CoverPost, "categoria">),
    categoria: asSingleRelation((data as { categoria?: CoverPost["categoria"] | CoverPost["categoria"][] }).categoria),
  };
}

async function loadPostByUrl(supabase: SupabaseClient, articleUrl: string) {
  const parsed = parseArticleUrl(articleUrl);
  const post = await supabase
    .from("blog_articulos")
    .select(
      `id, titulo, slug, resumen, contenido, imagen_destacada, meta_descripcion, meta_keywords, tiempo_lectura, tags,
       categoria:categorias_blog(id, nombre, slug)`
    )
    .eq("slug", parsed.slug)
    .single();
  if (post.error || !post.data) {
    throw new Error(post.error?.message || "No se encontró el artículo asociado a la URL");
  }
  return {
    post: {
      ...(post.data as Omit<CoverPost, "categoria">),
      categoria: asSingleRelation((post.data as { categoria?: CoverPost["categoria"] | CoverPost["categoria"][] }).categoria),
    },
    canonicalUrl: parsed.canonicalUrl,
  };
}

function buildDossier(
  post: CoverPost,
  articleUrl?: string,
  options?: { sceneType?: CoverSceneType; sceneFocus?: string; feedAudit?: CoverFeedAudit }
) {
  const plainContent = truncate(stripHtml(post.contenido), 4200);
  const excerpt = collapseWhitespace(post.resumen || post.meta_descripcion || "");
  const keywords = collapseWhitespace(
    [post.meta_keywords?.join(", ") || "", post.tags?.join(", ") || "", post.categoria?.nombre || ""]
      .filter(Boolean)
      .join(", ")
  );
  const editorBrief = options?.sceneFocus?.trim()
    ? `\n--- Idea visual obligatoria del editor ---\n${options.sceneFocus.trim()}`
    : "";
  const diversityBrief = options?.feedAudit?.brief || "";

  return collapseWhitespace(`
=== DOSSIER DEL ARTICULO ===
Titulo: ${post.titulo || ""}
Resumen: ${excerpt || "Sin resumen disponible"}
Descripcion:
${plainContent || "Sin contenido disponible"}

--- Marca y contexto ---
Marca: Alemán y Pajarón
Tipo de contenido: articulo del blog corporativo sobre arquitectura, licencias, reformas y normativa en Murcia
Objetivo visual: portada horizontal premium para cabecera de articulo web y Open Graph
Tono de marca: profesional, cercano, tecnico, mediterraneo, util
Audiencia: propietarios, autonomos y emprendedores que necesitan licencias, reformas o un arquitecto en Murcia

--- Categoria editorial ---
Categoria: ${post.categoria?.nombre || "Blog"}
Palabras clave / tags: ${keywords || "sin keywords"}

--- Observaciones editoriales ---
Debe resumir el articulo con una sola escena real, fotografiable y util como portada horizontal.
Tiempo de lectura aproximado: ${post.tiempo_lectura || "sin dato"} minutos
URL del articulo: ${articleUrl || `${SITE_URL}/blog/${post.slug || ""}`}${diversityBrief}${editorBrief}
`);
}

async function loadRecentCoverRows(
  supabase: SupabaseClient,
  excludePostId?: string,
  limit = 5
): Promise<RecentCoverRow[]> {
  const { data, error } = await supabase
    .from("blog_articulos")
    .select("id, titulo, imagen_destacada")
    .not("imagen_destacada", "is", null)
    .neq("imagen_destacada", "")
    .order("fecha_publicacion", { ascending: false })
    .limit(limit + 4);

  if (error || !data) return [];

  return data
    .filter((row) => row.id !== excludePostId && row.imagen_destacada)
    .slice(0, limit);
}

function buildFallbackFeedAudit(rows: RecentCoverRow[]): CoverFeedAudit {
  const titles = rows.map((row) => row.titulo || "sin título");
  return {
    covers: titles.map((title) => ({ title, trope: "unknown", one_liner: title })),
    missingRegisters: ["detail", "interior en obra", "visita tecnica", "fachada murciana"],
    brief: collapseWhitespace(`
--- Feed visual de las ${rows.length || 5} portadas recientes ---
Titulos: ${titles.join(" | ") || "sin datos"}
Evita repetir tropos de stock de arquitectura. Prioriza materiales, obra real o detalle de plano.
`),
  };
}

async function auditRecentCoversWithVision(
  openai: OpenAI,
  rows: RecentCoverRow[]
): Promise<CoverFeedAudit> {
  if (rows.length === 0) return buildFallbackFeedAudit(rows);

  const imageParts = rows
    .filter((row) => row.imagen_destacada?.startsWith("http"))
    .slice(0, 5)
    .map((row) => ({
      type: "image_url" as const,
      image_url: { url: row.imagen_destacada as string },
    }));

  if (imageParts.length === 0) return buildFallbackFeedAudit(rows);

  try {
    const completion = await openai.chat.completions.create({
      ...chatCompletionConfig({
        model: OPENAI_TEXT_MODEL,
        maxTokens: 1200,
        reasoningEffort: "low",
        json: true,
      }),
      messages: [
        {
          role: "system",
          content:
            'Analiza estas portadas de blog de arquitectura/reformas. Devuelve JSON: {"covers":[{"title":"","trope":"","one_liner":""}],"missing_registers":["architecture"|"interior"|"human_experience"|"detail"],"brief":"parrafo corto de lo que NO repetir"}',
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Titulos en orden: ${rows.map((r) => r.titulo).join(" | ")}`,
            },
            ...imageParts,
          ],
        },
      ],
    });
    const parsed = safeJsonParse<{
      covers?: Array<{ title?: string; trope?: string; one_liner?: string }>;
      missing_registers?: string[];
      brief?: string;
    }>(chatMessageText(completion));
    if (!parsed) return buildFallbackFeedAudit(rows);
    return {
      covers: (parsed.covers || []).map((cover) => ({
        title: cover.title || "",
        trope: cover.trope || "unknown",
        one_liner: cover.one_liner || "",
      })),
      missingRegisters: parsed.missing_registers || [],
      brief: parsed.brief || buildFallbackFeedAudit(rows).brief,
    };
  } catch (error) {
    console.warn("[BLOG-COVER] Auditoría visual fallida, se usa fallback:", error);
    return buildFallbackFeedAudit(rows);
  }
}

function parseCoverSceneType(value: string | null | undefined): CoverSceneType | null {
  const v = (value || "").toLowerCase().trim();
  return COVER_SCENE_TYPES.includes(v as CoverSceneType) ? (v as CoverSceneType) : null;
}

async function classifyCoverScene(
  openai: OpenAI,
  dossier: string
): Promise<{ sceneType: CoverSceneType; visualIdea: string; rationale: string }> {
  try {
    const completion = await openai.chat.completions.create({
      ...chatCompletionConfig({
        model: OPENAI_TEXT_MODEL,
        temperature: 0.1,
        maxTokens: 800,
        reasoningEffort: "low",
        json: true,
      }),
      messages: [
        { role: "system", content: SCENE_CLASSIFIER_SYSTEM },
        { role: "user", content: dossier },
      ],
    });
    const parsed = safeJsonParse<{
      scene_type?: string;
      visual_idea?: string;
      rationale?: string;
    }>(chatMessageText(completion));
    const sceneType = parseCoverSceneType(parsed?.scene_type);
    if (sceneType) {
      return {
        sceneType,
        visualIdea: collapseWhitespace(parsed?.visual_idea || ""),
        rationale: parsed?.rationale || "",
      };
    }
  } catch (error) {
    console.warn("[BLOG-COVER] Clasificador de escena ha fallado, se asume detail.", error);
  }
  return {
    sceneType: "detail",
    visualIdea: "planos de arquitectura y muestras de material sobre mesa de trabajo, luz natural",
    rationale: "Fallback: registro que suele faltar en el feed",
  };
}

async function buildVisualPrompt(openai: OpenAI, dossier: string, sceneType: CoverSceneType) {
  const firstPass = await openai.chat.completions.create({
    ...chatCompletionConfig({
      model: OPENAI_TEXT_MODEL,
      temperature: 0.32,
      maxTokens: 1600,
      reasoningEffort: "low",
    }),
    messages: [
      { role: "system", content: PROMPT_BUILDER_SYSTEM_BASE },
      { role: "user", content: `SCENE_TYPE: ${sceneType}\n\n${dossier}` },
    ],
  });

  const firstPrompt = cleanPrompt(chatMessageText(firstPass));
  if (firstPrompt.length < 120) {
    throw new Error("El primer prompt visual se ha quedado demasiado corto");
  }

  const secondPass = await openai.chat.completions.create({
    ...chatCompletionConfig({
      model: OPENAI_TEXT_MODEL,
      temperature: 0.18,
      maxTokens: 1600,
      reasoningEffort: "low",
    }),
    messages: [
      { role: "system", content: PROMPT_REFINER_SYSTEM_BASE },
      {
        role: "user",
        content: `SCENE_TYPE: ${sceneType}\n\nDOSSIER:\n${dossier}\n\nPRIMER PROMPT:\n${firstPrompt}`,
      },
    ],
  });

  const refinedPrompt = cleanPrompt(chatMessageText(secondPass));
  const finalPrompt = cleanPrompt(`${refinedPrompt} ${IMAGE_REALISM_TAIL}`);
  if (finalPrompt.length < 200) {
    throw new Error("El prompt final de imagen se ha quedado demasiado corto");
  }

  return {
    firstPrompt,
    refinedPrompt,
    finalPrompt: truncate(finalPrompt, 4000),
  };
}

async function generateImageBuffer(openai: OpenAI, prompt: string) {
  const result = await openai.images.generate({
    model: OPENAI_IMAGE_MODEL,
    prompt,
    size: IMAGE_SIZE,
    quality: "high",
    output_format: "png",
    n: 1,
  });
  const imageBase64 = result.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("OpenAI no devolvió datos de imagen en base64");
  }
  return Buffer.from(imageBase64, "base64");
}

async function uploadToBlogBucket(post: CoverPost, imageBuffer: Buffer, supabase: SupabaseClient) {
  const webpBuffer = await sharp(imageBuffer)
    .webp({ quality: BLOG_COVER_WEBP_QUALITY, effort: 6, smartSubsample: true })
    .toBuffer();
  const timestamp = Date.now();
  const safeSlug = (post.slug || post.id || "articulo")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-");
  const filePath = `ai-covers/${safeSlug}-${timestamp}.webp`;

  const { error: uploadError } = await supabase.storage.from(BLOG_BUCKET).upload(filePath, webpBuffer, {
    cacheControl: "2592000",
    contentType: "image/webp",
    upsert: false,
  });

  if (uploadError) {
    throw new Error(`Error subiendo la portada al bucket ${BLOG_BUCKET}: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BLOG_BUCKET).getPublicUrl(filePath);

  if (!publicUrl) {
    throw new Error("No se pudo obtener la URL pública de la portada");
  }

  return { filePath, publicUrl };
}

export async function generateBlogCoverFromTarget(input: {
  postId?: string;
  articleUrl?: string;
  forceRegenerate?: boolean;
  sceneTypeOverride?: CoverSceneType;
  sceneFocus?: string;
}) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Falta OPENAI_API_KEY en el servidor");
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en el servidor");
  }

  const supabase = createServiceSupabase();
  const { postId, articleUrl, forceRegenerate = true, sceneTypeOverride, sceneFocus } = input;

  if (!postId && !articleUrl) {
    throw new Error("Debes indicar postId o articleUrl");
  }

  const loaded = postId
    ? { post: await loadPostById(supabase, postId), canonicalUrl: articleUrl }
    : await loadPostByUrl(supabase, articleUrl!);

  const post = loaded.post;
  if (post.imagen_destacada && !forceRegenerate) {
    return {
      ok: true,
      reused: true,
      postId: post.id,
      title: post.titulo,
      featuredImage: post.imagen_destacada,
    };
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const recentCoverRows = await loadRecentCoverRows(supabase, post.id, 5);
  const feedAudit = await auditRecentCoversWithVision(openai, recentCoverRows);

  const preliminaryDossier = buildDossier(post, loaded.canonicalUrl, {
    sceneType: sceneTypeOverride,
    sceneFocus,
    feedAudit,
  });
  const sceneDecision = sceneTypeOverride
    ? {
        sceneType: sceneTypeOverride,
        visualIdea: sceneFocus || "",
        rationale: "Forzado por editor",
      }
    : await classifyCoverScene(openai, preliminaryDossier);

  const resolvedSceneFocus = sceneFocus || sceneDecision.visualIdea || undefined;
  console.log(
    `[BLOG-COVER] scene_type=${sceneDecision.sceneType} | idea=${resolvedSceneFocus || "—"} (${sceneDecision.rationale})`
  );

  const dossier = buildDossier(post, loaded.canonicalUrl, {
    sceneType: sceneDecision.sceneType,
    sceneFocus: resolvedSceneFocus,
    feedAudit,
  });
  const prompts = await buildVisualPrompt(openai, dossier, sceneDecision.sceneType);
  const imageBuffer = await generateImageBuffer(openai, prompts.finalPrompt);
  const upload = await uploadToBlogBucket(post, imageBuffer, supabase);

  const { error: updateError } = await supabase
    .from("blog_articulos")
    .update({
      imagen_destacada: upload.publicUrl,
      actualizado_at: new Date().toISOString(),
    })
    .eq("id", post.id);

  if (updateError) {
    throw new Error(`No se pudo guardar la portada: ${updateError.message}`);
  }

  return {
    ok: true,
    postId: post.id,
    title: post.titulo,
    featuredImage: upload.publicUrl,
    storagePath: upload.filePath,
    prompt: prompts.finalPrompt,
    firstPrompt: prompts.firstPrompt,
    refinedPrompt: prompts.refinedPrompt,
    sceneType: sceneDecision.sceneType,
    sceneRationale: sceneDecision.rationale,
    visualIdea: resolvedSceneFocus || null,
  };
}
