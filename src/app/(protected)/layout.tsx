import { useIsAuthenticated } from "@/hooks/use-isAuthenticated";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}
