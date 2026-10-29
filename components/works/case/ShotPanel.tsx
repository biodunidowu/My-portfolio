import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Shot, Visual } from "@/lib/constants/cwitoCaseStudy";

const px = (n: number) => `${n}px`;

function Screen({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={`(min-width: 1024px) ${shot.width}px, 70vw`}
      preload={priority}
      fetchPriority={priority ? "high" : undefined}
      className="block h-auto w-full"
      style={{ borderRadius: px(shot.radius ?? 0) }}
    />
  );
}

/**
 * A grey panel of phone screens (see `Visual`). Desktop follows the design's
 * px sizes. On phones a `row` scrolls sideways with snapping, so each screen
 * stays readable instead of shrinking to a thumbnail, and a `crop` scales down
 * to fit.
 */
export default function ShotPanel({
  visual,
  priority = false,
  className,
  panelClassName,
}: {
  visual: Visual;
  priority?: boolean;
  className?: string;
  /** Extra classes for the grey panel itself (the hero rounds it more). */
  panelClassName?: string;
}) {
  const panel = cn(
    "relative overflow-hidden rounded-xl border-[0.5px] bg-line-subtle",
    visual.dashed ? "border-dashed border-fg-muted/40" : "border-line",
    panelClassName,
  );

  const body =
    visual.layout === "row" ? (
      <div
        className={cn(panel, "lg:flex lg:items-center lg:justify-center", visual.height && "lg:h-(--panel-h)")}
        style={{ "--panel-h": visual.height && px(visual.height) } as CSSProperties}
      >
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 py-6 [scrollbar-width:none] lg:snap-none lg:gap-(--gap) lg:overflow-visible lg:px-8 lg:py-8 [&::-webkit-scrollbar]:hidden"
          style={{ "--gap": px(visual.gap) } as CSSProperties}
          aria-label={`${visual.shots.length} screens`}
        >
          {visual.shots.map((shot, i) => (
            <li
              key={shot.src}
              className="w-[min(68vw,280px)] shrink-0 snap-center lg:w-(--w)"
              style={{ "--w": px(shot.width) } as CSSProperties}
            >
              <Screen shot={shot} priority={priority && i < 2} />
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div
        className={cn(panel, "flex items-start justify-center gap-[6%] px-4 lg:gap-(--gap) lg:px-8")}
        style={{ "--gap": px(visual.gap) } as CSSProperties}
      >
        {visual.shots.map((shot) => (
          <figure
            key={shot.src}
            className="flex w-full max-w-(--w) flex-col items-center"
            style={{ "--w": px(shot.width) } as CSSProperties}
          >
            {shot.label ? (
              <figcaption className="pt-5 pb-4 font-mono text-xs leading-none font-medium text-cs-tag lg:pt-(--top) lg:pb-6">
                {shot.label}
              </figcaption>
            ) : (
              <span aria-hidden className="block h-6 lg:h-(--top)" />
            )}
            {/* Only the top of the screen shows; it runs off the panel's bottom edge. */}
            <div
              className="w-full overflow-hidden"
              style={{ aspectRatio: `${shot.width} / ${visual.visible ?? shot.height}` }}
            >
              <Screen shot={shot} priority={priority} />
            </div>
          </figure>
        ))}
      </div>
    );

  return (
    <figure className={cn("flex flex-col items-center gap-3", className)} style={{ "--top": px(visual.top ?? 0) } as CSSProperties}>
      <div className="w-full">{body}</div>
      {visual.caption && (
        <figcaption className="max-w-180 px-4 text-center font-mono text-[13px] leading-normal text-fg-muted">
          {visual.caption}
        </figcaption>
      )}
    </figure>
  );
}
