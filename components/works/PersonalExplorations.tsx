import Link from "next/link";
import { explorations } from "@/lib/constants/explorations";
import ExplorationVisual from "./ExplorationVisual";
import { explorationHref } from "./ExplorationDetail";

/**
 * Framed shots in the design's two-column grid. Each opens its exploration
 * (as a panel over this page; see app/works/@modal).
 */
export default function PersonalExplorations() {
  return (
    <ul className="mx-auto grid max-w-344 gap-x-5 gap-y-5 md:grid-cols-2 md:gap-y-8.25">
      {explorations.map((exploration, i) => (
        <li key={exploration.id}>
          <Link
            href={explorationHref(exploration.id)}
            scroll={false}
            className="group relative block"
          >
            <ExplorationVisual
              exploration={exploration}
              sizes="(min-width: 768px) 678px, 100vw"
              // The tab stays mounted while hidden (app/works/page.tsx), so
              // the first two rows download quietly in the background while
              // visitors look at case studies; the rest load on scroll.
              preload={i < 4}
              fetchPriority={i < 4 ? "low" : undefined}
            />
            {/* Pointer-only hint (Tailwind's hover: is gated to fine pointers). */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-3 left-3 bg-surface px-3 py-2 font-mono text-xs leading-5 font-medium tracking-[-0.48px] text-fg underline opacity-0 transition-[opacity,translate] duration-short ease-out-cubic translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0"
            >
              View exploration
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
