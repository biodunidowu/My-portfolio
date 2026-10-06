"use client";

import { useLayoutEffect, type RefObject } from "react";

/**
 * Measures the referenced element and keeps a `--header-height` CSS
 * variable on <html> in sync with it, so anything on the page can
 * position itself relative to the header without hardcoding a height.
 */
export function useHeaderHeightVar(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const setVar = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${node.offsetHeight}px`,
      );
    };

    setVar();

    const observer = new ResizeObserver(setVar);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);
}
