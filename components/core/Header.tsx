"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact me", href: "#contact" },
];

const SCROLL_SPY_LINKS = NAV_LINKS.filter((link) => link.href !== "#home");

export default function Header() {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    const sections = SCROLL_SPY_LINKS.map((link) =>
      document.querySelector<HTMLElement>(link.href),
    ).filter((section): section is HTMLElement => section !== null);

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }

        const next = sections
          .map((section) => `#${section.id}`)
          .find((id) => visible.has(id));

        setActiveHref(next ?? "#home");
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-[#EAECF0] md:px-10 px-4 py-5 md:py-0 sticky top-0 z-100 bg-white">
      <a href="#home" className="flex items-center gap-3 ">
        <Image
          src="/images/profile-img.svg"
          alt="Abiodun"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full object-cover"
        />

        <span className="font-script text-2xl leading-none text-[#98A2B3]">
          Abiodun
        </span>
      </a>

      <nav className="hidden items-center md:flex">
        {NAV_LINKS.map((link) => {
          const isActive = activeHref === link.href;

          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "font-noodle text-lg border-r border-r-[#EAECF0] first:border-l first:border-l-[#EAECF0] py-8 px-20 uppercase transition-colors duration-200",
                isActive ? "text-black" : "text-[#9CA3AF] hover:text-black",
              )}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-5">
        <Image
          src="/images/game-pad.svg"
          alt="Abiodun"
          width={24}
          height={24}
        />

        <span className="inline-flex items-center gap-2 bg-[#F9FAFB] px-4 py-3 text-sm font-medium font-noodle">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          Open to work
        </span>
      </div>
    </header>
  );
}
