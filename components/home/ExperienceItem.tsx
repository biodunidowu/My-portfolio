import { Experience } from "@/lib/constants/experience";


export default function ExperienceItem({ company, period, points }: Experience) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-6 md:grid-cols-[140px_1fr]">
      <span className="text-sm text-(--color-muted)">{period}</span>
      <div>
        <h3 className="font-semibold">{company}</h3>
        <ul className="mt-2 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex gap-2 text-sm leading-relaxed text-(--color-text)">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--color-muted)" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
