import { ChatMessage } from "@/types/chat";
import { Bot, Clock, Copy, Share2, User } from "lucide-react";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`
        group relative flex items-start gap-3
        ${isUser ? "justify-end" : "justify-start"}
      `}
      aria-label={isUser ? "User message" : "Assistant message"}
    >
      {/* Assistant avatar */}
      {!isUser && (
        <div className="mt-1 h-8 w-8 shrink-0 rounded-full border border-border bg-card grid place-items-center">
          <Bot className="h-4 w-4 text-primary" />
        </div>
      )}

      {/* Bubble */}
      <div className={"max-w-[85%] md:max-w-[70%]"}>
        <div
          className={`
              rounded-2xl px-4 py-3 text-sm leading-relaxed 
             ${
               isUser
                 ? "bg-[#6B7A5A] text-white rounded-br-lg shadow"
                 : "bg-card border border-primary/20 rounded-bl-lg"
             }
            `}
        >
          {message.content}
        </div>
        <div
          className={`
              mt-1 flex items-center gap-2 text-xs text-muted-foreground
              ${isUser ? "justify-end pr-1" : "pl-1"}
            `}
        >
          <Clock className="h-3 w-3" />
          <span>{message.createdAt}</span>

          {/* Quick actions (copy / share) */}
          <span className="mx-1">•</span>
          <button
            className="opacity-0 group-hover:opacity-100 transition focus:opacity-100 inline-flex items-center gap-1 hover:text-foreground"
            title="Copy"
            aria-label="Copy message"
          >
            <Copy className="h-3 w-3" />
            Copy
          </button>
          <button
            className="opacity-0 group-hover:opacity-100 transition focus:opacity-100 inline-flex items-center gap-1 hover:text-foreground"
            title="Share"
            aria-label="Share message"
          >
            <Share2 className="h-3 w-3" />
            Share
          </button>
        </div>
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="mt-1 h-8 w-8 shrink-0 rounded-full border border-border bg-muted grid place-items-center">
          <User className="h-4 w-4 text-foreground/70" />
        </div>
      )}
    </div>
  );
}
