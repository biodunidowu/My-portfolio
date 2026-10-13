"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { isActiveNavLink } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import { useHeaderHeightVar } from "@/lib/hooks/useHeaderHeightVar";
import GameLauncher from "@/components/game/GameLauncher";
import MobileMenu from "./MobileMenu";
import ThemeSwitch from "./ThemeSwitch";
import WorkStatus from "./WorkStatus";

// The desktop bar only carries Works and About; the logo goes home and the
// mobile menu lists every page.
const desktopLinks = [
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
];

export function Logo() {
  return (
    <Link
      href="/"
      transitionTypes={[...forwardNav]}
      aria-label="biodun, home"
      className="flex shrink-0 items-center gap-1"
    >
      <span className="relative size-12.5 shrink-0 overflow-hidden rounded-full bg-surface">
        <Image
          src="/images/home/avatar.webp"
          alt=""
          width={75}
          height={94}
          className="absolute -top-2.5 left-1/2 h-23.5 w-18.75 max-w-none -translate-x-1/2"
        />
      </span>
      <span className="font-signature text-2xl leading-5 text-fg-muted">
        biodun
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  useHeaderHeightVar(headerRef);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      ref={headerRef}
      className="sticky top-0 z-100 flex h-18.5 items-center border-b border-line bg-surface px-4 py-3 md:h-18.75 md:px-8"
    >
      {/* Left: menu trigger on phones; logo + nav from tablet up. */}
      <div className="flex flex-1 items-center gap-6">
        <MobileMenu className="md:hidden" />
        <div className="hidden items-center gap-6 md:flex">
          <Logo />
          <nav aria-label="Main" className="flex items-center gap-6">
            {desktopLinks.map((link) => {
              const active = isActiveNavLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  transitionTypes={[...forwardNav]}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex flex-col gap-0.5 font-mono text-base leading-7 uppercase transition-colors duration-short ease-out-cubic",
                    active ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={cn(
                      "h-px w-full bg-fg transition-transform duration-short ease-out-cubic motion-reduce:transition-none",
                      // Grows from the left on hover and retracts to the right on leave.
                      active
                        ? "scale-x-100"
                        : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <ThemeSwitch className="shrink-0 gap-0 font-medium text-sm leading-5 md:font-mono md:font-normal lg:text-base lg:leading-7 [&>span>span[aria-hidden]]:mx-2.5" />

      {/* Right: gamepad on phones; gamepad + status from tablet up. */}
      <div className="flex flex-1 items-center justify-end">
        <GameLauncher className="flex md:hidden" />
        <WorkStatus className="hidden md:flex" />
      </div>
    </header>
  );
}
