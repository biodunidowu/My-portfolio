"use client";

import { useRef, useState } from "react";

/**
 * Pause / play for the works marquee. Anything that moves on its own for more
 * than 5 seconds needs a visible way to stop it (WCAG 2.2.2). It sets
 * data-paused on the marquee, which globals.css uses to pause the track.
 * Hidden under reduced motion, where the marquee doesn't move at all.
 */
export default function MarqueeToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);

  function toggle() {
    const next = !paused;
    setPaused(next);
    const viewport = ref.current?.closest(".marquee-viewport");
    if (next) viewport?.setAttribute("data-paused", "");
    else viewport?.removeAttribute("data-paused");
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={paused ? "Play the work carousel" : "Pause the work carousel"}
      className="btn-motion absolute right-3 bottom-3 z-10 bg-surface px-2 py-1 font-mono text-[11px] leading-4 tracking-[-0.22px] text-fg-3 uppercase hover:text-fg motion-reduce:hidden md:right-4 md:bottom-4"
    >
      {paused ? "Play" : "Pause"}
    </button>
  );
}
