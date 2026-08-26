/**
 * Genera imágenes IA para el cuerpo de un artículo e inyecta <figure> tras los H2.
 *
 * Uso:
 *   npm run generate:blog-body-images -- "https://www.alemanypajaron.es/blog/slug"
 *   npm run generate:blog-body-images -- "...url..." --force
 *   npm run generate:blog-body-images -- --post-id=UUID --force
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

function parseArgs() {
  const args = process.argv.slice(2);
  let articleUrl: string | undefined;
  let postId: string | undefined;
  let force = false;
  let maxImages: number | undefined;

  for (const arg of args) {
    if (arg === "--force" || arg === "-f") force = true;
    else if (arg.startsWith("--post-id=")) postId = arg.slice("--post-id=".length).trim() || undefined;
    else if (arg.startsWith("--max-images=")) {
      const n = Number(arg.slice("--max-images=".length));
      if (Number.isFinite(n) && n > 0) maxImages = Math.floor(n);
    } else if (arg.startsWith("http")) articleUrl = arg;
  }

  return { articleUrl, postId, force, maxImages };
}

async function main() {
  const opts = parseArgs();
  if (!opts.articleUrl && !opts.postId) {
    console.error("❌ Indica URL del artículo o --post-id=...");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Falta OPENAI_API_KEY o SUPABASE_SERVICE_ROLE_KEY en .env.local");
    process.exit(1);
  }

  const { generateBlogBodyImagesFromTarget } = await import("../src/lib/blog/generate-blog-body-images");
  const result = await generateBlogBodyImagesFromTarget({
    articleUrl: opts.articleUrl,
    postId: opts.postId,
    forceRegenerate: opts.force,
    maxImages: opts.maxImages,
  });

  console.log("\n=== RESULTADO ===");
  console.log("Título:", result.title);
  console.log("Insertadas:", result.insertedCount);
  if (result.skippedReason) console.log("Saltado:", result.skippedReason);
  for (const item of result.manifest) {
    console.log(` • H2[${item.anchor_index}] "${item.anchor_text}" → ${item.url} (scene=${item.scene_type})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
