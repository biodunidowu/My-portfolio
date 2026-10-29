import type { ComponentProps, ReactNode } from "react";
import RichText from "@/lib/richText";
import { Experience } from "@/lib/constants/experience";

export default function ExperienceItem({
  company,
  period,
  points,
  heading,
  ...props
}: Experience & { heading?: ReactNode } & ComponentProps<"div">) {
  return (
    <div
      className="font-mono md:grid md:grid-cols-[117px_1fr] md:gap-x-3.5"
      {...props}
    >
      <div className="hidden flex-col gap-1 text-xs leading-5 text-fg-3 uppercase md:flex">
        {heading}
        <span>{period}</span>
      </div>

      <div className="flex flex-col gap-1.25 md:gap-2">
        <h3 className="flex gap-1.25 text-xs leading-5 tracking-[-0.12px] whitespace-nowrap uppercase md:tracking-normal">
          <span className="font-bold text-fg">{company}</span>
          <span className="text-fg-3 md:hidden">({period})</span>
        </h3>

        <ul className="ms-4.5 list-disc space-y-2 text-xs leading-5 tracking-[-0.12px] text-fg-3 marker:text-fg-3 md:ms-5.25 md:text-sm md:leading-6 md:tracking-[-0.14px] [&_strong]:font-bold [&_strong]:text-fg">
          {points.map((point) => (
            <li key={point}>
              <RichText text={point} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
