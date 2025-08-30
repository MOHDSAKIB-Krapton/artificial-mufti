import Http from "@/lib/http-client";
import { ApiResponse } from "@/lib/http-client/types";
import { ChatMessage, Conversation } from "@/types/chat";
import { SseChunk, SseConversation, SseError } from "@/types/sse";
import { getStoredToken } from "@/utils/supabase/token";
import toast from "react-hot-toast";

export default class ChatServices {
  static async getAllConversations(): Promise<Conversation[]> {
    try {
      const response = await Http.get<ApiResponse<Conversation[]>>(
        "/chat/conversations"
      );

      if (!response.success) {
        throw new Error(response.error || "Somethinw went wrong");
      }

      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      return response.data ?? [];
    } catch (err: any) {
      toast(err.message || "Failed to fetch conversations");
      return [];
    }
  }

  static async getMessagesOfConversation(
    conversation_id: string
  ): Promise<ChatMessage[]> {
    try {
      const response = await Http.get(`/chat/${conversation_id}/messages`);

      if (!response.success) {
        throw new Error(response.error || "Somethinw went wrong");
      }

      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      return response.data ?? [];
    } catch (err: any) {
      toast(err.message || "Failed to fetch conversations");
      return [];
    }
  }

  static async streamChat(
    prompt: string,
    conversationId: string = "",
    onConversationCreated?: (conversation_id: string) => void,
    onChunk?: (chunk: SseChunk) => void,
    onEnd?: (fullText: string) => void,
    onError?: () => void
  ): Promise<EventSource> {
    // Extracting token manually for SSE, Since native EventSource does not provides us header token access
    const token = await getStoredToken();

    const url = new URL(
      `/api/v1/chat/stream?prompt=${encodeURIComponent(prompt)}`,
      process.env.NEXT_PUBLIC_BACKEND_BASE_URL
    );

    // Setting conversation id into the chat if not new chat
    if (conversationId) {
      url.searchParams.set("conversation_id", conversationId);
    }

    // setting token in query params because native EventSource does not provides us header token access
    if (token) {
      url.searchParams.set("token", token);
    }

    const es = new EventSource(url.toString());

    es.addEventListener("conversation_created", (e) => {
      const parsed = JSON.parse((e as MessageEvent).data) as SseConversation;
      onConversationCreated?.(parsed.conversation_id);
    });

    es.addEventListener("chunk", (e) => {
      const parsed = JSON.parse((e as MessageEvent).data) as SseChunk;
      onChunk?.(parsed);
    });

    es.addEventListener("end", (e) => {
      const parsed = JSON.parse((e as MessageEvent).data) as SseChunk;
      onEnd?.(parsed.content);
      es.close();
    });

    es.addEventListener("error", (e) => {
      es.close();
      const parsed = JSON.parse((e as MessageEvent).data) as SseError;
      toast(parsed.message || "Something went wrong");
      onError?.();
    });

    return es;
  }
}
