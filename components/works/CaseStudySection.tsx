import RichText from "@/lib/richText";
import type { CaseStudySection as Section } from "@/lib/constants/works";

export default function CaseStudySection({ section }: { section: Section }) {
  if (section.type === "paragraph") {
    return (
      <div>
        {section.heading && (
          <h2 className="text-lg font-semibold">{section.heading}</h2>
        )}
        <p className="mt-3 text-[15px] leading-relaxed text-[#475467]">
          {section.body}
        </p>
      </div>
    );
  }

  if (section.type === "list") {
    return (
      <div>
        {section.heading && (
          <h2 className="text-lg font-semibold">{section.heading}</h2>
        )}
        <ul className="mt-3 space-y-3">
          {section.items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-[15px] leading-relaxed text-[#475467]"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#667085]" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <a
      href={section.href}
      target="_blank"
      rel="noreferrer"
      className="inline-block border border-[#101828] px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
    >
      {section.label}
    </a>
  );
}
