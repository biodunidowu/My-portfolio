"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import GameLauncher from "@/components/game/GameLauncher";

/**
 * Gamepad + "Open to work" pill. Inline in the desktop header, a split row in
 * the mobile menu. Clicking the pill lights the dot up for a moment.
 */
export default function WorkStatus({
  variant = "header",
  className,
}: {
  variant?: "header" | "menu";
  className?: string;
}) {
  const menu = variant === "menu";
  const [lit, setLit] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function lightUp() {
    setLit(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLit(false), 1600);
  }

  return (
    <div className={cn("items-center", menu ? "flex" : "gap-3", className)}>
      <GameLauncher
        className={cn(
          "flex items-center justify-center",
          menu && "flex-1 self-stretch bg-chip p-2",
        )}
      />

      <button
        type="button"
        onClick={lightUp}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 bg-page p-2 font-mono leading-7 text-fg uppercase transition-[scale] duration-160 ease-out active:scale-97",
          menu ? "w-42.25 text-base" : "text-sm",
        )}
      >
        <span aria-hidden className="relative flex size-2">
          {/* Halo that blooms out on click while the dot itself brightens. */}
          <span
            key={lit ? "on" : "off"}
            className={cn(
              "absolute inset-0 rounded-full bg-[#22C55E] opacity-0",
              lit && "animate-status-halo",
            )}
          />
          <span
            className={cn(
              "relative size-2 rounded-full bg-[#22C55E] transition-[box-shadow,background-color] duration-300 ease-out",
              lit &&
                "bg-[#4ADE80] shadow-[0_0_6px_2px_rgba(74,222,128,0.85),0_0_14px_4px_rgba(34,197,94,0.45)]",
            )}
          />
        </span>
        Open to work
      </button>
    </div>
  );
}
