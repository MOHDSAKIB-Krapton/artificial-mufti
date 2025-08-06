"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { APP_TITLE } from "@/constants";
import { useIsAuthenticated } from "@/hooks/use-isAuthenticated";

const navigation = [
  { name: "Product", href: "/product" },
  { name: "Coming Soon", href: "/coming-soon" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  // Hook to check globally if user is authenticated or not.
  const isAuthenticated = useIsAuthenticated();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-[var(--background)]">
      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled
            ? "bg-[var(--background)/80] backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{APP_TITLE}</span>
              <div className="h-8 w-auto font-[var(--font-serif)] text-xl text-[var(--foreground)]">
                ☪ {APP_TITLE}
              </div>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--foreground)]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-[var(--foreground)]"
              >
                {item.name}
              </a>
            ))}
          </div>
          {!isAuthenticated && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a
                href="/coming-soon"
                className="text-sm/6 font-semibold text-[var(--foreground)]"
              >
                Join Now <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[var(--background)] p-6 sm:max-w-sm sm:ring-1 sm:ring-[var(--border)]">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{APP_TITLE}</span>
                <div className="h-8 w-auto font-[var(--font-serif)] text-xl text-[var(--foreground)]">
                  ☪ {APP_TITLE}
                </div>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-[var(--foreground)]"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-[var(--border)]">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {!isAuthenticated && (
                  <div className="py-6">
                    <a
                      href="/coming-soon"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-[var(--foreground)] hover:bg-[var(--muted)]"
                    >
                      Join Now
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
