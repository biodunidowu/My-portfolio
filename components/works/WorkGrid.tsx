import { caseCards } from "@/lib/constants/caseCards";
import CaseStudyCard from "./CaseStudyCard";

export default function WorksGrid() {
  return (
    <div className="flex flex-col gap-8">
      {caseCards.map((card) => (
        <CaseStudyCard key={card.slug} card={card} />
      ))}
    </div>
  );
}
