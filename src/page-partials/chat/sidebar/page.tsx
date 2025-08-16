import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConversationMeta } from "@/types/chat";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Pin,
  Plus,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar({
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
