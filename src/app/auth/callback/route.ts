import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/profile";

  if (code) {
    const cookieStore = await cookies(); // ✅ FIXED: await here
    const supabase = await createServerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${url.origin}${next}`); // ✅ cleaned
    }
  }

  return NextResponse.redirect(`${url.origin}/error`);
}
