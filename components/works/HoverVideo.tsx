"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Background clip that plays only while a mouse is over the card (the
 * element's parent). It fades in over the still image on hover and fades out
 * and pauses on leave. Touch devices and reduced-motion visitors keep the
 * still, since there's no hover to trigger it.
 */
export default function HoverVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    const card = video?.parentElement?.parentElement;
    if (!video || !card) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const enter = () => {
      if (!canHover.matches || reduce.matches) return;
      video.play().then(() => setPlaying(true)).catch(() => {});
    };
    const leave = () => {
      setPlaying(false);
      video.pause();
    };

    // Start buffering once the card is close to the viewport, so the first
    // hover doesn't wait on the download.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && canHover.matches) {
          video.preload = "auto";
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(card);

    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      observer.disconnect();
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={cn(
        "absolute inset-0 h-full w-full object-cover transition-opacity duration-slow ease-out-quart",
        playing ? "opacity-100" : "opacity-0",
      )}
    />
  );
}
