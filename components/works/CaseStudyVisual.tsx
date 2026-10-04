"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaseStudy } from "@/lib/constants/works";

export default function CaseStudyVisual({
  visual,
  prevSlug,
  nextSlug,
}: {
  visual: CaseStudy["visual"];
  prevSlug?: string;
  nextSlug?: string;
}) {
  const { push } = useRouter();

  return (
    <div className="relative">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl lg:aspect-3/4">
        <Image
          src={visual.backgroundSrc}
          alt=""
          width={593}
          height={830}
          className="object-cover"
          priority
        />
      </div>

      <button
        type="button"
        onClick={() => prevSlug && push(`/works/${prevSlug}`)}
        disabled={!prevSlug}
        aria-label="Previous project"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={() => nextSlug && push(`/works/${nextSlug}`)}
        disabled={!nextSlug}
        aria-label="Next project"
        className="absolute right-17.5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {nextSlug && (
        <Link
          href={`/works/${nextSlug}`}
          className="absolute -bottom-8 right-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-[12px] bg-white px-5 py-5 text-2xl font-noodle uppercase underline underline-offset-2"
        >
          Next project
        </Link>
      )}
    </div>
  );
}
