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

export default function ChatPage() {
  const [socketState, setSocketState] = useState<Socket | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [sidebarPinned, setSidebarPinned] = useState(true); // desktop width state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
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
        console.log("Trying to connect to socket inside useeffect");
        socket = await getSocket();
        setSocketState(socket);

        socket.on("connect", () => {
          console.log("Connected to socket:", socket);
        });

        socket.on("server_chunk", (data: { role: Role; content: string }) => {
          console.log("data => ", data);
          setIsTyping(false);
          addMessage(data.role, data.content);
        });

        socket.on("error", (e) => {
          console.error("Socket error:", e);
          console.error("❌ Socket connection failed:", e);
        });
        socket.on("dicconnect", (e) => {
          console.error("Socket disconnected:", e);
          console.error("❌ Socket connection disconnected:", e);
        });
      } catch (err) {
        console.error("Failed to connect socket:", err);
      }
    })();

    return () => {
      if (socketState) {
        socketState.disconnect();
      }
    };
  }, []);

  function createMuftiDemo(
    addMessage: (role: Role, content: string) => void,
    index: number
  ) {
    const assistantScript: string[] = [
      "Short answer: No, it's Haram. Long answer: Let's talk.",
      `Because crypto is like digital air. It has no real asset, no stability, and no backing. It's just speculation, which is similar to gambling.

Qur'an says:
> "Allah has permitted trade and forbidden interest." (Surah al-Baqarah 2:275)
> "Wine, gambling, idols and divination are filthy works of Shayṭān, so avoid them." (Surah al-Mā'idah 5:90)`,
      `That's true. Halal risk involves effort and real value. Crypto risk, however, is pure gamble with no intrinsic value. That’s *maysir* (gambling), not business.

Reference: Radd al-Muḥtār, Kitāb al-Ḥaẓr wa’l-Ibāḥa (9/577)
Fatwa Darul Uloom Deoband (Fatwa no. 5709-595/N=11/1446)`,
      `That’s exactly the trap. Sometimes it goes up, and sometimes it crashes. The Hadith also warns against dealing with usury, which is a component of such transactions.

Hadith:
"Rasulullah ﷺ cursed the one who consumes interest, the one who gives it, the one who records it, and its witnesses." (Muslim, Kitāb al-Buyūʿ)

Al-Qamār ḥaqīqah wa aḥkāmuhu – Dr. Sulaymān al-Mulḥim (p. 74-75)`,
      `The final verdict is that crypto trading is Haram. It has elements of gambling and usury. Halal wealth might be slower, but it is pure and blessed.

Qur’an Reminder:
> "Do not consume one another’s wealth unjustly." (Surah al-Baqarah 2:188)

References used:
* Qur’an (2:275, 5:90, 2:188)
* Ḥadīth: Ṣaḥīḥ Muslim (Kitāb al-Buyūʿ)
* Fatwa: Darul Uloom Deoband, No. 633886
* Radd al-Muḥtār (Ibn ‘Ābidīn, 9/577)
* Al-Qamār ḥaqīqah wa aḥkāmuhu, Dr. Sulaymān al-Mulḥim`,
    ];

    return function respondLikeMufti() {
      if (index >= assistantScript.length) return;

      setIsTyping(true);

      // setTimeout(() => {
      //   // Now replace the "typing" with real message
      //   setIsTyping(false);
      //   addMessage("assistant", assistantScript[index]);
      //   setIndex((prev) => prev + 1);
      // }, 2000);

      typingTimerRef.current = window.setTimeout(() => {
        addMessage("assistant", assistantScript[index]);
        setIndex((i) => i + 1);
        setIsTyping(false);
      }, 2000);
    };
  }

  // Derived meta for sidebar
  // const sidebarList = useMemo<ConversationMeta[]>(
  //   () =>
  //     conversations
  //       .map(({ id, title, updatedAt, pinned }) => ({
  //         id,
  //         title,
  //         updatedAt,
  //         pinned,
  //       }))
  //       .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned)),
  //   [conversations]
  // );

  useEffect(() => {
    getAllConversations();
  }, []);

  const getAllConversations = async () => {
    try {
      const data = await ChatServices.getAllConversations();
      setConversations(data);
      console.log("Conversations => ", data);
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
      updatedAt: "Just now",
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
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(id);
  };

  const muftiDemo = useMemo(
    () => createMuftiDemo(addMessage, index),
    [addMessage]
  );

  const onSend = async (text: string) => {
    if (!socketState) {
      return;
    }

    addMessage("user", text);
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
            {active?.messages.length === 0 && (
              <div className="mx-auto mt-10 max-w-md text-center text-muted-foreground">
                <Bot className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p>Start your first question below.</p>
              </div>
            )}
            <div className="space-y-5">
              {active?.messages.map((m) => (
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Gathering
                  Authentic answers…
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
