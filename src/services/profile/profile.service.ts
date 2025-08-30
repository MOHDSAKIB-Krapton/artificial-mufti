import Http from "@/lib/http-client";
import { createClient } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export class ProfileServices {
  static async updateProfile(fullName: string, mobile?: string) {
    const supabase = createClient();
    const update = {
      data: {
        full_name: fullName, // optional mirror
        phone: mobile, // optional mirror
        ai_mufti: {
          display_name: fullName,
          phone: mobile ?? "",
        },
      },
    } as const;

    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser(update);
    if (error) throw error;

    return user;
  }

  static async deleteAccount() {
    try {
      const response = await Http.delete("/account");
      if (!response.success) {
        throw new Error(response.error || "Somethinw went wrong");
      }

      return response.data;
    } catch (err: any) {
      toast(err.message || "Something went wrong");
      throw err;
    }
  }
}
