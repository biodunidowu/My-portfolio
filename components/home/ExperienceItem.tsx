import { Experience } from "@/lib/constants/experience";

export default function ExperienceItem({
  company,
  period,
  points,
}: Experience) {
  return (
    <div className="mt-3 flex flex-col gap-1 lg:mt-4 lg:grid lg:grid-cols-[130px_1fr] lg:gap-3.5">
      <span className="hidden text-sm text-[#667085] lg:block">{period}</span>

      <div>
        <h3 className="font-semibold">
          {company}{" "}
          <span className="font-normal text-[#667085] lg:hidden">
            ({period})
          </span>
        </h3>

        <ul className="mt-2 space-y-2.5 lg:space-y-2">
          {points.map((point) => (
            <li
              key={point}
              className="flex gap-2 text-sm leading-relaxed text-[#667085]"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#667085]" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
