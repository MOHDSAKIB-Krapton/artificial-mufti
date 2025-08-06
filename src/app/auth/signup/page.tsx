"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Crucial for the email confirmation flow.
        // This tells Supabase where to redirect the user after they click
        // the confirmation link in their email.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      // On a successful sign-up, Supabase sends a confirmation email.
      // We should inform the user about this and redirect them.
      alert("Success! Please check your email to confirm your account.");
      router.push("/login");
    }

    setLoading(false);
  };

  const handleOAuthSignUp = async (provider: "google") => {
    setError(null);
    setLoading(true);

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // This tells Supabase where to redirect the user after
        // they successfully authenticate with the OAuth provider.
        // It must be one of the Redirect URLs in your Supabase dashboard.
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    console.log("DATA FROM AUTH => ", data);

    if (error) {
      setError(error.message);
    } else {
      router.push("/(protected)/profile");
    }
    setLoading(false);
    // Note: The `signInWithOAuth` method will automatically
    // redirect the user to the Google login page.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Email/Password Sign-Up Form */}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">or</div>

        {/* OAuth Sign-Up Buttons */}
        <button
          onClick={() => handleOAuthSignUp("google")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full flex items-center justify-center"
        >
          <img
            src="/google-icon.svg"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}
