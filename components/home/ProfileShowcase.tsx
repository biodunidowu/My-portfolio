import { experience } from "@/lib/constants/experience";
import CopyEmail from "./CopyEmail";
import ExperienceItem from "./ExperienceItem";
import VideoPanel from "./VideoPanel";

export default function ProfileShowcase() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 items-stretch px-4 lg:pl-30 lg:grid-cols-[592px_1fr] md:mb-20"
    >
      <VideoPanel />

      <div className="flex flex-col justify-center gap-10 py-14 pt-5 md:px-16">
        <div className="max-w-lg space-y-3.5">
          <p className="leading-snug">
            Hey I&apos;m Abiodun, a <strong>Product Designer</strong> and{" "}
            <strong>tinkerer.</strong>
          </p>

          <p className="text-sm leading-relaxed text-[#475467]">
            I help startups go from idea to MVP. Over the past 5 years,
            I&apos;ve led research and product strategy across multiple
            early-stage teams, working closely with founders to design and ship
            products people actually use.
          </p>

          <CopyEmail email="Abiodunidowu1998@gmail.com" />
        </div>

        <div className="max-w-xl space-y-6 mt-1 md:mt-0">
          <span className="uppercase text-[#101828] md:font-medium">
            Experience
          </span>

          {experience.map((item) => (
            <ExperienceItem key={item.company} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
