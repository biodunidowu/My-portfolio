import type { ComponentProps, ReactNode } from "react";
import { Experience } from "@/lib/constants/experience";

export default function ExperienceItem({
  company,
  period,
  points,
  heading,
  ...props
}: Experience & { heading?: ReactNode } & ComponentProps<"div">) {
  return (
    <div className="xl:grid xl:grid-cols-[117px_1fr] xl:gap-x-3.5" {...props}>
      <div className="hidden flex-col gap-1 text-xs leading-5 text-[#667085] uppercase xl:flex">
        {heading}
        <span>{period}</span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="flex gap-2 text-xs leading-5 whitespace-nowrap uppercase">
          <span className="font-bold text-[#101828]">{company}</span>
          <span className="text-[#667085] xl:hidden">({period})</span>
        </h3>

        <ul className="ms-4.5 list-disc space-y-2 text-xs leading-5 text-[#667085] marker:text-[#667085] xl:ms-5.25 xl:text-sm xl:leading-6">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
