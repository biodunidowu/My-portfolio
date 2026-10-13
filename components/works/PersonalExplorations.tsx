import { explorations } from "@/lib/constants/explorations";
import ExplorationVisual from "./ExplorationVisual";

/** Framed shots in the design's two-column grid. Tiles are display-only. */
export default function PersonalExplorations() {
  return (
    <ul className="mx-auto grid max-w-344 gap-x-5 gap-y-5 md:grid-cols-2 md:gap-y-8.25">
      {explorations.map((exploration, i) => (
        <li key={exploration.id}>
          <ExplorationVisual
            exploration={exploration}
            sizes="(min-width: 768px) 678px, 100vw"
            preload={i < 2}
          />
        </li>
      ))}
    </ul>
  );
}
