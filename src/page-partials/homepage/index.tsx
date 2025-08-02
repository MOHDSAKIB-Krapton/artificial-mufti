"use client";

import AboutVisionSection from "@/components/about-vision-section";
import { FrequentlyAskedQuestionsAccordion } from "@/components/blocks/faqs/faqs-with-accordion";
import SimpleCentered from "@/components/blocks/heros/simple-centered";
import CoreFeaturesSection from "@/components/core-features-section";
import HowItWorksSection from "@/components/how-it-works-section";
import QAExamplesSection from "@/components/qa-examples-section";
import React from "react";

const HomePage = () => {
  return (
    <>
      <SimpleCentered />
      <HowItWorksSection />
      <CoreFeaturesSection />
      <QAExamplesSection />
      <AboutVisionSection />
      <FrequentlyAskedQuestionsAccordion />
    </>
  );
};

export default HomePage;
