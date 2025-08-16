"use client";

import { signInWithGoogle } from "./action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleOAuthSignin = async () => {
    try {
      setError(null);
      setLoading(true);

      const redirectUrl = `${window.location.origin}/auth/callback?next=/profile`;
      const { url } = await signInWithGoogle(redirectUrl);

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-6 py-20 bg-background">
      {/* soft dotted backdrop */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(theme(colors.muted.DEFAULT)_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      <Card className="relative w-full max-w-md border-primary/20 bg-card/60 backdrop-blur">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-2xl grid place-items-center bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm">
              Continue with Google to sign in or sign up.
            </p>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            onClick={handleOAuthSignin}
            disabled={loading}
            className="w-full gap-2"
            size="lg"
          >
            {/* Google logo */}
            <svg width="18" height="18" viewBox="0 0 48 48" className="mr-1">
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.71 1.22 9.19 3.23l6.85-6.85C36.68 2.13 30.7 0 24 0 14.82 0 6.73 5.1 2.69 12.55l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.2 5.6C43.98 37.13 46.1 31.3 46.1 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.67 28.75c-1.13-3.38-1.13-7.12 0-10.5l-7.98-6.2C.9 16.13 0 19.97 0 24c0 4.03.9 7.87 2.69 11.45l7.98-6.2z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.7 0 12.68-2.13 17.04-5.85l-7.2-5.6c-2.01 1.35-4.59 2.15-7.84 2.15-6.38 0-11.87-3.63-14.33-8.95l-7.98 6.2C6.73 42.9 14.82 48 24 48z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </g>
            </svg>
            {loading ? "Connecting..." : "Continue with Google"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <a href={"/terms"} title="Terms & Condition">
              <span className="underline">Terms</span> and{" "}
            </a>
            <a href={"/terms"} title="Privacy Policy">
              <span className="underline">Privacy Policy</span>.
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
