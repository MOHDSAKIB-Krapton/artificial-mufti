import Layout from "@/components/layout/page";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Layout>{children}</Layout>
    </div>
  );
}
