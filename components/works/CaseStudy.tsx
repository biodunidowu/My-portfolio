"use client";
import { CaseStudy } from "@/lib/constants/works";
import CaseStudyVisual from "./CaseStudyVisual";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudySection from "./CaseStudySection";
import Header from "../core/Header";
import FooterSection from "../core/Footer";
import Link from "next/link";

export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="bg-[#F9FAFB]">
      <Header />

      <div className="px-4 md:px-12 py-8">
        <Link href="/works" className="font-noodle text-2xl underline">
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
            <CaseStudyVisual visual={caseStudy.visual} />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
