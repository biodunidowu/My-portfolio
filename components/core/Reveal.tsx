"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

type RevealProps = ComponentProps<"div"> & {
  as?: "div" | "section";
  /** Shrinks the viewport's bottom edge so the reveal waits until the element is properly on screen. */
  rootMargin?: string;
};

/**
 * Sets `data-visible` the first time the element scrolls into view, so CSS
 * keyed off it (`.reveal`, `[data-blur]`) plays once and never replays on
 * scroll-back.
 */
export default function Reveal({
  as: Tag = "div",
  rootMargin = "0px 0px -100px 0px",
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <Tag ref={ref} data-visible={visible || undefined} {...props} />;
}
