import { ViewTransition } from "react";
import { CaseStudy } from "@/lib/constants/works";
import CaseStudyVisual from "./CaseStudyVisual";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudySection from "./CaseStudySection";
import Link from "next/link";
import { backNav, pageTransition } from "@/lib/transitions";

export default function CaseStudyPage({
  caseStudy,
  prevSlug,
  nextSlug,
}: {
  caseStudy: CaseStudy;
  prevSlug?: string;
  nextSlug?: string;
}) {
  return (
    <ViewTransition {...pageTransition}>
      <main id="works" className="px-4 md:px-12 py-8">
        <Link
          href="/works"
          transitionTypes={[...backNav]}
          className="font-noodle text-2xl underline"
        >
          BACK
        </Link>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12 mt-6">
          <div className="space-y-10">
            <CaseStudyHeader brand={caseStudy.brand} />

            {caseStudy.sections.map((section, i) => (
              <CaseStudySection key={i} section={section} />
            ))}
          </div>

          <div className="lg:sticky lg:top-16 lg:h-fit">
            <CaseStudyVisual
              slug={caseStudy.slug}
              visual={caseStudy.visual}
              prevSlug={prevSlug}
              nextSlug={nextSlug}
            />
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}