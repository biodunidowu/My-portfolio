import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { stagger } from "@/lib/stagger";
import { works, type Work } from "@/lib/constants/works";
import MarqueeToggle from "./MarqueeToggle";

function WorkCard({
  work,
  index,
  decorative,
}: {
  work: Work;
  index: number;
  decorative: boolean;
}) {
  // Mobile and desktop carousels use different card orders in the design;
  // CSS order swaps them per breakpoint, offset so the copy stays second.
  const offset = decorative ? works.length : 0;
  const order = {
    "--order": offset + (work.mobileOrder ?? index + 1),
    "--md-order": offset + index + 1,
  } as CSSProperties;

  const shotSize = {
    "--w": `${work.mobile.width}px`,
    "--h": `${work.mobile.height}px`,
    "--md-w": `${work.desktop.width}px`,
    "--md-h": `${work.desktop.height}px`,
  } as CSSProperties;

  return (
    // Spacing is a right margin rather than a flex gap so both copies of the
    // list are exactly the same width and the -50% loop has no seam.
    <div
      aria-hidden={decorative || undefined}
      style={order}
      className="relative order-(--order) mr-3 h-66 w-86 shrink-0 overflow-hidden bg-surface contain-layout contain-paint md:order-(--md-order) md:mr-4 md:h-114.25 md:w-116"
    >
      <Image
        src={work.backgroundSrc}
        alt=""
        fill
        sizes="(min-width: 768px) 464px, 344px"
        className="object-cover"
      />

      <div
        style={shotSize}
        className={cn(
          "absolute top-1/2 left-1/2 h-(--h) w-(--w) -translate-1/2 md:h-(--md-h) md:w-(--md-w)",
          work.frame === "shadow" &&
            "shadow-[0_4px_8px_0_rgba(47,43,67,0.1),inset_0_-1px_0_0_rgba(47,43,67,0.1)]",
          // Animated shots repaint every frame; their own layer keeps that
          // from redrawing the whole moving strip.
          work.animated && "will-change-transform",
        )}
      >
        <Image
          src={work.src}
          alt={decorative ? "" : work.title}
          fill
          sizes="(min-width: 768px) 445px, 320px"
          loading={decorative ? "lazy" : "eager"}
          unoptimized={work.animated}
          className={cn(
            "object-cover",
            work.frame === "rounded" && "rounded-xl",
          )}
        />
      </div>
    </div>
  );
}

export default function WorksMarquee() {
  return (
    <section
      {...stagger(0)}
      id="works"
      aria-label="Selected work"
      className="marquee-viewport relative mt-10.5 mb-8 overflow-hidden md:mt-10.25 md:mb-10 xl:mb-0"
    >
      {/* The list is rendered twice back to back so the track can scroll
          exactly -50% and loop seamlessly; the copy is hidden from AT. */}
      <div className="marquee-track flex w-max">
        {works.map((work, index) => (
          <WorkCard
            key={work.id}
            work={work}
            index={index}
            decorative={false}
          />
        ))}
        {works.map((work, index) => (
          <WorkCard
            key={`copy-${work.id}`}
            work={work}
            index={index}
            decorative
          />
        ))}
      </div>
      <MarqueeToggle />
    </section>
  );
}
