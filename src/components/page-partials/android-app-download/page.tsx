import {
  BookOpen,
  Clock,
  Download,
  FileCheck,
  Globe,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AndroidAppDownload = ({ release }: any) => {
  const features = [
    {
      icon: <Zap className="w-5 h-5" aria-hidden />,
      title: "AI-powered Q&A",
      description:
        "Get quick, sourced answers to Islamic queries with references to Quran and Hadith where applicable.",
    },
    {
      icon: <BookOpen className="w-5 h-5" aria-hidden />,
      title: "Sourced Content",
      description:
        "Answers include supporting references and contextual notes.",
    },
    {
      icon: <Clock className="w-5 h-5" aria-hidden />,
      title: "Prayer times & Qibla",
      description: "Accurate location-based prayer times and Qibla direction.",
    },
    {
      icon: <Shield className="w-5 h-5" aria-hidden />,
      title: "Privacy-first",
      description: "We don’t store your personal queries without consent.",
    },
    {
      icon: <Smartphone className="w-5 h-5" aria-hidden />,
      title: "Lightweight",
      description: "Small APK size, fast on low-end devices.",
    },
    {
      icon: <Globe className="w-5 h-5" aria-hidden />,
      title: "Multilingual",
      description: "Arabic, English, Urdu support with localized responses.",
    },
  ];

  return (
    <main className="min-h-screen text-[#2C2B28] font-sans bg-white pt-12">
      <header className="bg-[#FEFCF8] py-12 border-b border-[#EFE8DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {release.prerelease && (
            <Badge className=" mx-auto">Preview Build</Badge>
          )}

          <h1 className="mt-6 font-serif text-4xl lg:text-5xl font-bold leading-tight">
            Artificial Mufti — Islamic AI Assistant
          </h1>

          <p className="mt-4 text-lg text-[#6B7A5A] max-w-3xl mx-auto">
            Honest, privacy-first AI answers to Islamic questions. This is an
            early access release — please report issues and help us improve.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href={release.downloadUrl}
              className="bg-[#C29B61] text-[#2C2B28] hover:bg-[#C29B61]/90 px-6 py-3 text-base font-semibold shadow transition-all disabled:opacity-60 rounded-md flex items-center"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden />
              Download APK — {release.version}
            </a>

            <div className="text-sm text-[#6B7A5A]">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-600" aria-hidden />
                <span>
                  Version {release.version} • {release.sizeMB}
                </span>
              </div>
              <br /> • Updated {new Date(release.updated).toLocaleDateString()}{" "}
              • Downloads {release.downloadCount + 200}
            </div>
          </div>
        </div>
      </header>

      <section className="py-14 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <article>
            <h2 className="font-serif text-3xl font-bold mb-4">
              Why Artificial Mufti?
            </h2>
            <p className="text-[#6B7A5A] leading-relaxed mb-4">
              Artificial Mufti is designed to provide fast, referenced answers
              to common Islamic questions. It is not a replacement for qualified
              religious scholars; rather, it is a research and learning aid that
              points to primary sources when possible.
            </p>

            <p className="text-[#6B7A5A] leading-relaxed">
              This early access release focuses on accurate sourcing, a
              privacy-first approach, and a lightweight experience suitable for
              low-end devices. By downloading this APK, you consent to test the
              app and provide feedback to help shape future versions.
            </p>
          </article>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {features.map((f, i) => (
              <Card key={i} className="border-[#E8E1D5]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F7F4EF] rounded-lg flex items-center justify-center text-[#C29B61]">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{f.title}</h3>
                      <p className="text-sm text-[#6B7A5A] mt-1">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-8 bg-[#FFF8E7] rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Installation Guide
          </h2>
          <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex-1">
              <p className="text-[#6B7A5A] mb-4">
                APK file installs directly on Android devices. Follow these
                steps carefully and ensure you only install from trusted
                sources.
              </p>

              <ol className="list-decimal list-inside text-[#6B7A5A] space-y-2">
                <li>Download the APK using the button above.</li>
                <li>
                  Open Settings &gt; Security &gt; Install unknown apps (or
                  Unknown Sources).
                </li>
                <li>Allow your browser or file manager to install the APK.</li>
                <li>
                  Open the downloaded APK and confirm the installation prompts.
                </li>
                <li>
                  After install, revoke the unknown sources permission if
                  desired.
                </li>
              </ol>

              <p className="mt-3 text-sm text-[#9AA08A]">
                If you are unsure about installing APKs, use an Android emulator
                or wait for Play Store availability.
              </p>
            </div>

            <aside className="w-full lg:w-64">
              <div className="bg-white border border-[#E8E1D5] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-[#C29B61]" aria-hidden />
                  <h4 className="font-semibold">System Requirements</h4>
                </div>
                <ul className="text-sm text-[#6B7A5A] space-y-1">
                  <li>Android 6.0 or newer</li>
                  <li>~{release.sizeMB} MB free space</li>
                  <li>Internet for online features</li>
                </ul>
              </div>

              <div className="mt-4 bg-white border border-[#E8E1D5] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-600" aria-hidden />
                  <h4 className="font-semibold">Safety Tips</h4>
                </div>
                <ul className="text-sm text-[#6B7A5A] space-y-1">
                  <li>
                    Scan APK with VirusTotal or similar before installing.
                  </li>
                  <li>Check app permissions at install time.</li>
                  <li>Keep backups of important data.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-[#6B7A5A]">
            <details className="bg-white border border-[#E8E1D5] rounded-lg p-4">
              <summary className="font-medium cursor-pointer">
                Is Artificial Mufti free?
              </summary>
              <p className="mt-2 text-sm">
                Yes. This early access APK is free to download and use.
              </p>
            </details>

            <details className="bg-white border border-[#E8E1D5] rounded-lg p-4">
              <summary className="font-medium cursor-pointer">
                How accurate are answers?
              </summary>
              <p className="mt-2 text-sm">
                We strive to include references and context. The app is an
                educational aid and not a substitute for a qualified scholar.
              </p>
            </details>

            <details className="bg-white border border-[#E8E1D5] rounded-lg p-4">
              <summary className="font-medium cursor-pointer">
                Do you collect personal data?
              </summary>
              <p className="mt-2 text-sm">
                The app is privacy-first. No personal queries are stored without
                explicit consent.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AndroidAppDownload;
