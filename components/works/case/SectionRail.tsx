"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/** Rail height, tick spacing, and how far ticks reach when magnified. */
const RAIL_H = 602;
const STEP = 14;
const TICKS = Math.floor(RAIL_H / STEP) + 1;
const SHORT = 12;
const LONG = 24;
const REACH = 32;
/** Width of the bell under the pointer (px): ~3 ticks either side swell. */
const SIGMA = 26;
/** Section ticks sit at least this many ticks apart so labels never collide. */
const MIN_GAP = 2;
/** Where on screen a section counts as "being read" (fraction of the viewport). */
const READ_LINE = 0.3;

type RailSection = { id: string; label: string };

/** Snap each section to a tick, keeping them MIN_GAP apart and in order. */
function toTicks(stops: number[]) {
  const out: number[] = [];
  stops.forEach((stop) => {
    let t = Math.round((stop * RAIL_H) / STEP);
    if (out.length) t = Math.max(t, out[out.length - 1] + MIN_GAP);
    out.push(Math.min(t, TICKS - 1));
  });
  return out;
}

/**
 * Section navigator: short ticks are the page, long ticks are sections placed
 * where they sit on it, and the marker follows the scroll. Moving along the
 * rail magnifies the ticks under the pointer like a dock, and section names
 * fade in by how close they are; a name jumps to its section. Keyboard focus
 * drives the same swell. Desktop only: narrower screens need the edge.
 */
export default function SectionRail({ sections }: { sections: RailSection[] }) {
  const navRef = useRef<HTMLElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Before layout is measurable, spread the sections evenly.
  const [stops, setStops] = useState(() =>
    sections.map((_, i) => (i + 0.5) / sections.length),
  );
  const [active, setActive] = useState(-1);
  const sectionTicks = toTicks(stops);
  const sectionAt = new Map(sectionTicks.map((t, i) => [t, i]));

  // Scroll position: the marker and the current section.
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

  // The swell. Written straight to transforms each frame (no React renders):
  // the pointer position and the swell's strength both ease toward their
  // targets, so it glides in, follows smoothly, and settles back on leave.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let focusY = 0;
    let targetY = 0;
    let amp = 0;
    let targetAmp = 0;

    const paint = () => {
      const snap = reduce.matches;
      focusY = snap ? targetY : focusY + (targetY - focusY) * 0.25;
      amp = snap ? targetAmp : amp + (targetAmp - amp) * 0.18;

      for (let i = 0; i < TICKS; i++) {
        const d = i * STEP - focusY;
        const g = amp * Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
        const tick = tickRefs.current[i];
        const s = sectionAt.get(i);
        const base = s === undefined ? SHORT : LONG;
        // Reduced motion: no stretching, the names still appear.
        const grow = snap ? 0 : REACH * g;
        if (tick) tick.style.transform = `scaleX(${(base + grow) / base})`;
        if (s !== undefined) {
          const label = labelRefs.current[s];
          if (label) {
            const o = Math.min(1, g * 1.6);
            label.style.opacity = String(o);
            label.style.transform = `translateX(${grow}px)`;
            label.style.pointerEvents = o > 0.3 ? "auto" : "none";
          }
        }
      }

      const settled = Math.abs(targetAmp - amp) < 0.002 && Math.abs(targetY - focusY) < 0.3;
      raf = settled ? 0 : requestAnimationFrame(paint);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const y = e.clientY - nav.getBoundingClientRect().top;
      if (targetAmp === 0) focusY = y; // enter where the pointer is, don't sweep
      targetY = y;
      targetAmp = 1;
      kick();
    };
    const onLeave = () => {
      if (nav.contains(document.activeElement)) return;
      targetAmp = 0;
      kick();
    };
    // Tabbing through the names swells around the focused one.
    const onFocus = (e: FocusEvent) => {
      const s = Number((e.target as HTMLElement).dataset.section);
      if (Number.isNaN(s)) return;
      targetY = sectionTicks[s] * STEP;
      if (targetAmp === 0) focusY = targetY;
      targetAmp = 1;
      kick();
    };
    const onBlur = (e: FocusEvent) => {
      if (nav.contains(e.relatedTarget as Node)) return;
      if (!nav.matches(":hover")) {
        targetAmp = 0;
        kick();
      }
    };

    nav.addEventListener("pointermove", onMove);
    nav.addEventListener("pointerleave", onLeave);
    nav.addEventListener("focusin", onFocus);
    nav.addEventListener("focusout", onBlur);
    kick(); // re-place labels when the sections move
    return () => {
      nav.removeEventListener("pointermove", onMove);
      nav.removeEventListener("pointerleave", onLeave);
      nav.removeEventListener("focusin", onFocus);
      nav.removeEventListener("focusout", onBlur);
      cancelAnimationFrame(raf);
    };
    // sectionTicks/sectionAt are derived from stops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops]);

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
      ref={navRef}
      aria-label="Sections"
      // Wide enough to keep the hover while the ticks reach out.
      className="fixed top-1/2 left-1 z-30 hidden w-20 -translate-y-1/2 xl:block print:hidden"
      style={{ height: RAIL_H }}
    >
      {Array.from({ length: TICKS }, (_, i) => {
        const s = sectionAt.get(i);
        return (
          <span
            key={i}
            ref={(el) => {
              tickRefs.current[i] = el;
            }}
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-5 h-px origin-left will-change-transform",
              s === undefined
                ? "w-3 bg-fg-muted/35"
                : s === active
                  ? "w-6 bg-fg"
                  : "w-6 bg-fg-muted/70",
            )}
            style={{ top: i * STEP }}
          />
        );
      })}

      {/* Where you are. */}
      <div
        ref={markerRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 flex -translate-y-1/2 items-center will-change-transform"
      >
        <span className="size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-fg" />
      </div>

      <ol>
        {sections.map((s, i) => (
          <li
            key={s.id}
            className="absolute -translate-y-1/2"
            style={{ top: sectionTicks[i] * STEP, left: 20 + LONG + 10 }}
          >
            <a
              href={`#${s.id}`}
              data-section={i}
              onClick={(e) => jump(e, s.id)}
              aria-current={i === active ? "location" : undefined}
              className="block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-fg"
            >
              <span
                ref={(el) => {
                  labelRefs.current[i] = el;
                }}
                className={cn(
                  "pointer-events-none block rounded-sm bg-page px-1.5 py-0.5 font-mono text-xs leading-4 whitespace-nowrap text-fg opacity-0 will-change-[opacity,transform]",
                  i === active && "font-medium",
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
