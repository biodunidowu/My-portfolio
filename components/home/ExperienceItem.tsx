import { Experience } from "@/lib/constants/experience";

export default function ExperienceItem({
  company,
  period,
  points,
}: Experience) {
  return (
    <div className="grid grid-cols-[130px_1fr] gap-3.5 mt-4">
      <span className="text-sm text-[#667085]">{period}</span>

      <div>
        <h3 className="font-semibold">{company}</h3>

        <ul className="mt-2 space-y-2">
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
