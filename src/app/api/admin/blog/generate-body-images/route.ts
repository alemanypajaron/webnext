import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/blog/admin-auth";
import { generateBlogBodyImagesFromTarget } from "@/lib/blog/generate-blog-body-images";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  try {
    const { response } = await requireAdminUser();
    if (response) return response;

    const body = (await request.json()) as {
      postId?: string;
      articleUrl?: string;
      forceRegenerate?: boolean | string;
    };

    if (!body.postId && !body.articleUrl) {
      return NextResponse.json(
        { ok: false, error: "Debes indicar postId o articleUrl" },
        { status: 400 }
      );
    }

    const forceRegenerate = body.forceRegenerate === true || body.forceRegenerate === "true";

    const result = await generateBlogBodyImagesFromTarget({
      postId: body.postId,
      articleUrl: body.articleUrl,
      forceRegenerate,
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error interno generando las imágenes del cuerpo";
    console.error("[admin/blog/generate-body-images]", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
