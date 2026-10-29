import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import RichText from "@/lib/richText";
import HoverVideo from "./HoverVideo";
import { cn } from "@/lib/utils";
import { forwardNav } from "@/lib/transitions";
import type { CaseCard } from "@/lib/constants/caseCards";

const px = (value: number) => `${value}px`;

function Brand({ brand, name }: { brand: NonNullable<CaseCard["brand"]>; name: string }) {
  const placed = brand.mark.left !== undefined;

  return (
    <div className="flex items-center" style={{ gap: px(brand.gap) }}>
      <span
        className="relative size-10.5 shrink-0 overflow-hidden rounded-xl"
        style={{ backgroundColor: brand.tileColor }}
      >
        <Image
          src={brand.mark.src}
          alt=""
          width={brand.mark.width}
          height={brand.mark.height}
          className={cn(
            "absolute max-w-none",
            !placed && "top-1/2 left-1/2 -translate-1/2",
          )}
          style={{
            width: px(brand.mark.width),
            height: px(brand.mark.height),
            ...(placed && { left: px(brand.mark.left!), top: px(brand.mark.top!) }),
          }}
        />
      </span>
      <Image
        src={brand.wordmark.src}
        alt={name}
        width={brand.wordmark.width}
        height={brand.wordmark.height}
        style={{ width: px(brand.wordmark.width), height: px(brand.wordmark.height) }}
        className={cn(brand.invertOnDark && "dark:invert dark:hue-rotate-180")}
      />
    </div>
  );
}

export default function CaseStudyCard({ card }: { card: CaseCard }) {
  const href = card.caseStudyHref;
  const external = href !== undefined && !href.startsWith("/");
  const isPreview = card.shots.length === 1;
  const featured = card.featured ?? 0;

  const vars = {
    "--card-h": px(card.height),
    "--panel-w": px(card.panelWidth ?? 263),
    "--panel-h": px(card.panelHeight),
    "--panel-r": px(card.panelRadius ?? 12),
    "--panel-gap": px(card.panelGap ?? 12),
  } as CSSProperties;

  return (
    <article
      style={vars}
      aria-label={card.name}
      className={cn(
        "relative mx-auto flex w-full max-w-344 flex-col items-center gap-6 overflow-hidden px-4 py-6 md:flex-row md:justify-center md:gap-8 md:px-8 md:py-10 xl:h-(--card-h) xl:gap-10 xl:px-10.5 xl:py-0",
        card.shadow &&
          "shadow-[0_1px_3px_0_rgba(47,43,67,0.1),inset_0_-1px_0_0_rgba(47,43,67,0.1)]",
      )}
    >
      <ViewTransition name={`work-${card.slug}`} share="morph" default="none">
        <div aria-hidden className="skeleton absolute inset-0">
          <Image
            src={card.backgroundSrc}
            alt=""
            fill
            sizes="(min-width: 1376px) 1376px, 100vw"
            className="object-cover"
          />
          {card.backgroundVideoSrc && (
            <HoverVideo src={card.backgroundVideoSrc} />
          )}
        </div>
      </ViewTransition>

      {/* Phones and tablets show one screen (the featured one); desktop shows all. */}
      <div
        className={cn(
          "relative flex max-w-full justify-center xl:shrink-0",
          isPreview ? "w-full md:w-auto md:flex-1 xl:flex-none" : "xl:gap-10",
        )}
      >
        {card.shots.map((shot, i) => (
          <div
            key={shot.src}
            style={
              {
                aspectRatio: `${shot.width} / ${shot.height}`,
                borderRadius: px(shot.radius),
                "--w": px(shot.width),
                "--h": px(shot.height),
              } as CSSProperties
            }
            className={cn(
              "relative shrink-0 overflow-hidden",
              i !== featured && "hidden xl:block",
              isPreview
                ? "w-full max-w-(--w) xl:w-(--w)"
                : "h-105 md:h-112 xl:h-(--h)",
            )}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={isPreview ? "(min-width: 768px) 663px, 100vw" : "246px"}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative flex w-full flex-col justify-between gap-6 overflow-hidden rounded-(--panel-r) border-b border-line bg-surface px-3 py-4 md:w-(--panel-w) md:shrink-0 xl:h-(--panel-h)">
        <div className="flex flex-col gap-(--panel-gap)">
          {card.brand && <Brand brand={card.brand} name={card.name} />}

          <div className="flex flex-col gap-2 font-mono">
            <h2 className="text-base leading-5 font-medium text-fg uppercase">
              <span className="sr-only">{card.name}: </span>
              Overview
            </h2>
            <p className="text-xs leading-5 tracking-[-0.12px] text-fg-3 [&_strong]:font-bold">
              <RichText text={card.overview} />
            </p>
          </div>
        </div>

        {href ? (
          <Link
            href={href}
            {...(external
              ? { target: "_blank", rel: "noreferrer" }
              : { transitionTypes: [...forwardNav] })}
            className="self-start border border-chip bg-chip px-3 py-2 font-mono text-xs leading-7 font-medium tracking-[-0.12px] text-fg uppercase btn-motion hover:bg-chip-hover"
          >
            Read Case-study
            <span className="sr-only">: {card.name}</span>
          </Link>
        ) : (
          <span className="self-start border border-chip bg-chip px-3 py-2 font-mono text-xs leading-7 font-medium tracking-[-0.12px] text-fg-3 uppercase">
            Case-study coming soon
          </span>
        )}
      </div>
    </article>
  );
}
