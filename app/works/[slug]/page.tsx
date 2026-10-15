import CaseStudyPage from "@/components/works/CaseStudy";
import { caseStudies, getSiblingSlugs } from "@/lib/constants/works";
import { notFound } from "next/navigation";

// Only the known slugs exist; anything else is a real 404 (not a streamed 200).
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) notFound();

  const { prevSlug, nextSlug } = getSiblingSlugs(slug);

  return (
    <CaseStudyPage
      caseStudy={caseStudy}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
    />
  );
}
