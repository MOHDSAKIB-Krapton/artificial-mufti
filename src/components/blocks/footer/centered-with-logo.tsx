"use client";

import { INSTAGRAM_LINK, LINKEDIN_LINK, X_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Privacy",
      href: "/terms",
    },
    {
      title: "Terms",
      href: "/terms",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <div className="border-t border-[#E8E1D5] px-8 py-16 bg-[#FEFCF8] w-full">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <Logo />

          <p className="text-sm text-[#6B7A5A] mt-4 font-light leading-relaxed">
            Islamic guidance, powered by AI, guided by tradition.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-6 text-sm text-[#2C2B28] my-8">
          {pages.map((page, idx) => (
            <li key={"pages" + idx}>
              <Link
                className="hover:text-[#C29B61] transition-colors"
                href={page.href}
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center gap-6 my-8">
          <Link
            href={X_LINK}
            title="Twitter Link"
            className="text-[#C29B61] hover:text-[#2C2B28] transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href={LINKEDIN_LINK}
            title="Linkedin Link"
            className="text-[#C29B61] hover:text-[#2C2B28] transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          {/* <Link
            href="#"
            className="text-[#C29B61] hover:text-[#2C2B28] transition-colors"
          >
            <Facebook className="h-5 w-5" />
          </Link> */}
          <Link
            href={INSTAGRAM_LINK}
            title="Instagram Link"
            className="text-[#C29B61] hover:text-[#2C2B28] transition-colors"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        <div className="text-xs text-[#6B7A5A] mt-8">
          <p>
            &copy; {new Date().getFullYear()} Artificial Mufti. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-['Crimson_Text'] text-2xl text-[#2C2B28] font-semibold"
    >
      Artificial Mufti
    </Link>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    ></div>
  );
};
