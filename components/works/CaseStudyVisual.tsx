import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ViewTransition } from "react";
import { CaseStudy } from "@/lib/constants/works";
import { backNav, forwardNav } from "@/lib/transitions";

const chevronClass =
  "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40";

export default function CaseStudyVisual({
  slug,
  visual,
  prevSlug,
  nextSlug,
}: {
  slug: string;
  visual: CaseStudy["visual"];
  prevSlug?: string;
  nextSlug?: string;
}) {
  return (
    <div className="relative">
      <ViewTransition name={`work-${slug}`} share="morph" default="none">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl lg:aspect-3/4">
          <Image
            src={visual.backgroundSrc}
            alt=""
            width={593}
            height={830}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </ViewTransition>

      {prevSlug ? (
        <Link
          href={`/works/${prevSlug}`}
          transitionTypes={[...backNav]}
          scroll={false}
          aria-label="Previous project"
          className={`${chevronClass} left-4`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
          
        </Link>
      ) : (
        <span
          aria-hidden
          className={`${chevronClass} left-4 opacity-40`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
        </span>
      )}

      {nextSlug ? (
        <Link
          href={`/works/${nextSlug}`}
          transitionTypes={[...forwardNav]}
          scroll={false}
          aria-label="Next project"
          className={`${chevronClass} right-4`}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </Link>
      ) : (
        <span aria-hidden className={`${chevronClass} right-17.5 opacity-40`}>
          <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
        </span>
      )}

      {nextSlug && (
        <Link
          href={`/works/${nextSlug}`}
          transitionTypes={[...forwardNav]}
          scroll={false}
          className="absolute -bottom-8 right-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-[12px] bg-white px-5 py-5 text-2xl font-noodle uppercase underline underline-offset-2"
        >
          Next project
        </Link>
      )}
    </div>
  );
}