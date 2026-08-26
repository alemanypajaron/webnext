import OpenAI from "openai";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  BLOG_REDACTOR_REFINE_PROMPT,
  BLOG_REDACTOR_SYSTEM_PROMPT,
} from "@/lib/blog/blog-redactor-prompt";
import { normalizeBlogArticleHtml } from "@/lib/blog/normalize-blog-html";
import {
  countWords,
  decodeHtmlEntities,
  estimateReadingTimeMinutes,
  extractHtmlFromModelOutput,
  asSingleRelation,
  parseArticleUrl,
  stripHtml,
} from "@/lib/blog/blog-html-utils";
import {
  OPENAI_TEXT_MODEL,
  OPENAI_WEB_SEARCH_TOOL,
  chatCompletionConfig,
  chatMessageText,
  isGpt5Model,
  responseOutputText,
} from "@/lib/openai-config";
import { SITE_URL } from "@/lib/structuredData";

const DEFAULT_MODEL = process.env.OPENAI_BLOG_REDACTOR_MODEL?.trim() || OPENAI_TEXT_MODEL;
const DEFAULT_TEMPERATURE = Number(process.env.OPENAI_BLOG_REDACTOR_TEMPERATURE || "0.7");

const INTERNAL_LINKS = [
  `${SITE_URL}/`,
  `${SITE_URL}/servicios`,
  `${SITE_URL}/servicios/licencias-permisos`,
  `${SITE_URL}/servicios/licencia-peluqueria`,
  `${SITE_URL}/servicios/licencia-gimnasio`,
  `${SITE_URL}/servicios/licencia-bar`,
  `${SITE_URL}/servicios/licencia-farmacia`,
  `${SITE_URL}/servicios/licencia-veterinaria`,
  `${SITE_URL}/servicios/licencia-clinica-estetica`,
  `${SITE_URL}/servicios/licencia-centro-medico`,
  `${SITE_URL}/servicios/reformas-integrales`,
  `${SITE_URL}/servicios/diseno-espacios`,
  `${SITE_URL}/servicios/direccion-obra`,
  `${SITE_URL}/servicios/asesoramiento-tecnico`,
  `${SITE_URL}/servicios/certificado-energetico`,
  `${SITE_URL}/servicios/reforma-cocina`,
  `${SITE_URL}/servicios/reforma-bano`,
  `${SITE_URL}/servicios/reforma-local-comercial-murcia`,
  `${SITE_URL}/servicios/reforma-peluqueria`,
  `${SITE_URL}/servicios/reforma-gimnasio`,
  `${SITE_URL}/servicios/reforma-bar`,
  `${SITE_URL}/servicios/reforma-farmacia`,
  `${SITE_URL}/servicios/reforma-veterinaria`,
  `${SITE_URL}/servicios/reforma-clinica-estetica`,
  `${SITE_URL}/servicios/reforma-centro-medico`,
  `${SITE_URL}/proyectos`,
  `${SITE_URL}/presupuesto`,
  `${SITE_URL}/contacto`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/nosotros`,
];

type BlogPostRow = {
  id: string;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string | null;
  meta_descripcion: string | null;
  meta_keywords: string[] | null;
  tiempo_lectura: number | null;
  tags: string[] | null;
  categoria?: { nombre: string | null; slug: string | null } | null;
};

export type RedactBlogArticleInput = {
  articleUrl?: string;
  slug?: string;
  postId?: string;
  dryRun?: boolean;
  seoOnly?: boolean;
};

export type RedactBlogArticleResult = {
  postId: string;
  title: string;
  slug: string;
  wordCount: number;
  readingTime: number;
  excerpt: string;
  metaDescription: string;
  metaKeywords: string[];
  content: string;
  contentPreview: string;
  updated: boolean;
  model: string;
  temperature: number;
};

function createServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function loadPost(
  supabase: SupabaseClient,
  input: { articleUrl?: string; slug?: string; postId?: string }
): Promise<BlogPostRow> {
  let query = supabase
    .from("blog_articulos")
    .select(
      `id, titulo, slug, resumen, contenido, meta_descripcion, meta_keywords, tiempo_lectura, tags,
       categoria:categorias_blog(nombre, slug)`
    );

  if (input.postId) {
    query = query.eq("id", input.postId);
  } else if (input.slug) {
    query = query.eq("slug", input.slug);
  } else if (input.articleUrl) {
    const parsed = parseArticleUrl(input.articleUrl);
    query = query.eq("slug", parsed.slug);
  } else {
    throw new Error("Indica postId, articleUrl o slug");
  }

  const { data, error } = await query.single();
  if (error || !data) {
    throw new Error(`No se encontró el artículo: ${error?.message || "sin datos"}`);
  }
  return {
    ...(data as Omit<BlogPostRow, "categoria">),
    categoria: asSingleRelation((data as { categoria?: BlogPostRow["categoria"] | BlogPostRow["categoria"][] }).categoria),
  };
}

function internalLinksBriefing(): string {
  return [
    "ENLACES INTERNOS (usa varios con anclas naturales; prioriza la landing de la actividad si existe):",
    ...INTERNAL_LINKS.map((url) => `- ${url}`),
  ].join("\n");
}

async function callRedactorWithWebSearch(
  openai: OpenAI,
  instructions: string,
  input: string,
  model: string
): Promise<string> {
  const response = await openai.responses.create({
    model,
    instructions,
    input,
    max_output_tokens: 16000,
    reasoning: { effort: "medium" },
    tools: [OPENAI_WEB_SEARCH_TOOL as unknown as OpenAI.Responses.WebSearchTool],
    tool_choice: "auto",
  });

  if (response.error) {
    throw new Error(`OpenAI Responses: ${response.error.message || "error desconocido"}`);
  }

  const content = responseOutputText(response);
  if (!content) {
    const incomplete = response.incomplete_details?.reason || "unknown";
    throw new Error(`OpenAI no devolvió contenido del artículo (incomplete=${incomplete})`);
  }
  return content;
}

const SEO_FIELDS_SYSTEM_PROMPT = `Genera metadatos SEO en español para un artículo del blog de Alemán y Pajarón (estudio de arquitectura técnica, licencias y reformas en Murcia).

Responde SOLO JSON con estas keys:
- excerpt: resumen editorial para la ficha del artículo (máx. 280 caracteres, sin repetir el título literal).
- meta_description: meta description (140-155 caracteres). Debe ser única, incluir el tema y un CTA suave (guía, requisitos, presupuesto). No copies el excerpt.
- meta_keywords: hasta 10 keywords separadas por coma (licencia Murcia, reforma, arquitecto técnico, nombre del negocio o trámite).

Reglas:
- Español natural, orientado a búsquedas locales e informativas.
- No inventes plazos, tasas ni datos que no aparezcan en el contenido.
- Di «arquitecto técnico», no «arquitecto» a secas.`;

function clampSeoText(text: string, maxLen: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function normalizeTitleKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function keywordsToArray(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

async function generateSeoFields(
  openai: OpenAI,
  title: string,
  html: string,
  model: string,
  temperature: number
) {
  const plain = stripHtml(html).slice(0, 3500);
  const seoTemperature = isGpt5Model(model) ? undefined : Math.min(temperature, 0.5);
  const completion = await openai.chat.completions.create({
    ...chatCompletionConfig({
      model,
      temperature: seoTemperature ?? temperature,
      maxTokens: 1200,
      reasoningEffort: "low",
      json: true,
    }),
    messages: [
      { role: "system", content: SEO_FIELDS_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Título del artículo (H1 de la página, no repetir como excerpt):\n${title}\n\nContenido:\n${plain}`,
      },
    ],
  });

  const raw = chatMessageText(completion) || "{}";
  const parsed = JSON.parse(raw) as {
    excerpt?: string;
    meta_description?: string;
    meta_keywords?: string;
  };

  const titleKey = normalizeTitleKey(title);
  const pickField = (value: string | undefined, fallback: string, maxLen: number) => {
    const trimmed = decodeHtmlEntities((value || fallback).trim());
    const cleanFallback = decodeHtmlEntities(fallback.trim());
    if (!trimmed) return clampSeoText(cleanFallback, maxLen);
    if (normalizeTitleKey(trimmed) === titleKey) {
      return clampSeoText(cleanFallback, maxLen);
    }
    return clampSeoText(trimmed, maxLen);
  };

  const defaultKeywords =
    "arquitecto técnico Murcia, licencia de apertura, reforma integral, Alemán y Pajarón, normativa Murcia";

  return {
    excerpt: pickField(parsed.excerpt, stripHtml(html).slice(0, 280), 300),
    metaDescription: pickField(parsed.meta_description, stripHtml(html).slice(0, 150), 155),
    metaKeywords: keywordsToArray(pickField(parsed.meta_keywords, defaultKeywords, 500)),
  };
}

export async function redactBlogArticle(input: RedactBlogArticleInput): Promise<RedactBlogArticleResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Falta OPENAI_API_KEY en .env.local");
  }

  const model = DEFAULT_MODEL;
  const temperature = DEFAULT_TEMPERATURE;
  const supabase = createServiceSupabase();
  const post = await loadPost(supabase, input);
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(`[BLOG-REDACTOR] Artículo: ${post.titulo}`);
  console.log(
    `[BLOG-REDACTOR] Modelo: ${model} | Web Search nativo | temperature: ${isGpt5Model(model) ? "default (gpt-5.x)" : temperature}`
  );

  if (input.seoOnly) {
    const html = post.contenido?.trim();
    if (!html) throw new Error("El artículo no tiene contenido HTML para generar SEO");

    const seo = await generateSeoFields(openai, post.titulo, html, model, temperature);
    const wordCount = countWords(html);
    const readingTime = post.tiempo_lectura || estimateReadingTimeMinutes(wordCount);
    const payload = {
      resumen: clampSeoText(seo.excerpt, 300),
      meta_descripcion: clampSeoText(seo.metaDescription, 155),
      meta_keywords: seo.metaKeywords,
      tiempo_lectura: readingTime,
      actualizado_at: new Date().toISOString(),
    };

    if (!input.dryRun) {
      const { error } = await supabase.from("blog_articulos").update(payload).eq("id", post.id);
      if (error) throw new Error(`Error guardando SEO: ${error.message}`);
    }

    return {
      postId: post.id,
      title: post.titulo,
      slug: post.slug,
      wordCount,
      readingTime,
      excerpt: payload.resumen,
      metaDescription: payload.meta_descripcion,
      metaKeywords: payload.meta_keywords,
      content: html,
      contentPreview: stripHtml(html).slice(0, 280) + "...",
      updated: !input.dryRun,
      model,
      temperature,
    };
  }

  const briefing = [
    `TITULO DEL ARTICULO:\n${post.titulo}`,
    `CATEGORIA: ${post.categoria?.nombre || "Blog"} (${post.categoria?.slug || ""})`,
    internalLinksBriefing(),
    "Usa web_search para contrastar normativa oficial de Murcia/España antes de redactar.",
    "Redacta el artículo completo en HTML.",
  ].join("\n\n");

  const draft = await callRedactorWithWebSearch(openai, BLOG_REDACTOR_SYSTEM_PROMPT, briefing, model);
  const draftHtml = extractHtmlFromModelOutput(draft);
  console.log(`[BLOG-REDACTOR] Borrador: ${countWords(draftHtml)} palabras`);

  const refineInput = [
    `TITULO: ${post.titulo}`,
    internalLinksBriefing(),
    "Vuelve a usar web_search para contrastar plazos, tasas y requisitos oficiales.",
    `BORRADOR HTML:\n${draftHtml}`,
    "Entrega la versión final en HTML.",
  ].join("\n\n");

  const finalRaw = await callRedactorWithWebSearch(
    openai,
    `${BLOG_REDACTOR_SYSTEM_PROMPT}\n\n${BLOG_REDACTOR_REFINE_PROMPT}`,
    refineInput,
    model
  );

  const content = normalizeBlogArticleHtml(extractHtmlFromModelOutput(finalRaw), post.titulo);
  const wordCount = countWords(content);
  const readingTime = estimateReadingTimeMinutes(wordCount);
  const seo = await generateSeoFields(openai, post.titulo, content, model, temperature);

  const payload = {
    contenido: content,
    resumen: clampSeoText(seo.excerpt, 300),
    meta_descripcion: clampSeoText(seo.metaDescription, 155),
    meta_keywords: seo.metaKeywords,
    tags: seo.metaKeywords.slice(0, 8),
    tiempo_lectura: readingTime,
    actualizado_at: new Date().toISOString(),
  };

  if (!input.dryRun) {
    const { error } = await supabase.from("blog_articulos").update(payload).eq("id", post.id);
    if (error) throw new Error(`Error guardando artículo: ${error.message}`);
  }

  return {
    postId: post.id,
    title: post.titulo,
    slug: post.slug,
    wordCount,
    readingTime,
    excerpt: payload.resumen,
    metaDescription: payload.meta_descripcion,
    metaKeywords: payload.meta_keywords,
    content,
    contentPreview: stripHtml(content).slice(0, 280) + "...",
    updated: !input.dryRun,
    model,
    temperature,
  };
}
