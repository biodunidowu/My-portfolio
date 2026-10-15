import HatchBand from "@/components/core/HatchBand";
import { LoadingLabel, Skeleton, SkeletonText } from "@/components/core/Skeleton";

/**
 * Shown instantly while a page's content is on its way (a slow connection,
 * or a link clicked before it finished prefetching). Mirrors the common page
 * shape: the hatch band, then a framed visual beside a block of text.
 */
export default function Loading() {
  return (
    <main className="flex-1 overflow-x-clip pt-8 pb-16">
      <LoadingLabel />
      <HatchBand>
        <div className="flex h-full w-full max-w-114 items-center rounded-xl border-b border-line bg-surface px-3">
          <Skeleton className="h-9 flex-1" />
        </div>
      </HatchBand>

      <div className="mx-auto grid w-full max-w-360 gap-8 px-4 pt-8 md:grid-cols-[minmax(0,814fr)_minmax(0,391fr)] md:gap-9 md:px-8 md:pt-13.5 lg:pr-29.5 lg:pl-11.75">
        <Skeleton className="aspect-678/546 w-full" />
        <div className="flex flex-col gap-6">
          <SkeletonText lines={2} />
          <SkeletonText lines={4} />
          <SkeletonText lines={3} />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
    </main>
  );
}
