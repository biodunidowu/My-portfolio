import HatchBand from "@/components/core/HatchBand";
import { LoadingLabel, Skeleton, SkeletonText } from "@/components/core/Skeleton";

// The panel opens straight away and holds this shape until the exploration
// arrives, instead of waiting on a slow connection with nothing on screen.
export default function Loading() {
  return (
    <div className="flex flex-col">
      <LoadingLabel>Loading exploration…</LoadingLabel>
      <HatchBand>
        <div className="flex h-full w-full max-w-114 items-center rounded-xl border-b border-line bg-surface px-3">
          <Skeleton className="h-9 flex-1" />
        </div>
      </HatchBand>
      <div className="mx-auto grid w-full max-w-360 gap-8 px-4 pt-8 pb-6 md:grid-cols-[minmax(0,814fr)_minmax(0,391fr)] md:gap-9 md:px-8 md:pt-13.5 lg:pr-29.5 lg:pl-11.75">
        <Skeleton className="aspect-678/546 w-full" />
        <div className="flex flex-col gap-5">
          <SkeletonText lines={2} />
          <SkeletonText lines={4} />
          <SkeletonText lines={3} />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  );
}
