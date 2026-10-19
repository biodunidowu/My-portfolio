import type { Metadata } from "next";
import { ViewTransition } from "react";
import FooterSection from "@/components/core/Footer";
import HatchBand from "@/components/core/HatchBand";
import { EMAIL } from "@/lib/constants/contact";
import { CV_PDF, cv } from "@/lib/constants/cv";
import { stagger } from "@/lib/stagger";
import { pageTransition } from "@/lib/transitions";

export const metadata: Metadata = {
  title: "CV — Idowu Abiodun",
  description:
    "Product Designer with 5+ years across fintech, HR SaaS and ed-tech: experience, skills, certifications and education.",
};

const sectionLabel =
  "font-mono text-xs leading-5 tracking-[-0.48px] text-fg-muted uppercase print:text-[#667085]";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-4 border-t border-line pt-6 md:grid-cols-[160px_1fr] md:gap-8 print:break-inside-auto print:border-[#eaecf0] print:pt-4">
      <h2 className={sectionLabel}>( {title} )</h2>
      <div>{children}</div>
    </section>
  );
}

/**
 * The CV as a page on the site, so visitors don't leave for a Google Doc.
 * Prints cleanly (site chrome hidden, see globals.css), and the PDF offered
 * for download is printed from this page.
 */
export default function CvPage() {
  return (
    <ViewTransition {...pageTransition}>
      <main className="overflow-x-clip pt-8 pb-12 md:pb-20 print:p-0">
        <HatchBand className="print:hidden">
          <div className="relative flex h-full w-full max-w-114 items-center rounded-xl border-b border-line bg-surface px-3">
            <p className="flex-1 border-x border-line bg-page px-3 py-2.5 text-center font-mono text-[13px] leading-normal font-medium text-fg uppercase sm:text-sm">
              Curriculum vitae
            </p>
          </div>
        </HatchBand>

        <div className="mx-auto w-full max-w-200 px-4 pt-8 md:px-8 md:pt-12 print:max-w-none print:p-0">
          <div
            {...stagger(0)}
            className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden"
          >
            <p className="font-mono text-xs leading-5 tracking-[-0.48px] text-fg-3">
              Read it here, or take a copy with you.
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={CV_PDF}
                download
                className="group inline-flex items-center gap-2 bg-fg px-4 py-3 font-mono text-sm leading-5 font-medium text-on-fg uppercase btn-motion hover:opacity-85"
              >
                Download PDF
                <span aria-hidden className="arrow-nudge-up">
                  ↓
                </span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center bg-chip px-4 py-3 font-mono text-sm leading-5 font-medium text-fg uppercase btn-motion hover:bg-chip-hover"
              >
                Email me
              </a>
            </div>
          </div>

          <article
            {...stagger(1)}
            className="flex flex-col gap-8 border border-line bg-surface px-5 py-8 md:px-12 md:py-12 print:gap-5 print:border-0 print:bg-white print:p-0 print:text-black"
          >
            <header className="flex flex-col gap-3">
              <h1 className="font-mono text-[28px] leading-9 font-medium tracking-[-0.56px] text-fg md:text-[32px] md:leading-10 print:text-[24px] print:leading-8 print:text-black">
                {cv.name}
                <span className="text-fg-muted print:text-[#667085]"> · {cv.role}</span>
              </h1>
              <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs leading-5 tracking-[-0.48px]">
                {cv.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-fg-3 underline underline-offset-2 transition-colors duration-short ease-out-cubic hover:text-fg print:text-black"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-2 max-w-170 text-sm leading-6 text-fg-2 print:text-[12px] print:leading-5 print:text-[#344054]">
                {cv.summary}
              </p>
            </header>

            <Section title="Experience">
              <ol className="flex flex-col gap-7 print:gap-4">
                {cv.experience.map((job) => (
                  <li key={job.company} className="print:break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-[15px] leading-6 font-medium text-fg print:text-[13px] print:text-black">
                        {job.company}
                        {job.place && (
                          <span className="font-normal text-fg-3 print:text-[#667085]">
                            {" "}
                            · {job.place}
                          </span>
                        )}
                      </h3>
                      {job.dates && (
                        <p className="font-mono text-xs leading-5 tracking-[-0.48px] text-fg-3 print:text-[#667085]">
                          {job.dates}
                        </p>
                      )}
                    </div>
                    <p className="font-mono text-xs leading-5 tracking-[-0.48px] text-fg-3 print:text-[#667085]">
                      {job.title} — {job.terms}
                    </p>
                    <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-sm leading-6 text-fg-2 marker:text-fg-muted print:mt-1.5 print:gap-0.5 print:text-[11.5px] print:leading-[17px] print:text-[#344054]">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Section>

            <Section title="Skills">
              <dl className="flex flex-col gap-2 text-sm leading-6 print:text-[11.5px] print:leading-[17px]">
                {cv.skills.map((skill) => (
                  <div key={skill.label} className="sm:flex sm:gap-2">
                    <dt className="font-medium text-fg print:text-black">{skill.label}:</dt>
                    <dd className="text-fg-2 print:text-[#344054]">{skill.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section title="Certifications">
              <ul className="flex flex-col gap-1.5 text-sm leading-6 text-fg-2 print:text-[11.5px] print:leading-[17px] print:text-[#344054]">
                {cv.certifications.map((c) => (
                  <li key={c.name} className="flex flex-wrap justify-between gap-x-4">
                    <span>
                      <span className="text-fg print:text-black">{c.name}</span> — {c.issuer}
                    </span>
                    <span className="font-mono text-xs leading-6 tracking-[-0.48px] text-fg-3 print:text-[#667085]">
                      {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Education">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[15px] leading-6 font-medium text-fg print:text-[13px] print:text-black">
                  {cv.education.school}
                  <span className="font-normal text-fg-3 print:text-[#667085]">
                    {" "}
                    · {cv.education.place}
                  </span>
                </h3>
                <p className="font-mono text-xs leading-5 tracking-[-0.48px] text-fg-3 print:text-[#667085]">
                  {cv.education.date}
                </p>
              </div>
              <p className="text-sm leading-6 text-fg-2 print:text-[11.5px] print:text-[#344054]">
                {cv.education.degree} · {cv.education.detail}
              </p>
            </Section>
          </article>
        </div>
      </main>

      <div className="print:hidden">
        <FooterSection />
      </div>
    </ViewTransition>
  );
}
