"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Icon Swap (Expressive): the incoming icon turns and pops in past full size,
// the outgoing one shrinks and turns away. "idle" is the first render, before
// any copy, so nothing animates on page load.
type Phase = "idle" | "copied" | "reset";

const icon = "absolute inset-0 size-5";

export default function CopyEmail({ email }: { email: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setPhase("copied");
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setPhase("reset"), 1800);
    } catch {
      // Clipboard permission denied — fail silently, the mailto link still works.
    }
  }

  const copied = phase === "copied";

  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-2">
      <a
        href={`mailto:${email}`}
        className="font-mono text-xs leading-5 font-medium tracking-[-0.48px] text-fg underline md:tracking-normal"
      >
        {email}
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="relative size-5 cursor-pointer btn-motion"
      >
        <Image
          src="/images/copy.svg"
          alt=""
          width={20}
          height={20}
          className={cn(
            icon,
            "dark:invert",
            copied && "anim-icon-out duration-short ease-in-cubic",
            phase === "reset" && "anim-icon-in duration-normal ease-out-quart",
          )}
        />
        <Check
          className={cn(
            icon,
            copied
              ? "anim-icon-in duration-normal ease-out-quart"
              : phase === "reset"
                ? "anim-icon-out duration-short ease-in-cubic"
                : "opacity-0",
          )}
          strokeWidth={1.75}
        />
      </button>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
