/**
 * Pipeline completo: portada + imágenes de cuerpo.
 *
 * Uso:
 *   npm run generate:blog-cover-and-body -- "https://www.alemanypajaron.es/blog/slug"
 *   npm run generate:blog-cover-and-body -- "...url..." --force-body
 *   npm run generate:blog-cover-and-body -- "...url..." --skip-cover
 *   npm run generate:blog-cover-and-body -- "...url..." --skip-body
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

function parseArgs() {
  const args = process.argv.slice(2);
  let url: string | undefined;
  let forceBody = false;
  let skipCover = false;
  let skipBody = false;

  for (const arg of args) {
    if (arg === "--force-body") forceBody = true;
    else if (arg === "--skip-cover") skipCover = true;
    else if (arg === "--skip-body") skipBody = true;
    else if (arg.startsWith("http")) url = arg;
  }

  return { url, forceBody, skipCover, skipBody };
}

async function main() {
  const opts = parseArgs();
  if (!opts.url) {
    console.error("❌ Indica la URL del artículo.");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Falta OPENAI_API_KEY o SUPABASE_SERVICE_ROLE_KEY en .env.local");
    process.exit(1);
  }

  let coverPromptHint: string | undefined;
  let coverSceneType: string | undefined;

  if (!opts.skipCover) {
    const { generateBlogCoverFromTarget } = await import("../src/lib/blog/generate-blog-cover");
    console.log(`\n=== PORTADA ===\nGenerando portada para: ${opts.url}`);
    const cover = await generateBlogCoverFromTarget({
      articleUrl: opts.url,
      forceRegenerate: true,
    });
    console.log("Título:", cover.title);
    if ("featuredImage" in cover) console.log("URL portada:", cover.featuredImage);
    if ("sceneType" in cover && cover.sceneType) {
      coverSceneType = cover.sceneType;
      console.log(`Scene type: ${cover.sceneType}`);
    }
    if ("prompt" in cover) coverPromptHint = cover.prompt as string;
  } else {
    console.log("\n=== PORTADA: omitida (--skip-cover) ===");
  }

  if (opts.skipBody) {
    console.log("\n=== CUERPO: omitido (--skip-body) ===");
    return;
  }

  const { generateBlogBodyImagesFromTarget } = await import("../src/lib/blog/generate-blog-body-images");
  console.log("\n=== CUERPO ===\nGenerando imágenes de cuerpo...");
  const body = await generateBlogBodyImagesFromTarget({
    articleUrl: opts.url,
    coverPromptHint,
    coverSceneType,
    forceRegenerate: opts.forceBody,
  });

  console.log("\n=== RESULTADO CUERPO ===");
  console.log("Título:", body.title);
  console.log("Insertadas:", body.insertedCount);
  if (body.skippedReason) console.log("Saltado:", body.skippedReason);
  for (const item of body.manifest) {
    console.log(` • H2[${item.anchor_index}] "${item.anchor_text}" → ${item.url}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
