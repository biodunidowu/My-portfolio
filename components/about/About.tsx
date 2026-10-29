import type { CSSProperties } from "react";
import Image from "next/image";
import { AboutContent } from "@/lib/constants/about";
import AboutBand from "./AboutBand";
import MovieQuote from "./MovieQuote";

// Desktop columns from the 1440 frame, as fractions so they scale between
// 1280 and 1440: margin | portrait | gap | prose | prose | projects | margin.
const columns =
  "xl:grid-cols-[34fr_543fr_134fr_228fr_243fr_191fr_67fr] xl:grid-rows-[51px_65px_25px_auto_34px]";

// Vertical grid lines at x = 34, 577, 711, 939, 1182 and 1373 (of 1440).
const lines = [34, 577, 711, 939, 1182, 1373];

const prose =
  "space-y-6 font-mono text-sm leading-6 tracking-[-0.14px] text-fg-3";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section
      className={`relative grid grid-cols-1 gap-8 px-4 pt-6 pb-12 md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:px-8 md:pt-8 md:pb-16 xl:gap-0 xl:p-0 ${columns}`}
    >
      {lines.map((x, i) => (
        <span
          key={x}
          aria-hidden
          style={{ left: `${(x / 1440) * 100}%`, "--delay": `${i * 90}ms` } as CSSProperties}
          className="line-grow pointer-events-none absolute inset-y-0 hidden w-px bg-line xl:block"
        />
      ))}

      {/* Band: "About me" card on the left, hatch across the right columns. */}
      <div className="relative md:col-span-2 xl:col-span-7 xl:row-start-2 xl:grid xl:grid-cols-subgrid xl:border-y xl:border-line-subtle">
        <h1 className="flex h-16.25 items-center rounded-xl border-b border-line bg-surface px-3 font-mono text-2xl leading-5 text-fg uppercase xl:col-start-2 xl:ml-0.5">
          About me
        </h1>
        <AboutBand className="pointer-events-none hidden h-full w-full xl:col-span-3 xl:col-start-4 xl:block" />
      </div>

      <div className="relative bg-surface px-5 py-6 md:row-span-3 xl:col-start-2 xl:row-span-1 xl:row-start-4 xl:aspect-543/774">
        <div className="skeleton relative aspect-503/726 w-full overflow-hidden xl:aspect-auto xl:h-full">
          <Image
            src={content.photoSrc}
            alt={content.photoAlt}
            fill
            sizes="(min-width: 1280px) 503px, (min-width: 768px) 45vw, 100vw"
            className="object-cover"
            preload
          />
        </div>
      </div>

      <div className={`${prose} xl:col-start-4 xl:row-start-4 xl:pr-3 xl:pl-3.75`}>
        {content.columns[0].map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className={`${prose} xl:col-start-5 xl:row-start-4 xl:pr-3.5 xl:pl-5.75`}>
        {content.columns[1].map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="flex flex-col gap-8 md:col-start-2 xl:col-start-6 xl:row-start-4 xl:gap-0">
        <div className="flex flex-col gap-4.25 xl:pl-1.75">
          <p className={prose}>{content.tinkerIntro}</p>
          <ul className="flex flex-col gap-3 xl:-ml-1.5">
            {content.projects.map((project) => (
              <li key={project.href}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  title={project.name}
                  className="flex w-full items-center justify-center bg-chip px-3 py-2 font-mono text-xs leading-5 font-medium tracking-[-0.24px] text-fg underline btn-motion hover:bg-chip-hover"
                >
                  Check me out
                  <span className="sr-only">: {project.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="xl:mt-auto xl:pl-px">
          <MovieQuote quotes={content.quotes} />
        </div>
      </div>

      <span aria-hidden className="hidden border-t border-line xl:col-span-7 xl:row-start-5 xl:block" />
    </section>
  );
}
