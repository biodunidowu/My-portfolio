"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KEY = "site-pages-visited";

/**
 * Counts the pages visited on this site in this tab. Mounted once (Header),
 * it lets a close button tell a visitor who browsed here (go back) from one
 * who landed from a shared link (go home rather than leave the site).
 */
export function useTrackSiteHistory() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      const n = Number(sessionStorage.getItem(KEY) ?? "0");
      sessionStorage.setItem(KEY, String(n + 1));
    } catch {
      // Storage blocked: close buttons fall back to going home.
    }
  }, [pathname]);
}

/** True when an earlier page of this site is behind the current one. */
export function hasSiteHistory() {
  try {
    return Number(sessionStorage.getItem(KEY) ?? "0") > 1;
  } catch {
    return false;
  }
}
