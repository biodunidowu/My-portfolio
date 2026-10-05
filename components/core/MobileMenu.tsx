"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isActiveNavLink, navLinks } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MobileMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        aria-label="Open menu"
        className="p-2 bg-[#F9FAFB] xl:hidden"
      >
        <Image src="/images/menu.svg" width={24} height={24} alt="" />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={2}
        className="w-88 max-w-sm divide-y divide-[#EAECF0] overflow-hidden p-0 gap-0 rounded-none z-200 pb-4"
      >
        <div className="p-4 pb-0">
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
                  "font-noodle block py-4.5 text-center text-2xl uppercase transition-colors duration-200 border-b border-x border-[#EAECF0] first:border-t",
                  active ? "text-black" : "text-[#9CA3AF] hover:text-black",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-[auto_1fr] px-4">
          <div className="flex items-center justify-center border-r border-r-[#EAECF0] bg-[#F3F4F6] px-8 py-2.5">
            <Image src="/images/game-pad.svg" width={24} height={24} alt="" />
          </div>

          <div className="font-noodle flex items-center justify-center gap-2 px-4 py-5.5 text-xl font-medium bg-[#F9FAFB]">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            Open to work
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MobileMenu;
