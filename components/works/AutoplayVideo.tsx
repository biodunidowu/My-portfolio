"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Silent looping clip that starts on its own. Browsers only allow autoplay
 * when muted; `playsInline` keeps iOS from opening it full screen. It only
 * plays while on screen, so it isn't decoding frames while the visitor
 * scrolls elsewhere, and visitors who ask for reduced motion get it paused.
 * Without a `label` it's treated as decoration and hidden from screen readers.
 */
export default function AutoplayVideo({
  src,
  label,
  poster,
  className,
}: {
  src: string;
  label?: string;
  /** Still frame shown before playback and while paused. */
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !query.matches) video.play().catch(() => {});
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    query.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      muted
      loop
      playsInline
      preload="metadata"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
