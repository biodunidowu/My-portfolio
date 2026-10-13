"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";

// The game (canvas loop + synth) only loads once someone opens it.
const SpaceShooter = dynamic(() => import("./SpaceShooter"), { ssr: false });

/** Gamepad button that opens the space shooter over a blurred backdrop. */
export default function GameLauncher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Play Starfall, a space shooter"
        className={cn(
          "cursor-pointer transition-[scale,opacity] duration-160 ease-out hover:opacity-65 active:scale-90",
          className,
        )}
      >
        <Image
          src="/images/game-pad.svg"
          alt=""
          width={24}
          height={24}
          className="dark:invert"
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-300 bg-black/40 backdrop-blur-md transition-opacity duration-250 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-310 flex h-[min(680px,calc(100dvh-32px))] w-[min(960px,calc(100vw-32px))] -translate-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black text-white shadow-2xl outline-hidden transition-[opacity,scale] duration-250 ease-out data-ending-style:scale-96 data-ending-style:opacity-0 data-starting-style:scale-96 data-starting-style:opacity-0">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 font-mono text-xs tracking-[-0.48px] uppercase">
            <Dialog.Title className="text-white">Starfall</Dialog.Title>
            <Dialog.Description className="hidden text-white/50 md:block">
              Move: ← → / A D or drag · Pause: P · Sound: M
            </Dialog.Description>
            <Dialog.Close className="cursor-pointer text-white/60 transition-colors hover:text-white">
              Close
            </Dialog.Close>
          </div>
          <div className="relative min-h-0 flex-1">
            {open && <SpaceShooter />}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
