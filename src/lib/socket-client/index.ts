import { io, Socket } from "socket.io-client";
import { getStoredToken } from "@/utils/supabase/token";

let socket: Socket | null = null;

export async function getSocket(): Promise<Socket> {
  if (socket) return socket;

  const token = await getStoredToken();

  console.log("token => ", token);

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: {
      token: "Bearer " + token,
    },
    transports: ["websocket"],
    autoConnect: true,
  });

  return socket;
}
