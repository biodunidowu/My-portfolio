import type { CSSProperties } from "react";

/**
 * Props for the page-load entrance (`[data-enter]` in globals.css).
 * `position` is the element's place in the stagger (--motion-stagger per step,
 * capped at --stagger-cap so long runs don't drag).
 */
export function stagger(position: number) {
  return {
    "data-enter": "",
    style: { "--i": position } as CSSProperties,
  };
}

/**
 * Props for the scroll-triggered blur-in (`[data-blur]` in globals.css).
 * Plays when the nearest `Reveal` ancestor becomes visible; same stagger as above.
 */
export function blurIn(position: number) {
  return {
    "data-blur": "",
    style: { "--i": position } as CSSProperties,
  };
}
