"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, ChevronLeft, ChevronRight, Loader2, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Conversation, ConversationMeta, Role } from "@/types/chat";
import { MOCK_CONVERSATIONS } from "@/data/mock";
import Sidebar from "./sidebar/page";
import ChatBubble from "./chat-bubble/page";
import Composer from "./composer/page";

export default function ProtectedChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [sidebarPinned, setSidebarPinned] = useState(true); // desktop width state
  const [conversations, setConversations] = useState<Conversation[]>(
    () => MOCK_CONVERSATIONS
  );
  const [activeId, setActiveId] = useState<string>(conversations[0]?.id ?? "");
  const active = useMemo(
    () => conversations.find((c) => c.id === activeId)!,
    [activeId, conversations]
  );

  // Derived meta for sidebar
  const sidebarList = useMemo<ConversationMeta[]>(
    () =>
      conversations
        .map(({ id, title, updatedAt, pinned }) => ({
          id,
          title,
          updatedAt,
          pinned,
        }))
        .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned)),
    [conversations]
  );

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
          content:
            "Assalamu alaikum! I'm your AI companion. Ask anything—this is a demo UI, no real API calls.",
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

  const onSend = (text: string) => {
    addMessage("user", text);
    // Optional UI-only mock reply
    setTimeout(() => {
      addMessage(
        "assistant",
        "(Mock) Thanks for your question. In production, this would call your backend."
      );
    }, 500);
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
          conversations={sidebarList}
          activeId={activeId}
          createNew={createNew}
          select={setActiveId}
        />

        <main className="min-h-0 flex flex-col flex-1 overflow-y-auto">
          {/* Conversation stream */}
          <div className="mx-auto w-full max-w-4xl flex-1 px-3 pt-6 pb-24">
            {active.messages.length === 0 && (
              <div className="mx-auto mt-10 max-w-md text-center text-muted-foreground">
                <Bot className="mx-auto mb-2 h-8 w-8 text-primary" />
                <p>Start your first question below.</p>
              </div>
            )}

            <div className="space-y-5">
              {active.messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <ChatBubble message={m} />
                </motion.div>
              ))}
              <div className="hidden" aria-hidden>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating…
                </div>
              </div>
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
