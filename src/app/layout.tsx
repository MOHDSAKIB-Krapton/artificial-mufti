import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import ErrorReporter from "@/components/ErrorReporter";
import { Toaster } from "react-hot-toast";
import { HOST } from "@/constants";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    template: "%s | Artificial Mufti",
    default: "Artificial Mufti - AI-powered Islamic Guidance",
  },
  description:
    "Make your Islamic decisions easier with AI. Artificial Mufti provides accurate, AI-generated Islamic guidance and fatwas based on authentic sources.",
  keywords: [
    "Artificial Mufti",
    "AI",
    "Islamic decisions",
    "fatwa",
    "Islamic guidance",
    "Fiqh",
    "halal",
    "haram",
    "Islam",
  ],
  alternates: {
    canonical: HOST,
  },
  openGraph: {
    title: "Artificial Mufti - AI-powered Islamic Guidance",
    description:
      "Make your Islamic decisions easier with AI. Get guidance on Fiqh, halal, and more.",
    url: HOST,
    siteName: "Artificial Mufti",
    images: [{ url: `${HOST}/images/og-image.png` }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Mufti",
    description: "Get AI-powered Islamic guidance and fatwas.",
    images: [`${HOST}/images/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta
          name="google-site-verification"
          content="L9dGrIhCOUATOjoy7HQFL0tppg5ojXusr2kdgubyQM0"
        />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "Artificial Mufti", "version": "1.0.0", "greeting": "hi"}'
        />
        <Toaster />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
