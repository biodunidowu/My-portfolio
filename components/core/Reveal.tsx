"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

type RevealProps = ComponentProps<"div"> & {
  as?: "div" | "section";
  /** Shrinks the viewport's bottom edge so the reveal waits until the element is properly on screen. */
  rootMargin?: string;
};

/**
 * Sets `data-visible` the first time the element scrolls into view, so CSS
 * keyed off it (`[data-blur]`, `[data-fade]`) plays once and never replays on
 * scroll-back. The content renders visible; it is only hidden for the reveal
 * (`data-reveal`) once this has run, so it never stays blank when the script
 * is slow to load or doesn't run at all.
 */
export default function Reveal({
  as: Tag = "div",
  rootMargin = "0px 0px -100px 0px",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // Already on screen when the script arrives: play the entrance if the page
    // has only just loaded, but on a slow connection leave it shown rather
    // than hiding text the visitor may already be reading.
    const { top, bottom } = node.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) {
      if (performance.now() < 1500) {
        // Layout is only measurable after mount, so this can't be initial state.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setArmed(true);
        setVisible(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArmed(true);
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <Tag
      ref={ref}
      data-reveal={armed || undefined}
      data-visible={visible || undefined}
      {...props}
    />
  );
}
