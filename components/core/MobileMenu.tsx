"use client";

import { useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";
import { isActiveNavLink, navLinks } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import WorkStatus from "./WorkStatus";

const MobileMenu = ({
  anchorRef,
}: {
  /** The header, so the menu drops down at its full width. */
  anchorRef: RefObject<HTMLElement | null>;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        aria-label={open ? "Close menu" : "Open menu"}
        className="bg-[#F9FAFB] p-2 transition-[scale] duration-160 ease-out active:scale-97 xl:hidden"
      >
        <Image src="/images/menu.svg" width={24} height={24} alt="" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner
          anchor={anchorRef}
          side="bottom"
          align="start"
          sideOffset={0}
          collisionPadding={0}
          className="isolate z-200"
        >
          <Popover.Popup className="w-(--anchor-width) border-b border-[#EAECF0] bg-white px-4 py-3 outline-hidden duration-150 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-2 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 xl:hidden">
            <nav aria-label="Main" className="flex flex-col border-x border-[#EAECF0]">
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
                      "flex h-24.5 items-center justify-center border-b border-[#EAECF0] text-base leading-7 transition-colors duration-200 first:border-t",
                      active ? "text-black" : "text-[#98A2B3] hover:text-black",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <WorkStatus variant="menu" className="h-11" />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default MobileMenu;
