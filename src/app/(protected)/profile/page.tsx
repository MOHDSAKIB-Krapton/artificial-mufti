"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { logout } from "@/app/(auth)/signin/action";

export default function Profile() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await logout();

      setUser(null);
      redirect("/");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Logged out</p>;
  }

  return (
    <div className="min-h-screen justify-center items-center flex flex-1 flex-col">
      <p>Signed in as {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
