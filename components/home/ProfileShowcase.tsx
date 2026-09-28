import { experience } from "@/lib/constants/experience";
import CopyEmail from "./CopyEmail";
import ExperienceItem from "./ExperienceItem";
import VideoPanel from "./VideoPanel";

export default function ProfileShowcase() {
  return (
    <section id="about" className="flex justify-betwee pl-30">
      <VideoPanel />

      <div className="flex flex-col justify-center gap-10 px-6 py-14 md:px-16">
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

        <div className="max-w-lg space-y-6">
          <span className="text-sm font-semibold uppercase text-[#101828]">
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
