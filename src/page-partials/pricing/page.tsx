import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const PricingPage = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free Access",
      price: "Free",
      description: "Perfect for personal use and exploration",
      features: [
        "Basic Quran & Hadith search",
        "unlimited questions per day",
        "Quick response time",
        "Advance Arabic translation",
      ],
      isPopular: true,
    },
    // {
    //   name: "Scholar",
    //   price: "$29/mo",
    //   description: "Ideal for students and dedicated practitioners",
    //   features: [
    //     "Unlimited questions",
    //     "Advanced tafsir & commentary",
    //     "Instant responses",
    //     "Multilingual support",
    //     "Exportable answers",
    //     "Weekly study guide",
    //   ],
    //   isPopular: true,
    // },
    // {
    //   name: "Institutional",
    //   price: "$99/mo",
    //   description: "For organizations and educational institutions",
    //   features: [
    //     "Everything in Scholar",
    //     "Multiple user accounts",
    //     "Custom branding",
    //     "Advanced analytics",
    //     "Priority support",
    //     "API access",
    //   ],
    // },
  ];

  return (
    <div className="min-h-screen bg-[#FEFCF8] text-[#2C2B28] font-sans">
      <section className="py-20 px-6 lg:px-8 bg-[#F7F4EF]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Path to Knowledge
            </h2>
            <p className="text-lg text-[#6B7A5A]">
              "We believe that every seeker of knowledge, from curious learners
              to dedicated scholars, deserves a guide. That's why we're
              committed to a completely free plan for everyone. Our mission is
              to support your journey of discovery without any barriers."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative border-[#E8E1D5] ${
                  tier.isPopular ? "border-2 border-[#C29B61]" : ""
                }`}
              >
                {tier.isPopular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#C29B61] text-[#2C2B28]">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="font-serif text-2xl mb-2">
                    {tier.name}
                  </CardTitle>
                  <div className="text-3xl font-bold mb-1">{tier.price}</div>
                  <CardDescription className="text-[#6B7A5A]">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-[#6B7A5A]">
                        <Check className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      tier.isPopular
                        ? "bg-[#C29B61] text-[#2C2B28] hover:bg-[#C29B61]/90"
                        : "border-[#C29B61] text-[#C29B61] hover:bg-[#C29B61]/10"
                    }`}
                    variant={tier.isPopular ? "default" : "outline"}
                  >
                    {tier.price === "Free" ? "Start Free" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
