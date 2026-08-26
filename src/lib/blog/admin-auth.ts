import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ ok: false, error: "No autenticado" }, { status: 401 }),
    };
  }

  return { user, response: null };
}
