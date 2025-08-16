"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6 py-20 bg-background">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(theme(colors.muted.DEFAULT)_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <Card className="relative w-full max-w-xl border-primary/20 bg-card/60 backdrop-blur">
        <CardContent className="p-10 text-center space-y-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="mx-auto w-16 h-16 rounded-2xl grid place-items-center bg-primary/10"
          >
            <Sparkles className="h-7 w-7 text-primary" />
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              404 — Not Found
            </h1>
            <p className="text-muted-foreground">
              We couldn't find that page. It may have moved or never existed.
            </p>
            <p dir="rtl" className="text-sm text-muted-foreground/80">
              لم نتمكّن من العثور على هذه الصفحة
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button asChild className="gap-2">
              <Link href="/">
                Go Home <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
