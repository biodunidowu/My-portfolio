import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import RichText from "@/lib/richText";
import { cn } from "@/lib/utils";
import { forwardNav } from "@/lib/transitions";
import { hasCaseStudy, type CaseCard } from "@/lib/constants/caseCards";

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
      />
    </div>
  );
}

export default function CaseStudyCard({ card }: { card: CaseCard }) {
  const published = hasCaseStudy(card.slug);
  const isPreview = card.shots.length === 1;

  const vars = {
    "--card-h": px(card.height),
    "--panel-w": px(card.panelWidth ?? 263),
    ...(card.panelHeight && { "--panel-h": px(card.panelHeight) }),
  } as CSSProperties;

  return (
    <article
      style={vars}
      aria-label={card.name}
      className={cn(
        "relative mx-auto flex w-full max-w-300 flex-col items-center gap-6 overflow-hidden px-4 py-6 md:px-8 md:py-8 xl:h-(--card-h) xl:flex-row xl:justify-center xl:gap-10 xl:px-7 xl:py-0",
        card.shadow &&
          "shadow-[0_1px_3px_0_rgba(47,43,67,0.1),inset_0_-1px_0_0_rgba(47,43,67,0.1)]",
      )}
    >
      <ViewTransition name={`work-${card.slug}`} share="morph" default="none">
        <div aria-hidden className="absolute inset-0 bg-white">
          <Image
            src={card.backgroundSrc}
            alt=""
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </ViewTransition>

      <div
        className={cn(
          "relative flex max-w-full xl:shrink-0",
          isPreview
            ? "w-full justify-center xl:w-auto"
            : "gap-3 overflow-x-auto md:gap-6 xl:gap-10 xl:overflow-visible",
        )}
      >
        {card.shots.map((shot) => (
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
              isPreview
                ? "w-full max-w-(--w) xl:w-(--w)"
                : "h-90 md:h-105 xl:h-(--h)",
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

      <div
        className={cn(
          "relative flex w-full flex-col gap-3 border-b border-[#EAECF0] bg-white px-3 py-4 md:max-w-80 xl:w-(--panel-w) xl:max-w-none xl:shrink-0",
          card.panelHeight && "xl:h-(--panel-h) xl:justify-between",
        )}
      >
        {card.brand && <Brand brand={card.brand} name={card.name} />}

        <div className="flex flex-col gap-2">
          <h2 className="text-base leading-5 font-medium text-[#101828]">
            Overview
          </h2>
          <p className="text-xs leading-5 text-[#667085]">
            <RichText text={card.overview} />
          </p>
        </div>

        {published ? (
          <Link
            href={`/works/${card.slug}`}
            transitionTypes={[...forwardNav]}
            className="self-start border border-[#F3F4F6] bg-[#F3F4F6] px-3 py-2 text-xs leading-7 font-medium text-black transition-[background-color,scale] duration-160 ease-out hover:bg-[#EAECF0] active:scale-97"
          >
            Read Case-study
            <span className="sr-only">: {card.name}</span>
          </Link>
        ) : (
          <span className="self-start border border-[#F3F4F6] bg-[#F3F4F6] px-3 py-2 text-xs leading-7 font-medium text-[#667085]">
            Case study coming soon
          </span>
        )}
      </div>
    </article>
  );
}
