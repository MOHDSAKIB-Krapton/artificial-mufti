"use client";

import { ArrowDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChatMessage, Role } from "@/types/chat";
import ChatServices from "@/services/chat/chat.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatBubble from "../chat-bubble/page";
import Composer from "../composer/page";
import toast from "react-hot-toast";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ChatPage from "../page";

interface Props {
  initialChatId: string | null;
}

export default function ConversationPage({ initialChatId }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(initialChatId);

  const thinkingTexts = [
    "Reading authentic books…",
    "Gathering Islamic references…",
    "Thinking deeply about your query…",
    "Structuring the response…",
    "Cross-checking with tafseer…",
    "Polishing the final answer…",
  ];

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    setActiveId(segments[1] || null);
  }, [pathname]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100; // 100px tolerance
      setShowScrollButton(!nearBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, streamingContent]);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % thinkingTexts.length);
    }, 2000); // change every 2s

    return () => clearInterval(interval);
  }, [isTyping]);

  useEffect(() => {
    if (!activeId) {
      console.log("Returning Beacuse no activeId");
      setMessages([]);
      return;
    }
    getMessagesOfConversation(activeId);
  }, [activeId]);

  const getMessagesOfConversation = async (activeId: string) => {
    try {
      const data = await ChatServices.getMessagesOfConversation(activeId);
      if (data.length > 0) {
        setMessages([...data].reverse());
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const addMessage = (role: Role, content: string) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const onSend = async (text: string) => {
    addMessage("user", text);
    setIsTyping(true);
    setStreamingContent("");

    const es = await ChatServices.streamChat(
      text,
      activeId || undefined,
      (conversation_id) => {
        if (!activeId) {
          window.history.pushState({}, "", `/chat/${conversation_id}`);
        }
      },
      (chunk) => {
        console.log("CHUNK +> ", chunk);
        setStreamingContent((prev) => prev + chunk.content);
      },
      (fullText) => {
        setIsTyping(false);
        addMessage("assistant", fullText);
        setStreamingContent("");
      },
      () => {
        setIsTyping(false);
      }
    );
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  if (!activeId) {
    return <ChatPage onStartNewChat={onSend} />;
  }

  return (
    <main
      className="min-h-0 flex flex-col flex-1 overflow-y-auto"
      ref={scrollRef}
    >
      <div className="mx-auto w-full max-w-4xl flex-1 px-3 pt-6 pb-24">
        <div className="space-y-5">
          {messages.map((m) => {
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
              >
                <ChatBubble message={m} />
              </motion.div>
            );
          })}

          {isTyping && (
            <>
              <div
                className={`group relative flex items-start gap-3 justify-start`}
                aria-label={"Assistant message"}
              >
                <div className="mt-1 h-8 w-8 rounded-full border border-border bg-card flex justify-center items-center overflow-hidden">
                  <Image
                    src={require("../../../../public/assets/assistant/logo.png")}
                    alt="Assitant Logo"
                    className="w-4 h-4"
                  />
                </div>

                <div className={"w-[85%] md:w-[70%]"}>
                  <div
                    className={` rounded-2xl px-4 py-3 text-sm leading-relaxed bg-card border border-primary/20 rounded-bl-lg`}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-scroll">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {streamingContent || " "}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {thinkingTexts[currentTextIndex]}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Composer disabled={false} onSend={onSend} suggestions={[]} />

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-36 right-[50%] bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/80 transition"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}
