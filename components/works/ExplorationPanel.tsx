"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { EXPLORATION_TITLE_ID } from "./ExplorationDetail";

/**
 * The design's exploration sheet: it rises over the Works page, below a dimmed
 * and blurred strip that keeps the header in view (SL + ease-out-quart in,
 * N + ease-in-cubic out, as the mobile menu). Escape, the strip or (on phones) "/ Close"
 * closes it; the route goes back once the exit has played.
 */
export default function ExplorationPanel({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);

  // Stepping to a neighbour swaps the content in place: start it at the top.
  useEffect(() => {
    popupRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) router.back();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-200 bg-black/50 backdrop-blur-[5px] transition-opacity duration-normal ease-out-cubic data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          ref={popupRef}
          aria-labelledby={EXPLORATION_TITLE_ID}
          className="fixed inset-x-0 top-12 bottom-0 z-210 overflow-y-auto overscroll-contain bg-page outline-hidden transition-[opacity,translate] duration-slow ease-out-quart data-ending-style:translate-y-6 data-ending-style:duration-normal data-ending-style:ease-in-cubic data-ending-style:opacity-0 data-starting-style:translate-y-6 data-starting-style:opacity-0 motion-reduce:transition-none md:top-27.75"
        >
          {/* The design's frame rules run the full height of the sheet. */}
          <div className="relative mx-auto min-h-full max-w-360 pt-8 md:before:pointer-events-none md:before:absolute md:before:inset-y-0 md:before:left-11.25 md:before:w-px md:before:bg-line-subtle md:after:pointer-events-none md:after:absolute md:after:inset-y-0 md:after:right-8 md:after:w-px md:after:bg-line-subtle">
            <Dialog.Close className="absolute top-1.5 right-4 z-10 -my-2 cursor-pointer py-2 font-mono text-sm leading-5 font-medium text-fg-muted transition-colors duration-short ease-out-cubic hover:text-fg md:hidden">
              / Close
            </Dialog.Close>
            {children}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
