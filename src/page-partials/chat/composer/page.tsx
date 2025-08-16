import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Mic, Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Composer({
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
