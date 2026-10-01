"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact me", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-[#EAECF0] lg:px-10 px-4 py-5 lg:py-0 sticky top-0 z-10 bg-white">
      <Link href="/" className="flex items-center gap-3 ">
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
      </Link>

      <MobileMenu />

      <nav className="hidden items-center lg:flex">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "font-noodle text-lg border-r border-r-[#EAECF0] first:border-l first:border-l-[#EAECF0] py-8 px-20 uppercase transition-colors duration-200",
                active ? "text-black" : "text-[#9CA3AF] hover:text-black",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden lg:flex items-center gap-5">
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
