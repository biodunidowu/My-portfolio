import Link from "next/link";
import CloseButton from "@/components/core/CloseButton";
import Reveal from "@/components/core/Reveal";
import { blurIn, stagger } from "@/lib/stagger";
import { forwardNav } from "@/lib/transitions";
import { cn } from "@/lib/utils";
import {
  cwitoCaseStudy as cs,
  type Block,
  type Card,
  type Section,
} from "@/lib/constants/cwitoCaseStudy";
import SectionRail from "./SectionRail";
import ShotPanel from "./ShotPanel";

const eyebrow = "font-mono text-xs leading-normal font-medium tracking-[0.48px] text-fg-muted uppercase";
const body = "text-base leading-[1.65] text-fg-2 md:text-[17px]";
/** Text sits in a 720px column; panels of screens run wider. */
const column = "mx-auto w-full max-w-180 px-4 md:px-0";
const wide = "mx-auto w-full max-w-336 px-4 md:px-8 lg:px-0";

function Paragraph({ block }: { block: Block }) {
  if (block.kind === "question")
    return <p className={cn(body, "font-medium text-fg")}>{block.text}</p>;
  if (block.kind === "lead")
    return (
      <p className={body}>
        <strong className="font-semibold text-fg">{block.lead}</strong> {block.text}
      </p>
    );
  return <p className={body}>{block.text}</p>;
}

/** Research findings and PM feedback: a statement on top, what I did below. */
function Cards({ cards }: { cards: Card[] }) {
  return (
    <ul className="mx-auto grid w-full max-w-256 gap-4 px-4 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-x-6 md:gap-y-0 md:px-8 lg:px-0">
      {cards.map((card, i) => (
        <li
          key={card.eyebrow}
          {...blurIn(i)}
          className="grid overflow-hidden rounded-2xl border border-line bg-surface md:row-span-2 md:grid-rows-subgrid"
        >
          <div className="flex flex-col gap-3 px-6 pt-6 pb-5">
            <p className={eyebrow}>{card.eyebrow}</p>
            <h3 className="text-lg leading-[1.4] font-medium text-fg">{card.title}</h3>
            {card.body && <p className="text-[15px] leading-[1.6] text-fg-2">{card.body}</p>}
            {card.note && <p className="mt-1 font-mono text-[13px] text-fg-muted">{card.note}</p>}
          </div>
          <div className="flex flex-col gap-2.5 border-t border-line bg-page px-6 pt-5 pb-6">
            <p className={cn(eyebrow, "text-cs-accent")}>{card.footLabel}</p>
            <p className="text-[15px] leading-[1.6] text-fg-2">{card.foot}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Stats({ section }: { section: Section }) {
  if (!section.stats) return null;
  return (
    <>
      <dl className="grid gap-6 sm:grid-cols-3">
        {section.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-2 border-t border-line pt-5">
            <dt className="font-mono text-[13px] leading-snug text-fg-muted">{stat.label}</dt>
            <dd className="font-mono text-4xl leading-none font-medium tracking-[-1.32px] text-fg tabular-nums md:text-[44px]">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
      {section.statsNote && (
        <p className="font-mono text-[13px] leading-normal text-fg-muted">{section.statsNote}</p>
      )}
    </>
  );
}

function CaseSection({ section }: { section: Section }) {
  return (
    <Reveal
      as="section"
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      rootMargin="0px 0px -10% 0px"
      className="flex scroll-mt-24 flex-col gap-10"
    >
      <div className={cn(column, "flex flex-col gap-6")}>
        <header {...blurIn(0)} className="flex flex-col gap-3">
          <p className={eyebrow}>{section.eyebrow}</p>
          <h2
            id={`${section.id}-title`}
            className="text-2xl leading-[1.25] font-medium tracking-[-0.64px] text-balance text-fg md:text-[32px]"
          >
            {section.title}
          </h2>
        </header>
        {/* Long copy only fades: blurring whole paragraphs is costly on phones. */}
        <div data-fade className="flex flex-col gap-6">
          {section.blocks.map((block, i) => (
            <Paragraph key={i} block={block} />
          ))}
          {section.stats && <Stats section={section} />}
        </div>
      </div>

      {section.cards && <Cards cards={section.cards} />}

      {section.visuals?.map((visual) => (
        <div key={visual.shots[0].src} data-fade className={wide}>
          <ShotPanel visual={visual} />
        </div>
      ))}
    </Reveal>
  );
}

/**
 * The Cwito Reward Center case study, built from the Figma page: a reading
 * column for the story, wider panels for the screens, and a section rail on
 * the left edge on desktop.
 */
export default function CwitoCaseStudy() {
  return (
    <article className="pb-16 md:pb-24">
      <SectionRail sections={cs.sections.map((s) => ({ id: s.id, label: s.nav }))} />

      <header className="mx-auto flex w-full max-w-266 flex-col gap-6 px-4 pt-8 md:px-8 md:pt-10 lg:px-0">
        <div {...stagger(0)}>
          <CloseButton
            fallback="/works"
            label="Back"
            closeOnEscape={false}
            className="font-mono text-sm font-medium text-fg uppercase underline underline-offset-2 hover:text-fg-3"
          />
        </div>
        <div className="flex flex-col gap-5">
          <p {...stagger(1)} className={cn(eyebrow, "font-sans whitespace-pre-wrap")}>
            {cs.crumb}
          </p>
          <h1
            {...stagger(2)}
            className="max-w-180 text-[28px] leading-9 font-bold tracking-[-0.56px] text-fg md:text-[40px] md:leading-12 md:tracking-[-0.8px]"
          >
            {cs.title}
          </h1>
          <p {...stagger(3)} className="max-w-226 text-base leading-7 text-fg-2 md:text-lg">
            {cs.intro}
          </p>
        </div>
        <dl {...stagger(4)} className="grid gap-4 sm:grid-cols-3 sm:gap-10">
          {cs.meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 border-t border-line pt-4">
              <dt className={eyebrow}>{item.label}</dt>
              <dd className="text-[15px] leading-normal text-fg-2">{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div {...stagger(5)} className="mx-auto mt-10 w-full max-w-282 px-4 md:px-8 lg:px-0">
        <ShotPanel visual={cs.hero} priority panelClassName="rounded-2xl" />
      </div>

      <div className="mt-10 flex flex-col gap-10 md:gap-12">
        <div className={column}>
          <aside
            aria-label="TL;DR"
            className="flex flex-col gap-3 border-[0.5px] border-line-subtle bg-surface p-6 md:p-7"
          >
            <p className={eyebrow}>TL;DR</p>
            <p className="text-base leading-[1.65] text-fg md:text-[17px]">{cs.tldr.body}</p>
            <p className={body}>
              <strong className="font-medium text-fg">{cs.tldr.resultLead}</strong> {cs.tldr.result}
            </p>
          </aside>
        </div>

        {cs.sections.map((section) => (
          <CaseSection key={section.id} section={section} />
        ))}
      </div>

      <nav
        aria-label="Next case study"
        className="mx-auto mt-16 flex w-full max-w-336 items-center justify-between gap-4 border-t border-line px-4 pt-8 md:px-8 lg:px-0"
      >
        <p className={eyebrow}>Next case study</p>
        {cs.next.href ? (
          <Link
            href={cs.next.href}
            transitionTypes={[...forwardNav]}
            className="group inline-flex items-center gap-3 font-mono text-3xl font-medium tracking-[-1.2px] text-fg md:text-[40px]"
          >
            {cs.next.name}
            <span aria-hidden className="arrow-nudge-x">→</span>
          </Link>
        ) : (
          <p className="flex flex-col items-end gap-1 text-right">
            <span className="font-mono text-3xl font-medium tracking-[-1.2px] text-fg-3 md:text-[40px]">
              {cs.next.name}
            </span>
            <span className="font-mono text-xs text-fg-muted uppercase">Coming soon</span>
          </p>
        )}
      </nav>
    </article>
  );
}
