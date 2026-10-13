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
      className={`group inline-flex cursor-pointer items-center gap-1.5 uppercase transition-colors duration-200 hover:text-fg ${className ?? ""}`}
    >
      Back to top
      <span
        aria-hidden
        className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}
