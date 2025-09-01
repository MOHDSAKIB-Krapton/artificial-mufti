"use client";

import { signInWithOAuth } from "./action";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Provider } from "@supabase/supabase-js";
import Image from "next/image";

const providers = [
  {
    name: "google" as Provider,
    label: "Continue with Google",
    icon: "/assets/svg/google.svg",
  },
  {
    name: "discord" as Provider,
    label: "Continue with Discord",
    icon: "/assets/svg/discord.svg",
  },
];

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Provider | null>(null);

  const handleOAuthSignin = async (provider: Provider) => {
    try {
      setError(null);
      setLoading(provider);

      const redirectUrl = `${window.location.origin}/auth/callback?next=/chat`;
      const { url } = await signInWithOAuth(provider, redirectUrl);

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(null);
    }
  };

  return (
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
            Continue with one of the following providers to sign in or sign up.
          </p>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="space-y-3">
          {providers.map((p) => (
            <Button
              key={p.name}
              onClick={() => handleOAuthSignin(p.name)}
              disabled={loading !== null}
              className="w-full gap-2"
              size="lg"
              variant="ghost"
            >
              {/* {p.icon} */}
              <Image
                src={p.icon}
                alt={p.name}
                width={18}
                height={18}
                className="mr-1"
              />
              {loading === p.name ? "Connecting..." : p.label}
            </Button>
          ))}
        </div>

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
  );
}
