"use client";

import {
  BookOpen,
  Clock,
  Download,
  FileCheck,
  Globe,
  Shield,
  Smartphone,
  Zap,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import React from "react";

const AndroidAppDownload = ({ release }: any) => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Q&A",
      description:
        "Get quick, sourced answers to Islamic queries with references to Quran and Hadith.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sourced Content",
      description:
        "Every answer includes supporting references and contextual notes for verification.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Prayer Times",
      description: "Accurate location-based prayer times and Qibla direction.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy-First",
      description: "We don’t store your personal queries without your explicit consent.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Lightweight",
      description: "Optimized for performance with a small APK size for all devices.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilingual",
      description: "Support for Arabic, English, and Urdu with localized responses.",
    },
  ];

  return (
    <main className="min-h-screen font-sans bg-background text-foreground selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center z-10">
          {release.prerelease && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Early Access Preview
            </div>
          )}

          <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Artificial Mufti
            <span className="block text-2xl lg:text-3xl text-muted-foreground font-sans font-normal mt-4 tracking-normal">
              Your Honest, Privacy-First Islamic AI Assistant
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Designed to provide fast, referenced answers to your questions.
            Currently in early access — help us shape the future of Islamic AI.
          </p>

          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <a
              href={release.downloadUrl}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download APK
              <span className="opacity-70 font-normal text-sm ml-1">v{release.version}</span>
            </a>

            <div className="flex items-center gap-4 text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-full border border-border/50 backdrop-blur-sm">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-green-600" />
                {release.sizeMB}
              </span>
              <span className="w-px h-4 bg-border" />
              <span>Updated {new Date(release.updated).toISOString().split("T")[0]}</span>
              <span className="w-px h-4 bg-border" />
              <span>{release.downloadCount + 200}+ Downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 lg:px-8 bg-card/30 rounded-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Why Artificial Mufti?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with a focus on accuracy, privacy, and accessibility. A research tool designed to aid, not replace, qualified scholarship.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-background rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="font-serif text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-serif text-3xl font-bold mb-6">Installation Guide</h2>
              <p className="text-muted-foreground mb-10">
                Since this is an early access preview, you'll need to install the APK manually. It's safe, simple, and takes less than a minute.
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: "Download the APK",
                    desc: "Click the download button above to save the file to your device.",
                  },
                  {
                    title: "Enable Unknown Sources",
                    desc: "Go to Settings > Security and allow installing apps from your browser/file manager.",
                  },
                  {
                    title: "Install & Launch",
                    desc: "Open the downloaded file, confirm installation, and you're ready to go.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">System Requirements</h4>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Android 6.0 (Marshmallow) or newer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> ~{release.sizeMB} MB free storage space
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Internet connection for AI features
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-card rounded-2xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">Safety & Security</h4>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Clean APK (Scan with VirusTotal)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Minimal permissions required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Privacy-first data handling
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 lg:px-8 bg-card/30 rounded-xl">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                q: "Is Artificial Mufti free to use?",
                a: "Yes, this early access release is completely free to download and use. We may introduce premium features in the future, but the core functionality will remain accessible.",
              },
              {
                q: "How accurate are the answers?",
                a: "We prioritize accuracy by sourcing answers from recognized Islamic texts. However, AI can make mistakes. Always verify with the provided references and consult a qualified scholar for personal rulings.",
              },
              {
                q: "What about my privacy?",
                a: "Your privacy is our top priority. We do not store your personal queries or data without your explicit consent. All interactions are handled with strict confidentiality.",
              },
            ].map((item, i) => (
              <details key={i} className="group bg-background border border-border rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-card/50 transition-colors">
                  <span className="font-medium text-lg">{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AndroidAppDownload;
