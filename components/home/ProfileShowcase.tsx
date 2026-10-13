import { experience } from "@/lib/constants/experience";
import { BOOKING_URL, CV_URL, EMAIL } from "@/lib/constants/contact";
import Reveal from "@/components/core/Reveal";
import CopyEmail from "./CopyEmail";
import ExperienceItem from "./ExperienceItem";
import VideoPanel from "./VideoPanel";
import { blurIn } from "@/lib/stagger";

const chipClass =
  "inline-flex items-center bg-[#F2F4F7] px-3 py-2 text-xs leading-5 font-medium text-[#101828] underline hover:bg-[#EAECF0] transition-[background-color,scale] duration-160 ease-out active:scale-97";

export default function ProfileShowcase() {
  return (
    // The second fold: its text blurs in once when it scrolls into view.
    <Reveal
      as="section"
      id="about"
      rootMargin="0px 0px -15% 0px"
      className="relative mb-6 grid grid-cols-1 border-[#EAECF0] xl:mb-24.5 xl:grid-cols-[592px_1fr] xl:border-b xl:pr-10 xl:pl-30"
    >
      {/* Desktop grid line on the right edge of the content column. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-10 -bottom-24.5 hidden w-px bg-[#EAECF0] xl:block"
      />

      <div
        data-fade
        className="order-2 mt-7 border-y border-[#EAECF0] px-4 md:px-10 xl:order-1 xl:mt-0 xl:border-0 xl:px-0"
      >
        <VideoPanel />
      </div>

      <div className="order-1 flex flex-col gap-8.5 px-4 md:px-10 xl:order-2 xl:gap-45 xl:pl-11.25 xl:pr-0">
        <div className="flex w-full max-w-109 flex-col gap-3.25 xl:max-w-139">
          <p {...blurIn(0)} className="text-xs leading-5 text-[#101828] xl:text-sm">
            Hey I&apos;m Abiodun, a <strong>Product Designer</strong> and a{" "}
            <strong>Tinkerer.</strong>
          </p>

          <p
            {...blurIn(1)}
            className="text-xs leading-5 text-[#475467] xl:text-sm xl:leading-6 xl:text-[#667085]"
          >
            I help startups go from idea to MVP. Over the past 5 years,
            I&apos;ve led research and product strategy across multiple
            early-stage teams, working closely with founders to design and ship
            products people actually use.
          </p>

          <div
            {...blurIn(2)}
            className="flex flex-wrap items-start gap-3 xl:gap-3.25"
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

        <div className="flex w-full max-w-139 flex-col gap-4 xl:gap-4.25">
          <h2
            {...blurIn(3)}
            className="text-sm leading-5 text-[#101828] uppercase xl:hidden"
          >
            Experience
          </h2>

          <div className="flex flex-col gap-6 xl:gap-6.25">
            {experience.map((item, index) => (
              <ExperienceItem
                key={item.company}
                {...item}
                {...blurIn(4 + index)}
                heading={
                  index === 0 ? (
                    <span className="text-sm text-[#101828]">Experience</span>
                  ) : undefined
                }
              />
            ))}
          </div>

          <div {...blurIn(4 + experience.length)} className="xl:ml-31.5">
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
      </div>
    </Reveal>
  );
}
