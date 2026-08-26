/**
 * Genera portada IA para un artículo del blog.
 *
 * Uso:
 *   npx tsx scripts/generate-blog-cover.ts "https://www.alemanypajaron.es/blog/slug"
 *   npx tsx scripts/generate-blog-cover.ts --post-id="uuid-del-articulo"
 */
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env.local") });

function parseArgs() {
  const args = process.argv.slice(2);
  let postId: string | undefined;
  let articleUrl: string | undefined;

  for (const arg of args) {
    if (arg.startsWith("--post-id=")) postId = arg.slice("--post-id=".length).trim() || undefined;
    else if (arg.startsWith("http")) articleUrl = arg;
  }

  return { postId, articleUrl };
}

async function main() {
  const { postId, articleUrl } = parseArgs();
  if (!postId && !articleUrl) {
    console.error("❌ Indica URL del artículo o --post-id=...");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ Falta OPENAI_API_KEY o SUPABASE_SERVICE_ROLE_KEY en .env.local");
    process.exit(1);
  }

  const { generateBlogCoverFromTarget } = await import("../src/lib/blog/generate-blog-cover");
  const result = await generateBlogCoverFromTarget({
    postId,
    articleUrl,
    forceRegenerate: true,
  });

  console.log("Título:", result.title);
  if ("featuredImage" in result) console.log("URL portada:", result.featuredImage);
  if ("storagePath" in result) console.log("Storage:", result.storagePath);
  if ("sceneType" in result) console.log("Scene type:", result.sceneType);
  if ("visualIdea" in result && result.visualIdea) console.log("Idea visual:", result.visualIdea);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
