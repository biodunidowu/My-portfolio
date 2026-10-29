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

type NavigationLike = {
  currentEntry: { index: number } | null;
  entries: () => { url: string | null }[];
};

/** True when an earlier page of this site is behind the current one. */
export function hasSiteHistory() {
  // Ask the tab's real history where the browser can tell us. The counter
  // alone is fooled by a case study opened in a new tab (the tab inherits the
  // counter but has nothing to go back to), or by a return from another site.
  const nav = (window as Window & { navigation?: NavigationLike }).navigation;
  if (nav?.currentEntry) {
    const prev = nav.entries()[nav.currentEntry.index - 1];
    return !!prev?.url && new URL(prev.url).origin === location.origin;
  }
  try {
    return Number(sessionStorage.getItem(KEY) ?? "0") > 1;
  } catch {
    return false;
  }
}
