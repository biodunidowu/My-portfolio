import type { CSSProperties } from "react";
import { experience } from "@/lib/constants/experience";
import { BOOKING_URL, CV_URL, EMAIL } from "@/lib/constants/contact";
import Reveal from "@/components/core/Reveal";
import CopyEmail from "./CopyEmail";
import ExperienceItem from "./ExperienceItem";
import VideoPanel from "./VideoPanel";
import { blurIn } from "@/lib/stagger";

const chipClass =
  "inline-flex items-center bg-chip px-3 py-2 font-mono text-xs leading-5 font-medium tracking-[-0.48px] text-fg underline hover:bg-chip-hover transition-[background-color,scale] duration-160 ease-out active:scale-97";

// Desktop grid lines (1440 frame): verticals at 120, 712 and 40px from the
// right; a rule along the top of the video and one across its bottom.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const vLine =
  "line-grow pointer-events-none absolute top-0 hidden w-px bg-line xl:block";

export default function ProfileShowcase() {
  return (
    // The second fold: its text blurs in once when it scrolls into view.
    <Reveal
      as="section"
      id="about"
      rootMargin="0px 0px -15% 0px"
      className="relative mb-6 grid grid-cols-1 md:mb-16 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-10 md:px-8 xl:mb-21.5 xl:grid-cols-[592px_1fr] xl:gap-0 xl:pt-7.5 xl:pr-10 xl:pl-30"
    >
      <span aria-hidden style={delay(0)} className={`${vLine} bottom-0 left-30`} />
      <span aria-hidden style={delay(120)} className={`${vLine} bottom-0 left-178`} />
      <span aria-hidden style={delay(240)} className={`${vLine} -bottom-21.5 right-10`} />
      <span
        aria-hidden
        style={delay(360)}
        className="line-grow line-grow-x pointer-events-none absolute top-7.5 left-30 hidden h-px w-148 bg-line xl:block"
      />
      <span
        aria-hidden
        style={delay(480)}
        className="line-grow line-grow-x pointer-events-none absolute bottom-0 left-0 hidden h-px w-full bg-line xl:block"
      />

      <div
        data-fade
        className="order-2 mt-7 border-y border-line px-4 md:order-1 md:mt-0 md:border-0 md:px-0"
      >
        <VideoPanel />
      </div>

      <div className="order-1 flex flex-col gap-8.5 px-4 md:order-2 md:gap-10 md:px-0 xl:grid xl:grid-rows-[283px_auto_1fr] xl:gap-0">
        <div className="flex w-full max-w-109 flex-col gap-3.25 font-mono xl:mr-1 xl:justify-self-end">
          <p
            {...blurIn(0)}
            className="text-xs leading-5 tracking-[-0.64px] text-fg md:text-sm md:tracking-normal"
          >
            Hey I&apos;m Abiodun, a <strong>Product Designer</strong> and a{" "}
            <strong>Tinkerer.</strong>
          </p>

          <p
            {...blurIn(1)}
            className="text-xs leading-5 tracking-[-0.48px] text-fg-2 md:text-sm md:leading-6 md:tracking-[-0.56px] md:text-fg-3"
          >
            I help startups go from idea to MVP. Over the past 5 years,
            I&apos;ve led research and product strategy across multiple
            early-stage teams, working closely with founders to design and ship
            products people actually use.
          </p>

          <div
            {...blurIn(2)}
            className="flex flex-wrap items-start gap-3 md:gap-3.25"
          >
            <CopyEmail email={EMAIL} />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className={chipClass}
            >
              Let&apos;s have a chat
            </a>
          </div>
        </div>

        <div className="flex w-full max-w-139 flex-col gap-4 md:gap-6.25 xl:mr-2 xl:justify-self-end">
          <h2
            {...blurIn(3)}
            className="font-mono text-sm leading-5 tracking-[-0.56px] text-fg uppercase md:hidden"
          >
            Experience
          </h2>

          {experience.map((item, index) => (
            <ExperienceItem
              key={item.company}
              {...item}
              {...blurIn(4 + index)}
              heading={
                index === 0 ? (
                  <span className="text-sm text-fg">Experience</span>
                ) : undefined
              }
            />
          ))}
        </div>

        <div
          {...blurIn(4 + experience.length)}
          className="-mt-2.5 flex w-full max-w-109 items-start self-start md:-mt-3.75 xl:mt-7.25 xl:mr-1 xl:justify-self-end"
        >
          <a
            href={CV_URL}
            target="_blank"
            rel="noreferrer"
            className={chipClass}
          >
            Have a look at my CV
          </a>
        </div>
      </div>
    </Reveal>
  );
}
