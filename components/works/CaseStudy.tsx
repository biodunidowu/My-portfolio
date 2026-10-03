import { CaseStudy } from "@/lib/constants/works";
import CaseStudyVisual from "./CaseStudyVisual";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudySection from "./CaseStudySection";
import Header from "../core/Header";
import FooterSection from "../core/Footer";

export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div>
      <Header />

      <div className="grid grid-cols-1 gap-16 px-4 md:px-12 py-16 lg:grid-cols-2 lg:gap-12 bg-[#F9FAFB]">
        <div className="space-y-10">
          <CaseStudyHeader brand={caseStudy.brand} />

          {caseStudy.sections.map((section, i) => (
            <CaseStudySection key={i} section={section} />
          ))}
        </div>

        <div className="lg:sticky lg:top-16 lg:h-fit">
          <CaseStudyVisual visual={caseStudy.visual} />
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
