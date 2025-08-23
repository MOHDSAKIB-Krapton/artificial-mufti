"use client";

import { ChatMessage } from "@/types/chat";
import { Bot, Check, Clock, Copy, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const [isCopied, setIsCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopyMessage = async () => {
    const text = typeof message.content === "string" ? message.content : "";

    let interval;

    try {
      setIsCopied(true);
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      // optional: show your own toast/snackbar here
      // toast.success("Copied to clipboard");
    } catch {
      // optional: show error toast
      // toast.error("Failed to copy");
      console.error("Failed to copy to clipboard");
    } finally {
      interval = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => {
      clearInterval(interval);
    };
  };

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
        <div className="mt-1 h-8 w-8 rounded-full border border-border bg-card flex justify-center items-center overflow-hidden">
          {/* <Bot className="h-4 w-4 text-primary" /> */}
          <Image
            src={require("../../../../public/assets/assistant/logo.png")}
            alt="Assitant Logo"
            className="w-4 h-4"
          />
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
          {/* {message.content} */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content || " "}
            </ReactMarkdown>
          </div>
        </div>
        <div
          className={`
              mt-1 flex items-center gap-2 text-xs text-muted-foreground
              ${isUser ? " pr-1 flex-row-reverse" : "pl-1"}
            `}
        >
          <Clock className="h-3 w-3" />
          <span>{message.createdAt}</span>

          <span className="mx-1">•</span>
          <button
            className="opacity-60 group-hover:opacity-100 transition focus:opacity-100 inline-flex items-center gap-1 hover:text-foreground"
            title="Copy"
            aria-label="Copy message"
            onClick={handleCopyMessage}
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {isUser && (
        <div className="mt-1 h-8 w-8 shrink-0 rounded-full border border-border bg-muted grid place-items-center">
          <User className="h-4 w-4 text-foreground/70" />
        </div>
      )}
    </div>
  );
}
