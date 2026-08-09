import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const next = searchParams.get("next") ?? "/overview";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`${origin}/verify-email?error=1`);
  }

  if (next.endsWith("/reset-password")) {
    return NextResponse.redirect(
      `${origin}${next}?token_hash=${token_hash}&type=recovery`,
    );
  }

  return NextResponse.redirect(`${origin}${next}`);
}
