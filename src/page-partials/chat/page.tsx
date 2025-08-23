"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, ChevronLeft, ChevronRight, Loader2, Menu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Conversation, ConversationMeta, Role } from "@/types/chat";
import { MOCK_CONVERSATIONS } from "@/data/mock";
import Sidebar from "./sidebar/page";
import ChatBubble from "./chat-bubble/page";
import Composer from "./composer/page";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket-client";
import ChatServices from "@/services/chat/chat.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { mdComponents } from "@/components/react-markdown/component/page";

export default function ChatPage() {
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [sidebarPinned, setSidebarPinned] = useState(true); // desktop width state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const [streamingContent, setStreamingContent] = useState<string>("");

  const active = useMemo(
    () => conversations?.find((c) => c.id === activeId)!,
    [activeId, conversations]
  );

  // TEST DEMO
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<number | null>(null);

  let socket: Socket;

  useEffect(
    () => () => {
      if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        if (!socketRef.current) {
          const s = await getSocket();
          socketRef.current = s;
          setSocketState(s);

          s.on("connect", () => {
            console.log("Connected to socket:", s);
          });

          s.on("server_chunk", (data: { role: Role; content: string }) => {
            console.log("data => ", data);
            // setIsTyping(false);
            // addMessage(data.role, data.content);
            setStreamingContent((prevContent) => prevContent + data.content);
          });

          s.on(
            "stream_end",
            (data: {
              conversation_id: string;
              role: Role;
              content: string;
              created_at: string;
              title?: string; // in case server sends a title for new convs
            }) => {
              setConversations((prev) => {
                const exists = prev.some((c) => c.id === data.conversation_id);
                if (!exists) {
                  // create it on the fly if server made a new conversation
                  const newConv: Conversation = {
                    id: data.conversation_id,
                    title: data.title || "New chat",
                    updated_at: "Just now",
                    messages: [],
                    pinned: false,
                    created_at: new Date().toISOString(),
                  };
                  // also make it active so future sends use the correct id
                  setActiveId(data.conversation_id);
                  return [newConv, ...prev];
                }
                return prev;
              });

              // When the stream ends, add the full content to the conversation and clear the streaming state
              setIsTyping(false);
              setConversations((prev) =>
                prev.map((c) =>
                  c.id !== data.conversation_id
                    ? c
                    : {
                        ...c,
                        messages: [
                          ...c.messages,
                          {
                            id: crypto.randomUUID(),
                            role: data.role,
                            content: data.content,
                            createdAt: data.created_at,
                          },
                        ],
                      }
                )
              );
              setStreamingContent(""); // Clear the streaming state
            }
          );

          s.on("error", (e) => {
            console.error("Socket error:", e);
            console.error("❌ Socket connection failed:", e);
          });
          s.on("disconnect", (e) => {
            console.error("Socket disconnected:", e);
            console.error("❌ Socket connection disconnected:", e);
          });
        }
      } catch (err) {
        console.error("Failed to connect socket:", err);
      }
    })();

    return () => {
      const s = socketRef.current;
      if (s) {
        s.off("connect");
        s.off("server_chunk");
        s.off("stream_end");
        s.off("error");
        s.off("disconnect");
        // optional: don't fully disconnect if you want sticky connection
        // s.disconnect();
        // socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    getAllConversations();
  }, []);

  useEffect(() => {
    if (!activeId) {
      console.log("Returning Beacuse no activeId");
      return;
    }

    console.log("activeId => ", activeId);
    getMessagesOfConversation(activeId);
  }, [activeId]);

  const getAllConversations = async () => {
    try {
      const data = await ChatServices.getAllConversations();
      setConversations(data);
      console.log("Conversations => ", data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessagesOfConversation = async (conversation_id: string) => {
    try {
      const data = await ChatServices.getMessagesOfConversation(
        conversation_id
      );
      console.log("Messages =>", data);

      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversation_id
            ? {
                ...c,
                // reverse so oldest messages appear at top
                messages: [...data].reverse(),
              }
            : c
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addMessage = (role: Role, content: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id !== activeId
          ? c
          : {
              ...c,
              updatedAt: "Just now",
              messages: [
                ...c.messages,
                {
                  id: crypto.randomUUID(),
                  role,
                  content,
                  createdAt: new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  }),
                },
              ],
            }
      )
    );
  };

  const createNew = () => {
    const id = crypto.randomUUID();
    const newConv: Conversation = {
      id,
      title: "New chat",
      updated_at: "Just now",
      messages: [
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Assalamu alaikum! I'm your AI companion. Ask anything.",
          createdAt: new Date().toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ],
      pinned: false,
      created_at: new Date().toISOString(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
  };

  const onSend = async (text: string) => {
    if (!socketState) {
      return;
    }

    addMessage("user", text);
    setIsTyping(true);
    setStreamingContent("");
    socketState.emit("client_message", {
      content: text,
      conversation_id: activeId || null,
    });
  };

  return (
    <div className="max-h-[100dvh] self-stretch w-full flex flex-col bg-background text-foreground">
      <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
        <div className="mx-auto flex w-full items-center gap-2 px-3 py-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarPinned((p) => !p)}
              aria-label="Toggle sidebar width"
            >
              {sidebarPinned ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="rounded-md">
              Protected
            </Badge>
            <span className="text-muted-foreground">/</span>
            <span
              className="font-medium truncate max-w-[40vw] md:max-w-xs"
              title={active?.title}
            >
              {active?.title}
            </span>
          </div>

          {/* <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Trash2 className="h-4 w-4" /> Clear
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              <Sparkles className="h-4 w-4" /> New chat
            </Button>
          </div> */}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <Sidebar
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((s) => !s)}
          conversations={conversations}
          activeId={activeId}
          createNew={createNew}
          select={setActiveId}
        />

        <main className="min-h-0 flex flex-col flex-1 overflow-y-auto">
          {/* Conversation stream */}
          <div className="mx-auto w-full max-w-4xl flex-1 px-3 pt-6 pb-24">
            {!active?.messages ||
              (active?.messages.length === 0 && (
                <div className="mx-auto mt-10 max-w-md text-center text-muted-foreground">
                  <Bot className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p>Start your first question below.</p>
                </div>
              ))}
            <div className="space-y-5">
              {active?.messages &&
                active?.messages.length > 0 &&
                active?.messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ChatBubble message={m} />
                  </motion.div>
                ))}

              {isTyping && (
                <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Gathering
                    Authentic answers…
                  </div>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {streamingContent || " "}
                    </ReactMarkdown> */}

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={mdComponents}
                    >
                      {streamingContent || " "}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
              {/* <div className="hidden" aria-hidden>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating…
                </div>
              </div> */}
            </div>
          </div>

          <Composer
            disabled={false}
            onSend={onSend}
            suggestions={[
              "Summarize with sources",
              "Add ayah reference",
              "List action steps",
            ]}
          />
        </main>
      </div>
    </div>
  );
}
