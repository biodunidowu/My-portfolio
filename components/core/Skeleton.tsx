import { cn } from "@/lib/utils";

/** A grey placeholder block that pulses while content loads (see `skeleton-block` in globals.css). */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton-block", className)} />;
}

/** Lines of placeholder text; the last one is shorter, like a paragraph's. */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("flex flex-col gap-2.5", className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}

/** Announces the wait to screen readers; the blocks themselves are hidden. */
export function LoadingLabel({ children = "Loading…" }: { children?: string }) {
  return (
    <p role="status" className="sr-only">
      {children}
    </p>
  );
}
