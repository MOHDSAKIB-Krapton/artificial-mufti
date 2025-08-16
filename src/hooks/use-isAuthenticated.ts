import { createClient } from "@/utils/supabase/client";

export const useIsAuthenticated = () => {
  const supabase = createClient();
  const user = supabase.auth.getUser();
  return user !== null;
};
