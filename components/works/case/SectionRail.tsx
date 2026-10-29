"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

const RAIL_H = 602;
/** Where on screen a section counts as "being read" (fraction of the viewport). */
const READ_LINE = 0.3;
/** Minimum distance between two labels' centres. */
const LABEL_GAP = 28;

type RailSection = { id: string; label: string };

/**
 * Section navigator from the design: short ticks are the page, long ticks are
 * sections placed where they sit on it, and the marker follows the scroll.
 * Hover (or tab into) the rail to see the labels; a label jumps to its section.
 * Desktop only: on narrower screens the reading column needs the edge.
 */
export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const markerRef = useRef<HTMLDivElement>(null);
  // Before layout is measurable, spread the ticks evenly.
  const [stops, setStops] = useState(() =>
    sections.map((_, i) => (i + 0.5) / sections.length),
  );
  const [active, setActive] = useState(-1);

  // Sections close together on the page would stack their labels; nudge each
  // label down just enough to clear the one above (the ticks stay put).
  const labelShift: number[] = [];
  stops.forEach((stop, i) => {
    const y = stop * RAIL_H;
    const prev = i ? stops[i - 1] * RAIL_H + labelShift[i - 1] : -Infinity;
    labelShift.push(Math.max(0, prev + LABEL_GAP - y));
  });

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id));
    let raf = 0;
    let tops: number[] = [];
    let docH = 1;

    const measure = () => {
      docH = document.documentElement.scrollHeight;
      tops = els.map((el) => (el ? el.getBoundingClientRect().top + window.scrollY : 0));
      setStops(tops.map((t) => Math.min(t / docH, 1)));
    };

    const update = () => {
      raf = 0;
      const line = window.scrollY + window.innerHeight * READ_LINE;
      if (markerRef.current) {
        const y = Math.min(line / docH, 1) * RAIL_H;
        markerRef.current.style.transform = `translateY(${y}px)`;
      }
      let current = -1;
      tops.forEach((t, i) => {
        if (t <= line) current = i;
      });
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    update();
    // Images and fonts settle after load and move the sections.
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  const jump = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Sections"
      className="group/rail fixed top-1/2 left-1 z-30 hidden w-12 -translate-y-1/2 xl:block print:hidden"
      style={{ height: RAIL_H }}
    >
      {/* The page: a short tick every 20px. */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-5 w-3"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--line) 0 1px, transparent 1px 20px)",
        }}
      />

      {/* Where you are. */}
      <div
        ref={markerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 flex -translate-y-1/2 items-center gap-3 will-change-transform"
      >
        <span className="size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-fg" />
        <span className="h-0.5 w-6 bg-fg" />
      </div>

      <ol>
        {sections.map((s, i) => (
          <li
            key={s.id}
            className="absolute left-0 -translate-y-1/2"
            style={{ top: `${stops[i] * 100}%` }}
          >
            <a
              href={`#${s.id}`}
              onClick={(e) => jump(e, s.id)}
              aria-current={i === active ? "location" : undefined}
              className="group/tick flex h-5 items-center gap-3 pl-5 outline-none"
            >
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 transition-colors duration-short ease-out-cubic",
                  i === active ? "bg-fg" : "bg-fg-muted/50 group-hover/tick:bg-fg",
                )}
              />
              <span
                style={{ top: labelShift[i] }}
                className={cn(
                  "pointer-events-none relative -translate-x-1 rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs leading-4 whitespace-nowrap opacity-0 shadow-xs transition-[opacity,translate] duration-short ease-out-cubic",
                  "group-focus-within/rail:pointer-events-auto group-focus-within/rail:translate-x-0 group-focus-within/rail:opacity-100",
                  "group-focus-visible/tick:ring-2 group-focus-visible/tick:ring-fg",
                  "[@media(hover:hover)]:group-hover/rail:pointer-events-auto [@media(hover:hover)]:group-hover/rail:translate-x-0 [@media(hover:hover)]:group-hover/rail:opacity-100",
                  i === active ? "text-fg" : "text-fg-3 group-hover/tick:text-fg",
                )}
              >
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
