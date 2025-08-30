import { Role } from "./chat";

export interface SseChunk {
  role: Role;
  content: string;
}

export interface SseEvent {
  event: string;
  data: any;
}

export interface SseConversation extends SseChunk {
  conversation_id: string;
}

export interface SseError extends SseChunk {
  message: string;
}
