"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Tabs } from "@/components/ui/tabs";
import { EXPLORATIONS_TAB } from "./ExplorationDetail";

const DEFAULT_TAB = "case-studies";

/**
 * Works tabs that remember the open tab in the URL hash, so `/works#explorations`
 * (the standalone exploration page's way back) opens on Personal Explorations
 * and a refresh keeps the tab.
 */
export default function WorksTabs({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [tab, setTab] = useState<string>(DEFAULT_TAB);

  useEffect(() => {
    // The hash only exists in the browser, so it's read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.location.hash === `#${EXPLORATIONS_TAB}`) setTab(EXPLORATIONS_TAB);
  }, []);

  function handleChange(next: string) {
    setTab(next);
    const hash = next === DEFAULT_TAB ? "" : `#${next}`;
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }

  return (
    <Tabs value={tab} onValueChange={handleChange} className={className}>
      {children}
    </Tabs>
  );
}
