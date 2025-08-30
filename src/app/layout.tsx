import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import ErrorReporter from "@/components/ErrorReporter";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Artificial Mufti",
  description: "Make your Islamic decisions easier with AI",
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
      </body>
    </html>
  );
}
