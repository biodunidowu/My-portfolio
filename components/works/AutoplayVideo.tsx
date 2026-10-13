"use client";

import { useEffect, useRef } from "react";

/**
 * Silent looping clip that starts on its own. Browsers only allow autoplay
 * when muted; `playsInline` keeps iOS from opening it full screen. Visitors
 * who ask for reduced motion get it paused instead.
 */
export default function AutoplayVideo({
  src,
  label,
}: {
  src: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full bg-[#0A0A0A] object-cover"
    />
  );
}
