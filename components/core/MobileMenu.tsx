"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { isActiveNavLink, navLinks } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import GameLauncher from "@/components/game/GameLauncher";
import ThemeSwitch from "./ThemeSwitch";
import WorkStatus from "./WorkStatus";

const toggleClass =
  "cursor-pointer text-sm leading-5 font-medium text-fg-muted transition-colors hover:text-fg";

/**
 * Phone menu. Motion follows the reference site: the panel fades in (220ms)
 * while settling down 18px (360ms, cubic-bezier(0.2, 0.8, 0.2, 1)), over a
 * blurred backdrop that fades in 260ms. Base UI handles focus and Escape.
 */
export default function MobileMenu({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={cn(toggleClass, className)}>
        / Menu
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-200 bg-black/20 backdrop-blur-[5px] transition-opacity duration-260 ease-[ease] data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none md:hidden" />
        <Dialog.Popup className="fixed inset-x-0 top-0 z-210 flex h-[min(676px,100dvh)] flex-col gap-8 border-b border-line bg-surface px-4 pt-0 pb-3 outline-hidden transition-[opacity,translate] duration-[220ms,360ms] ease-[ease,cubic-bezier(0.2,0.8,0.2,1)] data-ending-style:-translate-y-4.5 data-ending-style:opacity-0 data-starting-style:-translate-y-4.5 data-starting-style:opacity-0 motion-reduce:transition-none md:hidden">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="-mx-4 flex h-18.5 shrink-0 items-center border-b border-line px-4">
            <div className="flex flex-1">
              <Dialog.Close className={toggleClass}>/ Close</Dialog.Close>
            </div>
            <ThemeSwitch className="font-mono text-sm leading-5 font-medium" />
            <div className="flex flex-1 justify-end">
              <GameLauncher className="flex" />
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <nav
              aria-label="Main"
              className="flex min-h-0 flex-1 flex-col border-x border-line"
            >
              {navLinks.map((link) => {
                const active = isActiveNavLink(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    transitionTypes={[...forwardNav]}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-0 flex-1 items-center border-t border-line px-5 py-2.5 font-mono text-[40px] leading-12 font-medium tracking-[-0.8px] transition-colors duration-150 last:border-b",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <WorkStatus variant="menu" className="h-11 shrink-0" />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
