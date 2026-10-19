"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { backNav } from "@/lib/transitions";
import { hasSiteHistory } from "@/lib/hooks/useSiteHistory";

/**
 * "/ Close" for page-like overlays (the CV). Goes back to where the visitor
 * came from on this site; arriving from elsewhere (a shared link), it goes to
 * `fallback` instead of leaving the site. Escape does the same.
 */
export default function CloseButton({
  fallback = "/",
  className,
}: {
  fallback?: string;
  className?: string;
}) {
  const router = useRouter();

  const close = useCallback(() => {
    if (hasSiteHistory()) router.back();
    else router.push(fallback, { transitionTypes: [...backNav] });
  }, [router, fallback]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // A dialog open on top (the game, the menu) gets Escape first.
      if (e.key !== "Escape" || e.defaultPrevented) return;
      if (document.querySelector('[role="dialog"]')) return;
      close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <button
      type="button"
      onClick={close}
      className={cn(
        "-my-2 cursor-pointer py-2 font-mono text-sm leading-5 font-medium text-fg-muted transition-colors duration-short ease-out-cubic hover:text-fg",
        className,
      )}
    >
      / Close
    </button>
  );
}
