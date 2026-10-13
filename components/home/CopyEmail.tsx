"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconSwap =
  "absolute inset-0 transition-[opacity,scale,filter] duration-200 ease-out motion-reduce:scale-100 motion-reduce:blur-none";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied — fail silently, the mailto link still works.
    }
  }

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
        className="relative size-5 cursor-pointer transition-[scale] duration-160 ease-out active:scale-95"
      >
        {/* Both icons stay mounted so the swap is a crossfade, not a pop. */}
        <Image
          src="/images/copy.svg"
          alt=""
          width={20}
          height={20}
          className={cn(iconSwap, "dark:invert", copied && "scale-90 opacity-0 blur-[2px]")}
        />
        <Check
          className={cn(
            iconSwap,
            "size-5",
            !copied && "scale-90 opacity-0 blur-[2px]",
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
