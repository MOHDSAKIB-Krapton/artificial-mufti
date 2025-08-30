import { createClient } from "./client";

const supabase = createClient();

export async function getStoredToken(): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}
