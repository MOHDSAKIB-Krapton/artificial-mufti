import Http from "@/lib/http-client";
import { ApiResponse } from "@/lib/http-client/types";
import { Conversation } from "@/types/chat";

// export interface Conversation {
//   id: string;
//   user_id: string;
//   title: string;
//   pinned: boolean;
//   created_at: string;
//   updated_at: string;
// }

export default class ChatServices {
  static async getAllConversations(): Promise<Conversation[]> {
    try {
      const response = await Http.get<ApiResponse<Conversation[]>>(
        "/chat/conversations"
      );

      console.log("Plain response from backend => ", response.data);
      if (!response.success) {
        console.error("Error from backend:", response.error);
        throw new Error(response.error || "Somethinw went wrong");
      }

      if (!response.data || !Array.isArray(response.data.data)) {
        console.warn("Unexpected data format:", response.data?.data);
        return [];
      }

      return response.data.data ?? [];
    } catch (err) {
      console.error("Failed to fetch conversations:", err);
      return [];
    }
  }
}
