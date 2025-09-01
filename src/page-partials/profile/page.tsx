"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { logout } from "@/app/(auth)/signin/action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, FileText, Download, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { ProfileServices } from "@/services/profile/profile.service";
import Loader from "@/components/common/loader";

export default function ProfilePage() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // UI toggles (client-side only; wire up as needed)
  // const [notifEmail, setNotifEmail] = useState(true);
  // const [notifPush, setNotifPush] = useState(true);
  // const [notifInApp, setNotifInApp] = useState(true);
  // const [twoFA, setTwoFA] = useState(false);
  // const [biometrics, setBiometrics] = useState(true);
  // const [smartSummaries, setSmartSummaries] = useState(true);
  // const [darkMode, setDarkMode] = useState(false);
  // const [language, setLanguage] = useState("en");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
      setFullName(
        user?.user_metadata?.ai_mufti?.display_name ??
          user?.user_metadata?.full_name ??
          ""
      );
      setMobile(
        user?.user_metadata?.ai_mufti?.phone ?? user?.user_metadata?.phone ?? ""
      );
      setLoading(false);

      if (error) {
        toast(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } catch {
    } finally {
      setLoggingOut(false);
    }
  };

  const handleSaveIdentityInfo = async () => {
    try {
      setSaving(true);
      const user = await ProfileServices.updateProfile(
        fullName.trim(),
        mobile.trim()
      );
      setUser(user);
    } catch (e: any) {
      toast.error(e?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      const response = await ProfileServices.deleteAccount();
      setDeleting(false);
      await handleSignOut();
    } catch (err) {
      setDeleting(false);
      console.log(err);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-sm text-muted-foreground">You are logged out.</div>
      </div>
    );
  }

  const email = user.email ?? "user@example.com";
  const initials = email[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      {/* Top: Gemini-like translucent header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-white/90 to-transparent dark:from-background/90 dark:to-transparent backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md">
        <div className="mx-auto max-w-5xl w-full px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={user.user_metadata?.avatar_url} alt="Avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold tracking-tight">
                {user.user_metadata?.full_name ?? "Your Name"}
              </h1>
              <p className="text-xs text-muted-foreground">
                Manage your account, preferences, and security for Artificial
                Mufti
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-2">
            <Button variant="secondary" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Improve Answers
            </Button>
            <Button variant="ghost" className="gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div> */}
        </div>
      </div>

      <div className="mx-auto max-w-5xl w-full px-4 pb-16">
        {/* Header card */}
        {/* <section className="mt-4 mb-6 rounded-2xl border bg-card p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt="Avatar"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold">
                    {user.user_metadata?.full_name ?? "Your Name"}
                  </h2>
                  <Badge variant="secondary">Member</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export data
              </Button>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete account
              </Button>
            </div>
          </div>
        </section> */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left column: Identity & Security */}
          <div className="col-span-1 space-y-6">
            {/* Identity */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Identity
                </h3>
              </div>
              <div className="mt-3 space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Full name
                  </label>
                  <Input
                    defaultValue={fullName ?? ""}
                    onChange={(c) => setFullName(c.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Email</label>
                  <Input defaultValue={email} type="email" disabled />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">
                    Phone (optional)
                  </label>
                  <Input
                    placeholder="+91 •••• •• ••••"
                    defaultValue={mobile}
                    onChange={(c) => setMobile(c.target.value)}
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <Button
                    size="sm"
                    onClick={handleSaveIdentityInfo}
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-4 border-primary/30 border-t-black border-l-black border-b-black animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </div>
              </div>
            </section>

            {/* Security */}
            {/* <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Security
                </h3>
              </div>
              <div className="mt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Two-factor authentication
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Add an extra layer of protection to your account
                    </p>
                  </div>
                  <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Biometric unlock</p>
                    <p className="text-xs text-muted-foreground">
                      Use device biometrics for quick unlock
                    </p>
                  </div>
                  <Switch
                    checked={biometrics}
                    onCheckedChange={setBiometrics}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Change password</p>
                    <p className="text-xs text-muted-foreground">
                      Update your account password
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <KeyRound className="h-4 w-4" />
                    Update
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-xs">Recent login verified</span>
                </div>
              </div>
            </section> */}

            {/* Devices & Sessions */}
            {/* <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Devices & Sessions
                </h3>
              </div>
              <div className="mt-3 space-y-3">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">
                        New Delhi • Active now
                      </p>
                    </div>
                    <Badge variant="secondary">This device</Badge>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Android App</p>
                      <p className="text-xs text-muted-foreground">
                        Last active: 2 days ago
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      Sign out
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    Sign out of all
                  </Button>
                </div>
              </div>
            </section> */}
          </div>

          {/* Right column: Preferences, Notifications, Data */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            {/* Preferences */}
            {/* <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Preferences
                </h3>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        Appearance
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Switch between light and dark
                      </p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      Language
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {["en", "ur", "hi"].map((lng) => (
                        <Button
                          key={lng}
                          variant={language === lng ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLanguage(lng)}
                        >
                          {lng.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 sm:col-span-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Smart Summaries</p>
                      <p className="text-xs text-muted-foreground">
                        Concise, referenced answers by default
                      </p>
                    </div>
                    <Switch
                      checked={smartSummaries}
                      onCheckedChange={setSmartSummaries}
                    />
                  </div>
                </div>
              </div>
            </section> */}

            {/* Notifications */}
            {/* <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Notifications
                </h3>
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">
                        Weekly digests & updates
                      </p>
                    </div>
                    <Switch
                      checked={notifEmail}
                      onCheckedChange={setNotifEmail}
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Push</p>
                      <p className="text-xs text-muted-foreground">
                        Instant alerts
                      </p>
                    </div>
                    <Switch
                      checked={notifPush}
                      onCheckedChange={setNotifPush}
                    />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">In-app</p>
                      <p className="text-xs text-muted-foreground">
                        Badges & banners
                      </p>
                    </div>
                    <Switch
                      checked={notifInApp}
                      onCheckedChange={setNotifInApp}
                    />
                  </div>
                </div>
              </div>
            </section> */}

            {/* Data & Privacy */}
            <section className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Data & Privacy
                </h3>
              </div>
              <div className="mt-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sign Out</p>
                    <p className="text-xs text-muted-foreground">
                      Signing Out will expire your current session
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={handleSignOut}
                  >
                    {loggingOut ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-4 border-primary/30 border-t-white border-l-white border-b-white animate-spin" />
                      </>
                    ) : (
                      <LogOut className="h-4 w-4" />
                    )}
                    Sign out
                  </Button>
                </div>

                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Download my data</p>
                    <p className="text-xs text-muted-foreground">
                      Export conversations, settings, and usage
                    </p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-destructive">
                      Delete account
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Permanently remove your data and access
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={handleDeleteAccount}
                    disabled={deleting}
                  >
                    {deleting ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-4 border-primary/30 border-t-white border-l-white border-b-white animate-spin" />
                      </>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Subtle bottom gradient veil (airy whitespace) */}
        <div className="mt-10 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>
    </div>
  );
}
