"use server";

import { createClient } from "@/utils/supabase/server";
import { Provider } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function signInWithOAuth(provider: Provider, redirectUrl: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) throw error;

  return data;
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/signin");
}
