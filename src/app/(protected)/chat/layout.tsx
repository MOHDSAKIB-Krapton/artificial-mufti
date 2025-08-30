import ChatPageLayout from "@/page-partials/chat/chatPageLayout/page";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatPageLayout>{children}</ChatPageLayout>;
}
