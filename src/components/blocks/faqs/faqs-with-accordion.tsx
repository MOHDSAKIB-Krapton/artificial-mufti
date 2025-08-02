"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQs = [
  {
    question: "Is it religiously acceptable to ask AI about Islam?",
    answer:
      "AI can be a valuable tool for learning and exploring Islamic knowledge, but it should complement—not replace—the wisdom and guidance of qualified human scholars. Think of Artificial Mufti as a knowledgeable companion that can provide information and perspectives, while respecting that final religious decisions belong with trained scholars who understand your specific context and community.",
  },
  {
    question: "How accurate are your responses?",
    answer:
      "We take accuracy seriously. Every response is cross-verified against authentic Islamic sources including the Quran, verified Hadith collections, and classical scholarship. Our responses undergo review by qualified scholars, though we always encourage cross-referencing our answers with your local imam or religious authority.",
  },
  {
    question: "Can you replace my local imam?",
    answer:
      "Only if your imam has been replaced by a highly sophisticated robot that can smell when someone hasn't showered before prayer, notice if you've been arguing with your spouse, and remembers everyone's dietary restrictions at community iftars! Jokes aside, while AI can provide knowledge, it lacks the human connection, community understanding, and spiritual guidance that make your local imam irreplaceable.",
  },
  {
    question: "What if I disagree with an answer?",
    answer:
      "Absolutely welcome! Critical thinking and seeking knowledge through questioning are encouraged in Islam. We encourage you to use our responses as a starting point for deeper exploration. Consult your local scholars, discuss with your community, and remember that the pursuit of knowledge is a lifelong journey that benefits from multiple perspectives.",
  },
  {
    question: "Do you store my questions?",
    answer:
      "Your privacy is sacred to us. We do not store your questions or any personal information. All interactions are processed in real-time without retention. Feel free to ask without concern that your personal spiritual queries will be stored or shared.",
  },
];

export function FrequentlyAskedQuestionsAccordion() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-20 md:grid-cols-2 md:px-8 md:py-40 bg-[#FEFCF8]">
      <h2 className="text-center text-4xl font-bold tracking-tight md:text-left md:text-6xl font-[var(--font-serif)] text-[#2C2B28]">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-[#E8E1D5]">
        {FAQs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            open={open}
            setOpen={setOpen}
          />
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({
  question,
  answer,
  setOpen,
  open,
}: {
  question: string;
  answer: string;
  open: string | null;
  setOpen: (open: string | null) => void;
}) => {
  const isOpen = open === question;

  return (
    <div
      className="cursor-pointer py-4"
      onClick={() => {
        if (isOpen) {
          setOpen(null);
        } else {
          setOpen(question);
        }
      }}
    >
      <div className="flex items-start">
        <div className="relative mr-4 mt-1 h-6 w-6 flex-shrink-0">
          <Plus
            className={cn(
              "absolute inset-0 h-6 w-6 transform text-[#C29B61] transition-all duration-200",
              isOpen && "rotate-90 scale-0"
            )}
          />
          <Minus
            className={cn(
              "absolute inset-0 h-6 w-6 rotate-90 scale-0 transform text-[#C29B61] transition-all duration-200",
              isOpen && "rotate-0 scale-100"
            )}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium text-[#2C2B28]">{question}</h3>
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden text-[#2C2B28]"
              >
                <p>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
