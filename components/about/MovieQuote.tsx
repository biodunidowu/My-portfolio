"use client";

import { useState } from "react";

/**
 * Small Telma quote. Each hover (or tap / focus) swaps in the next movie
 * line: the old line blurs out as the new one blurs in. Reduced motion gets a
 * plain fade.
 */
export default function MovieQuote({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % quotes.length);

  return (
    <button
      type="button"
      onPointerEnter={(e) => e.pointerType === "mouse" && next()}
      onClick={next}
      aria-label="Show another movie quote"
      className="grid w-full cursor-default text-left font-quote text-xs leading-4 font-light text-fg-muted"
    >
      {quotes.map((quote, i) => (
        <span
          key={quote}
          aria-hidden={i !== index}
          className={
            "col-start-1 row-start-1 transition-[opacity,filter,translate] duration-300 ease-out motion-reduce:transition-opacity " +
            (i === index
              ? "translate-y-0 opacity-100 blur-0"
              : "pointer-events-none translate-y-1 opacity-0 blur-[3px] motion-reduce:translate-y-0 motion-reduce:blur-0")
          }
        >
          {quote}
        </span>
      ))}
    </button>
  );
}
