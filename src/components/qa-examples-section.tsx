"use client";

import React from "react";
import { motion } from "motion/react";
import { User, Sparkles, Clock } from "lucide-react";

interface Message {
  id: number;
  type: "user" | "ai";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: number;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    messages: [
      {
        id: 1,
        type: "user",
        text: "Is it okay to pray in my pajamas?",
        timestamp: "2:34 PM",
      },
      {
        id: 2,
        type: "ai",
        text: "Absolutely! Allah cares more about your heart than your outfit. Though maybe save the unicorn onesie for private prayers 😉",
        timestamp: "2:35 PM",
      },
    ],
  },
  {
    id: 2,
    messages: [
      {
        id: 3,
        type: "user",
        text: "Can I break my fast if I accidentally ate during Ramadan?",
        timestamp: "3:18 PM",
      },
      {
        id: 4,
        type: "ai",
        text: "Yes, accidents happen! Just continue your fast and make up that day later. Allah is Most Forgiving, even for unconscious breakfast mistakes!",
        timestamp: "3:18 PM",
      },
    ],
  },
];

export default function QAExamplesSection() {
  return (
    <section className="bg-background py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-serif text-4xl md:text-5xl text-foreground mb-4"
        >
          See Me In Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto"
        >
          Real conversations showing how I help with everyday Islamic questions
        </motion.p>

        <div className="max-w-4xl mx-auto space-y-8">
          {conversations.map((conversation, convIndex) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + convIndex * 0.1 }}
              className="space-y-4"
            >
              {conversation.messages.map((message, msgIndex) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    x: message.type === "user" ? 50 : -50,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + convIndex * 0.2 + msgIndex * 0.1 }}
                  className={`flex gap-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "ai" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.4 + convIndex * 0.2 + msgIndex * 0.1,
                      }}
                      className="w-8 h-8 rounded-full bg-card flex-shrink-0 flex items-center justify-center border border-border"
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  )}

                  <div
                    className={`max-w-xs md:max-w-md xl:max-w-lg ${
                      message.type === "user" ? "order-first" : "order-first"
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        message.type === "user"
                          ? "bg-[#6B7A5A] text-white rounded-br-lg"
                          : "bg-card border border-primary/20 rounded-bl-lg"
                      }`}
                    >
                      {message.text}
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 ${
                        message.type === "user" ? "justify-end pr-2" : "pl-10"
                      }`}
                    >
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>

                  {message.type === "user" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.4 + convIndex * 0.2 + msgIndex * 0.1,
                      }}
                      className="w-8 h-8 rounded-full bg-[#6B7A5A]/10 flex-shrink-0 flex items-center justify-center border border-border"
                    >
                      <User className="w-4 h-4 text-[#6B7A5A]" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              More interactive features coming soon
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
