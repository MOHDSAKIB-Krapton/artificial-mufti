"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Globe,
  MessageCircle,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <MessageCircle className="w-6 h-6 text-amber-600" />,
    title: "Question & Answer",
    description:
      "Get instant answers to your Islamic questions with comprehensive scholarly insights",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-amber-600" />,
    title: "Quran with Tafsir",
    description:
      "Access any verse with authentic tafsir from classical and humourous AI",
  },
  {
    icon: <Search className="w-6 h-6 text-amber-600" />,
    title: "Hadith Lookup",
    description:
      "Search through verified hadith collections with chain authentication",
  },
  {
    icon: <Shield className="w-6 h-6 text-amber-600" />,
    title: "Fiqh Guidance",
    description:
      "Receive practical Islamic rulings based on authentic scholarly consensus",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-amber-600" />,
    title: "Dua Collections",
    description:
      "Access authentic duas for every occasion with proper Arabic and meaning",
  },
  {
    icon: <Globe className="w-6 h-6 text-amber-600" />,
    title: "Multilingual Support",
    description:
      "Available in Arabic, English, Urdu, Turkish, and more with contextual translation",
  },
];

const ProductPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FEFCF8] text-[#2C2B28] font-sans pt-10">
      <section className="relative py-20 px-6 lg:px-8">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-transparent to-green-100" />
        </div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1
            className={`font-serif text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Artificial Mufti
          </h1>
          <p
            className={`text-xl lg:text-2xl text-[#6B7A5A] mb-8 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Your 24/7 AI Islamic Scholar • Tradition Meets Technology
          </p>
          <p
            className={`text-lg text-[#2C2B28] max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Powered by advanced machine learning trained on authentic Islamic
            sources, verified hadith chains, and scholarly consensus. Ask
            complex questions, get nuanced answers. No judgment, just wisdom...
            and yes, we know you're googling at 3 AM.
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Button className="bg-[#C29B61] text-[#2C2B28] hover:bg-[#C29B61]/90 px-8 py-4 rounded-lg font-semibold text-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="border-[#C29B61] text-[#C29B61] hover:bg-[#C29B61]/10 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-8 bg-[#F7F4EF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-center mb-16">
            AI Scholarly Expertise at Your Fingertips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-[#E8E1D5] hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="mb-4 p-3 bg-[#FEFCF8] rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7A5A]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-center mb-16">
            Built on Authentic Sources, Powered by Innovation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-[#C29B61]/20 rounded-lg">
                  <Brain className="w-6 h-6 text-[#C29B61]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">
                    AI-Powered Understanding
                  </h3>
                  <p className="text-[#6B7A5A]">
                    Trained on 50,000+ authentic Islamic texts, classical
                    commentaries, and verified scholarly opinions
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-[#C29B61]/20 rounded-lg">
                  <Shield className="w-6 h-6 text-[#C29B61]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">
                    Rigorous Source Verification
                  </h3>
                  <p className="text-[#6B7A5A]">
                    Every hadith verified through authenticated chains, every
                    ruling cross-referenced with multiple scholars
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-[#C29B61]/20 rounded-lg">
                  <Globe className="w-6 h-6 text-[#C29B61]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-2">
                    Continuous Learning
                  </h3>
                  <p className="text-[#6B7A5A]">
                    Updated weekly with new scholarly works and research across
                    madhhab boundaries
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block p-8 bg-[#F7F4EF] rounded-2xl">
                <div className="text-5xl mb-4">📚</div>
                <p className="text-lg font-semibold mb-2">
                  100M+ Islamic Knowledge Points
                </p>
                <p className="text-[#6B7A5A]">Quran, Hadith, Fiqh & more</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
