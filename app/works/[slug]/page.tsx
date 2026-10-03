import CaseStudyPage from "@/components/works/CaseStudy";
import { caseStudies } from "@/lib/constants/works";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) notFound();

  return <CaseStudyPage caseStudy={caseStudy} />;
}
