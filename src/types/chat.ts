export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: string; // e.g. "2025-08-16 14:41"
}

export interface ConversationMeta {
  id: string;
  title: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface Conversation extends ConversationMeta {
  messages: ChatMessage[];
}
