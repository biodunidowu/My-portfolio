import type { CSSProperties } from "react";

/**
 * Props for the page-load entrance (`[data-enter]` in globals.css).
 * `position` is the element's place in the stagger: 60ms per step.
 */
export function stagger(position: number) {
  return {
    "data-enter": "",
    style: { "--i": position } as CSSProperties,
  };
}

/**
 * Props for the scroll-triggered blur-in (`[data-blur]` in globals.css).
 * Plays when the nearest `Reveal` ancestor becomes visible; 70ms per step.
 */
export function blurIn(position: number) {
  return {
    "data-blur": "",
    style: { "--i": position } as CSSProperties,
  };
}
