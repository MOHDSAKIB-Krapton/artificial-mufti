"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // You should be using createClient() as the supabase constant doesn't exist
  // in your client file. We'll create the client instance inside the effect.

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
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    // This state should theoretically not be reached due to middleware protection
    return <p>Error: Not signed in</p>;
  }

  return (
    <div>
      <p>Signed in as {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
