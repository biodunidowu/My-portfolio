"use client";

export default function BackToTop({ className }: { className?: string }) {
  function handleClick() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group inline-flex cursor-pointer items-center gap-1.5 uppercase transition-colors duration-short ease-out-cubic hover:text-fg ${className ?? ""}`}
    >
      Back to top
      <span
        aria-hidden
        className="arrow-nudge-up"
      >
        ↑
      </span>
    </button>
  );
}
