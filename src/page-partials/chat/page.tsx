"use client";

import { Bot } from "lucide-react";
import Composer from "./composer/page";

export default function ChatPage({
  onStartNewChat,
}: {
  onStartNewChat: (text: string) => void;
}) {
  return (
    <main className="min-h-0 flex flex-col flex-1 overflow-y-auto">
      <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Bot className="h-16 w-16 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            How can I help you today?
          </h1>
        </div>

        <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Example Prompt 1 */}
          <div
            className="group cursor-pointer rounded-xl border bg-card/50 p-4 transition-colors hover:bg-card"
            onClick={() =>
              onStartNewChat(
                "Summarize the main points of the chapter on Islamic history."
              )
            }
          >
            <h3 className="text-base font-semibold text-foreground">
              Summarize a document
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Quickly get a summary of a text or document with key takeaways.
            </p>
          </div>

          {/* Example Prompt 2 */}
          <div
            className="group cursor-pointer rounded-xl border bg-card/50 p-4 transition-colors hover:bg-card"
            onClick={() =>
              onStartNewChat("What is the significance of the Quran in Islam?")
            }
          >
            <h3 className="text-base font-semibold text-foreground">
              Ask a complex question
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Explore in-depth topics and receive well-researched, detailed
              answers.
            </p>
          </div>

          {/* Example Prompt 3 */}
          <div
            className="group cursor-pointer rounded-xl border bg-card/50 p-4 transition-colors hover:bg-card"
            onClick={() =>
              onStartNewChat("Provide a list of recommended books on Seerah.")
            }
          >
            <h3 className="text-base font-semibold text-foreground">
              Get a recommended list
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Receive curated lists of books, resources, or action steps.
            </p>
          </div>

          {/* Example Prompt 4 */}
          <div
            className="group cursor-pointer rounded-xl border bg-card/50 p-4 transition-colors hover:bg-card"
            onClick={() =>
              onStartNewChat(
                "Explain the five pillars of Islam in simple terms."
              )
            }
          >
            <h3 className="text-base font-semibold text-foreground">
              Explain a concept
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Break down complicated topics into easy-to-understand
              explanations.
            </p>
          </div>
        </div>
      </div>

      <Composer disabled={false} onSend={onStartNewChat} suggestions={[]} />
    </main>
  );
}
