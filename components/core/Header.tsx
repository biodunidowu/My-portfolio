"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isActiveNavLink, navLinks } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import MobileMenu from "./MobileMenu";
import WorkStatus from "./WorkStatus";
import { useRef } from "react";
import { useHeaderHeightVar } from "@/lib/hooks/useHeaderHeightVar";

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  useHeaderHeightVar(headerRef);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      ref={headerRef}
      className="sticky top-0 z-100 flex h-23.75 items-center justify-between border-b border-[#EAECF0] bg-white px-4 xl:px-10"
    >
      <Link
        href="/"
        transitionTypes={[...forwardNav]}
        className="flex items-center gap-1"
      >
        <span className="relative size-12.5 shrink-0 overflow-hidden rounded-full bg-white">
          <Image
            src="/images/home/avatar.webp"
            alt=""
            width={75}
            height={94}
            className="absolute -top-2.5 left-1/2 h-23.5 w-18.75 max-w-none -translate-x-1/2"
          />
        </span>

        <span className="font-signature text-2xl leading-5 text-[#98A2B3]">
          Abiodun
        </span>
      </Link>

      <MobileMenu anchorRef={headerRef} />

      <nav
        aria-label="Main"
        className="absolute left-1/2 hidden h-full w-[calc(100%-480px)] max-w-223.25 -translate-x-1/2 grid-cols-4 xl:grid"
      >
        {navLinks.map((link) => {
          const active = isActiveNavLink(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              transitionTypes={[...forwardNav]}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center justify-center border-r border-[#EAECF0] text-base leading-7 font-medium transition-colors duration-200 first:border-l",
                active ? "text-black" : "text-[#98A2B3] hover:text-black",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <WorkStatus className="hidden xl:flex" />
    </header>
  );
}
