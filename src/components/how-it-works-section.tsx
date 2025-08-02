"use client";

import { MessageCircle, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Ask Your Question",
    description:
      "Type your Islamic question in plain language - no PhD in theology required!",
  },
  {
    icon: Brain,
    title: "AI Magic Happens",
    description:
      "Our AI processes your question using authentic Islamic sources and a dash of heavenly wisdom",
  },
  {
    icon: Sparkles,
    title: "Get Your Answer",
    description:
      "Receive a thoughtful, well-sourced response with the perfect blend of scholarship and personality",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How It Works
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative flex flex-col rounded-xl border border-border bg-card px-8 py-12 text-center shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 group-hover:border-primary/50">
                <step.icon
                  className="h-10 w-10 text-primary transition-all duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="mb-4 font-serif text-2xl font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
