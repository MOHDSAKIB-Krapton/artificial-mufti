export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--background)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FEFCF8] via-[#F7F4EF] to-[#FEFCF8] opacity-80" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E8E1D5' fill-opacity='0.15'%3E%3Cpath d='M30 30c0 16.569-13.431 30-30 30S0 46.569 0 30 13.431 0 30 0s30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "120px 120px",
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
