"use client";

import {
  Clock,
  Globe,
  BookOpen,
  Heart,
  Zap,
  GraduationCap,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Clock className="h-8 w-8" />,
    title: "24/7 Availability",
    description: "Always awake, unlike your local imam at 3 AM",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Multilingual Support",
    description: "Speaks your language, understands your culture",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Scholarly Accuracy",
    description: "Backed by authentic sources, not Wikipedia",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "No Judgment Zone",
    description: "Ask anything without the side-eye",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Instant Responses",
    description: "Faster than saying 'Allahu A'lam'",
  },
  {
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Continuous Learning",
    description: "Always growing, just like your iman",
  },
];

export default function CoreFeaturesSection() {
  return (
    <section className="w-full bg-[#FEFCF8] py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-center font-serif text-4xl font-semibold text-[#2C2B28] md:text-5xl lg:text-6xl">
          Why Choose Artificial Mufti?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-[#E8E1D5] bg-[#F7F4EF] p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 opacity-5">
                <div className="h-full w-full rotate-45 transform bg-gradient-to-br from-[#C29B61] to-[#C29B61] pattern-islamic" />
              </div>

              <div className="relative">
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#FEFCF8] p-3 text-[#C29B61] shadow-sm transition-colors duration-300 group-hover:bg-[#C29B61] group-hover:text-[#FEFCF8]">
                  {feature.icon}
                </div>

                <h3 className="mb-2 font-serif text-xl font-semibold text-[#2C2B28]">
                  {feature.title}
                </h3>

                <p className="text-base leading-relaxed text-[#2C2B28] opacity-90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
