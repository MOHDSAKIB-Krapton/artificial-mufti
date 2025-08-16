"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Loader2,
  Menu,
  Mic,
  Paperclip,
  Pin,
  Plus,
  Search,
  Send,
  Share2,
  User,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-001",
    title: "Fajr prayer time when traveling",
    updatedAt: "Today · 2:35 PM",
    pinned: true,
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
      {
        id: "m-3",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
      {
        id: "m-5",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
    ],
  },
  {
    id: "conv-002",
    title: "Accidentally ate while fasting",
    updatedAt: "Yesterday · 8:04 PM",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "I took a bite by mistake during my fast. Is it broken?",
        createdAt: "8:02 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "If it was truly accidental and you stopped immediately upon remembering, your fast remains valid. Continue the day and consider making up later if unsure.",
        createdAt: "8:04 PM",
      },
    ],
  },
  {
    id: "conv-003",
    title: "Friday khutbah etiquette",
    updatedAt: "Aug 10 · 4:21 PM",
    messages: [
      {
        id: "m-5",
        role: "user",
        content: "Is whispering allowed during the khutbah?",
        createdAt: "4:19 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "Best practice is to listen silently. Even advising someone to be quiet is considered laghw during the khutbah.",
        createdAt: "4:21 PM",
      },
    ],
  },
  {
    id: "conv-004",
    title: "Fajr prayer time when traveling",
    updatedAt: "Today · 2:35 PM",
    pinned: true,
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
    ],
  },
  {
    id: "conv-005",
    title: "Accidentally ate while fasting",
    updatedAt: "Yesterday · 8:04 PM",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "I took a bite by mistake during my fast. Is it broken?",
        createdAt: "8:02 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "If it was truly accidental and you stopped immediately upon remembering, your fast remains valid. Continue the day and consider making up later if unsure.",
        createdAt: "8:04 PM",
      },
    ],
  },
  {
    id: "conv-006",
    title: "Friday khutbah etiquette",
    updatedAt: "Aug 10 · 4:21 PM",
    messages: [
      {
        id: "m-5",
        role: "user",
        content: "Is whispering allowed during the khutbah?",
        createdAt: "4:19 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "Best practice is to listen silently. Even advising someone to be quiet is considered laghw during the khutbah.",
        createdAt: "4:21 PM",
      },
    ],
  },
  {
    id: "conv-007",
    title: "Fajr prayer time when traveling",
    updatedAt: "Today · 2:35 PM",
    pinned: true,
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
    ],
  },
  {
    id: "conv-008",
    title: "Accidentally ate while fasting",
    updatedAt: "Yesterday · 8:04 PM",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "I took a bite by mistake during my fast. Is it broken?",
        createdAt: "8:02 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "If it was truly accidental and you stopped immediately upon remembering, your fast remains valid. Continue the day and consider making up later if unsure.",
        createdAt: "8:04 PM",
      },
    ],
  },
  {
    id: "conv-009",
    title: "Friday khutbah etiquette",
    updatedAt: "Aug 10 · 4:21 PM",
    messages: [
      {
        id: "m-5",
        role: "user",
        content: "Is whispering allowed during the khutbah?",
        createdAt: "4:19 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "Best practice is to listen silently. Even advising someone to be quiet is considered laghw during the khutbah.",
        createdAt: "4:21 PM",
      },
    ],
  },
  {
    id: "conv-010",
    title: "Fajr prayer time when traveling",
    updatedAt: "Today · 2:35 PM",
    pinned: true,
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
    ],
  },
  {
    id: "conv-011",
    title: "Accidentally ate while fasting",
    updatedAt: "Yesterday · 8:04 PM",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "I took a bite by mistake during my fast. Is it broken?",
        createdAt: "8:02 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "If it was truly accidental and you stopped immediately upon remembering, your fast remains valid. Continue the day and consider making up later if unsure.",
        createdAt: "8:04 PM",
      },
    ],
  },
  {
    id: "conv-012",
    title: "Friday khutbah etiquette",
    updatedAt: "Aug 10 · 4:21 PM",
    messages: [
      {
        id: "m-5",
        role: "user",
        content: "Is whispering allowed during the khutbah?",
        createdAt: "4:19 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "Best practice is to listen silently. Even advising someone to be quiet is considered laghw during the khutbah.",
        createdAt: "4:21 PM",
      },
    ],
  },
  {
    id: "conv-013",
    title: "Fajr prayer time when traveling",
    updatedAt: "Today · 2:35 PM",
    pinned: true,
    messages: [
      {
        id: "m-1",
        role: "user",
        content:
          "I'm flying across time zones tonight. How should I adjust Fajr timing?",
        createdAt: "2:33 PM",
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "When traveling, you follow the local prayer times of your current location. For Fajr, use the city you're in when the time enters. If you're in the air, pray after landing when the time arrives (or on the plane if landing will be after sunrise).",
        createdAt: "2:35 PM",
      },
    ],
  },
  {
    id: "conv-014",
    title: "Accidentally ate while fasting",
    updatedAt: "Yesterday · 8:04 PM",
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "I took a bite by mistake during my fast. Is it broken?",
        createdAt: "8:02 PM",
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "If it was truly accidental and you stopped immediately upon remembering, your fast remains valid. Continue the day and consider making up later if unsure.",
        createdAt: "8:04 PM",
      },
    ],
  },
  {
    id: "conv-015",
    title: "Friday khutbah etiquette",
    updatedAt: "Aug 10 · 4:21 PM",
    messages: [
      {
        id: "m-5",
        role: "user",
        content: "Is whispering allowed during the khutbah?",
        createdAt: "4:19 PM",
      },
      {
        id: "m-6",
        role: "assistant",
        content:
          "Best practice is to listen silently. Even advising someone to be quiet is considered laghw during the khutbah.",
        createdAt: "4:21 PM",
      },
    ],
  },
];

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

  function useAutoGrow(
    ref: React.RefObject<HTMLTextAreaElement | null>,
    value: string
  ) {
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      el.style.height = "0px"; // reset
      el.style.height = Math.min(el.scrollHeight, 240) + "px"; // cap growth
    }, [ref, value]);
  }

  function ChatBubble({ message }: { message: ChatMessage }) {
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

  function Composer({
    disabled,
    onSend,
    suggestions,
  }: {
    disabled?: boolean;
    onSend: (text: string) => void;
    suggestions: string[];
  }) {
    const [text, setText] = useState("");
    const taRef = useRef<HTMLTextAreaElement>(null);
    useAutoGrow(taRef, text);

    const send = () => {
      const value = text.trim();
      if (!value || disabled) return;
      onSend(value);
      setText("");
    };

    return (
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-b from-background/60 to-background backdrop-blur supports-[backdrop-filter]:backdrop-blur border-t border-border">
        <div className="mx-auto max-w-4xl px-3 py-3 space-y-3">
          {/* Smart suggestions */}
          {suggestions?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setText((t) => (t ? t + " " + s : s))}
                  className="text-xs md:text-sm rounded-full border border-border bg-card px-3 py-1 hover:bg-primary/10 hover:text-foreground transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <Card className="border border-primary/20 shadow-sm">
            <CardContent className="p-2">
              <div className="flex items-end gap-2">
                <div className="hidden sm:flex items-center gap-1 px-2 pb-2 text-muted-foreground">
                  <Badge variant="secondary" className="rounded-md">
                    /ask
                  </Badge>
                  <Badge variant="secondary" className="rounded-md">
                    /summarize
                  </Badge>
                </div>
                <div className="flex-1">
                  <textarea
                    ref={taRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    rows={1}
                    placeholder="Ask anything… (Shift + Enter for new line)"
                    className="block w-full max-h-60 resize-none bg-transparent px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1 pb-1 pr-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10"
                    disabled={disabled}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10"
                    disabled={disabled}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={send}
                    size="icon"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={disabled}
                    aria-label="Send"
                  >
                    {disabled ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-muted-foreground">
                <span>Shift + Enter = new line</span>
                <span>0 / 4,096 tokens (UI mock)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function Sidebar({
    open,
    onToggle,
    conversations,
    activeId,
    createNew,
    select,
  }: {
    open: boolean;
    onToggle: () => void;
    conversations: ConversationMeta[];
    activeId?: string;
    createNew: () => void;
    select: (id: string) => void;
  }) {
    return (
      <>
        {/* Desktop sidebar */}

        <div
          className={`
            hidden md:flex min-h-0 flex-col border-r border-border bg-card/40 transition-[width] duration-300 ease-out
            ${open ? "w-80" : "w-16"}
          `}
        >
          <div className="flex items-center gap-2 px-3 py-3 border-b border-border/60 ">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              aria-label="Toggle sidebar"
            >
              {open ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            <div
              className={`text-sm font-semibold tracking-wide
       ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
            >
              Chats
            </div>
            <div className="ml-auto">
              <Button
                size="sm"
                className={`gap-1  ${open ? "inline-flex" : "hidden"}`}
                onClick={createNew}
              >
                <Plus className="h-4 w-4" /> New chat
              </Button>
            </div>
          </div>

          <div className={`p-3 space-y-3 h-[80%] ${open ? "block" : "hidden"}`}>
            <div className="relative">
              <Input placeholder="Search conversations" className="pl-8 pr-2" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <div className="space-y-2 h-full overflow-y-scroll">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => select(c.id)}
                  className={`
                    w-full text-left rounded-lg border border-border/60 bg-background/60 hover:bg-primary/5 transition p-3 group
           ${activeId === c.id && "border-primary/40 bg-primary/5"}
                  `}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {c.title}
                    </span>
                    {c.pinned && <Pin className="h-3.5 w-3.5 text-primary" />}
                    {/* <div className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        className="hover:text-foreground"
                        title="Rename"
                        aria-label="Rename"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="hover:text-foreground"
                        title="Delete"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        className="hover:text-foreground"
                        title="More"
                        aria-label="More"
                      >
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div> */}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{c.updatedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <motion.div
          initial={false}
          animate={open ? { x: 0 } : { x: -340 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden flex flex-col fixed z-40 inset-y-0 left-0 w-80 border-r border-border bg-background"
          aria-hidden={!open}
        >
          <div className="flex items-center gap-2 px-3 py-6 md:py-3 border-b border-border/60">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-semibold tracking-wide">Chats</div>
            <div className="ml-auto">
              <Button size="sm" className="gap-1" onClick={createNew}>
                <Plus className="h-4 w-4" /> New
              </Button>
            </div>
          </div>

          <div className="p-3 space-y-3 min-h-0">
            <div className="relative">
              <Input placeholder="Search conversations" className="pl-8 pr-2" />
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-2 flex flex-col flex-1 overflow-y-auto max-h-[90%]">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    select(c.id);
                    onToggle();
                  }}
                  className={`
                      w-full text-left rounded-lg border border-border/60 bg-background/60 hover:bg-primary/5 transition p-3 group
                  ${activeId === c.id && "border-primary/40 bg-primary/5"}
                `}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {c.title}
                    </span>
                    {c.pinned && <Pin className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{c.updatedAt}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <button
          onClick={onToggle}
          className={`md:hidden fixed inset-0 z-30 bg-black/30 transition-opacity
            ${open ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
          aria-hidden={!open}
        />
      </>
    );
  }

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
