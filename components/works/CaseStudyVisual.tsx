"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CaseStudy } from "@/lib/constants/works";

export default function CaseStudyVisual({
  visual,
  onPrev,
  onNext,
}: {
  visual: CaseStudy["visual"];
  onPrev?: () => void;
  onNext?: () => void;
}) {
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
        onClick={onPrev}
        aria-label="Previous project"
        className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next project"
        className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-105"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <a
        href="#next-project"
        className="absolute -bottom-24 right-0 border border-[#101828] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide underline underline-offset-2"
      >
        Next project
      </a>
    </div>
  );
}
