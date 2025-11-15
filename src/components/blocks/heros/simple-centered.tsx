"use client";

export default function SimpleCentered() {
  const heading = "Meet Your Artificial Mufti";
  const subheading =
    "Ask away! I'm here 24/7 with wisdom, wit, and zero judgment (that's Allah's job)";
  const description =
    "  A sophisticated AI trained on authentic Islamic sources, ready to provide guidance on your spiritual journey";

  return (
    <div className="bg-[var(--background)]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          style={{ display: "none" }}
        />
        <div className="mx-auto max-w-2xl py-20 sm:py-48 lg:py-28">
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-[var(--muted-foreground)] ring-1 ring-[var(--border)] hover:ring-[var(--primary)]">
              Your 24/7 Islamic Companion <span aria-hidden="true">✨</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-[var(--font-serif)] tracking-tight text-balance text-[var(--foreground)] sm:text-7xl">
              {heading}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-[var(--muted-foreground)] sm:text-xl/8">
              {subheading}
            </p>
            <p className="mt-4 text-base text-[var(--muted-foreground)]">
              {description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/chat"
                className="rounded-md bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary-foreground)] shadow-md hover:bg-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
              >
                Start Asking Questions
              </a>
              <a
                href="/android-app-download"
                className="text-sm/6 font-semibold text-[var(--foreground)] flex justify-center items-center gap-x-2"
              >
                Download App{" "}
                <span aria-hidden="true" className="hidden sm:block">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
