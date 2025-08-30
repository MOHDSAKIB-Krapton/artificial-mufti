"use client";

import { Button } from "@/components/ui/button";
import { Menu, User as UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import { Conversation } from "@/types/chat";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ChatServices from "@/services/chat/chat.service";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Loader from "@/components/common/loader";

const ChatPageLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const activeId = pathname.split("/").pop();

  const supabase = createClient();

  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllConversations();
  }, [pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (error) {
        toast(error.message);
      }
    };
    fetchUser();
  }, []);

  const getAllConversations = async () => {
    try {
      const data = await ChatServices.getAllConversations();
      setConversations(data);
    } catch (err: any) {
      console.log(err);
      toast(err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <>user isnt logged in</>;
  }

  const initials = user.email?.toUpperCase() || "U";

  return (
    <div className="max-h-[100dvh] self-stretch w-full flex bg-background text-foreground">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((s) => !s)}
        conversations={conversations}
        activeId={activeId}
        select={() => {}}
      />

      <div className="w-full flex flex-col ">
        <div className="z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
          <div className="mx-auto flex w-full items-center gap-2 px-3 py-3 md:justify-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm" className="gap-1">
              <Download className="h-4 w-4" /> Export
            </Button>
            <Button variant="default" size="sm" className="gap-1">
            <Sparkles className="h-4 w-4" /> New chat
            </Button>
            </div> */}

            <Link href={"/profile"} title="Profile" aria-label="Profile">
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt="Avatar"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Main Chat Functionality */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChatPageLayout;
