"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const EVENT = "themechange";
const THEMES: Theme[] = ["light", "dark"];

// <html data-theme> is the source of truth: the inline script in layout.tsx
// sets it before first paint, so there is no flash and no hydration mismatch.
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

const getTheme = () =>
  (document.documentElement.dataset.theme as Theme | undefined) ?? null;

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cross-fade colours for one frame of the switch only, so ordinary hovers
  // keep their own timing.
  if (animate) root.classList.add("theme-transitioning");
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Storage blocked (private mode); the choice still applies for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
  if (animate) {
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 260);
  }
}

/** "LIGHT / DARK" text switch, after the reference site's header control. */
export default function ThemeSwitch({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className={cn(
        "flex items-center gap-2 font-sans text-xs leading-normal whitespace-nowrap",
        className,
      )}
    >
      {THEMES.map((choice, index) => (
        <span key={choice} className="contents">
          {index > 0 && (
            <span aria-hidden className="text-fg">
              /
            </span>
          )}
          <button
            type="button"
            aria-pressed={theme === choice}
            onClick={() => applyTheme(choice)}
            // -my-2 + py-2 grows the tap target to 36px without moving the text.
            className="-my-2 cursor-pointer py-2 text-fg-muted uppercase transition-[opacity,color] duration-short ease-out-cubic hover:opacity-65 aria-pressed:text-fg"
          >
            {choice}
          </button>
        </span>
      ))}
    </div>
  );
}
