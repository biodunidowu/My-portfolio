"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pause / play for the works marquee. Anything that moves on its own for more
 * than 5 seconds needs a visible way to stop it (WCAG 2.2.2). It sets
 * data-paused on the marquee, which globals.css uses to pause the track. The
 * track also pauses while scrolled out of view, so it isn't animating a wide
 * strip of images nobody can see. Hidden under reduced motion, where the
 * marquee doesn't move at all.
 */
export default function MarqueeToggle() {
  const ref = useRef<HTMLButtonElement>(null);
  const [paused, setPaused] = useState(false);
  const [offScreen, setOffScreen] = useState(false);

  useEffect(() => {
    const viewport = ref.current?.closest(".marquee-viewport");
    if (!viewport) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOffScreen(!entry.isIntersecting),
    );
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = ref.current?.closest(".marquee-viewport");
    if (paused || offScreen) viewport?.setAttribute("data-paused", "");
    else viewport?.removeAttribute("data-paused");
  }, [paused, offScreen]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-pressed={paused}
      aria-label={paused ? "Play the work carousel" : "Pause the work carousel"}
      className="btn-motion absolute right-3 bottom-3 z-10 bg-surface px-2 py-1 font-mono text-[11px] leading-4 tracking-[-0.11px] text-fg-3 uppercase hover:text-fg motion-reduce:hidden md:right-4 md:bottom-4"
    >
      {paused ? "Play" : "Pause"}
    </button>
  );
}
