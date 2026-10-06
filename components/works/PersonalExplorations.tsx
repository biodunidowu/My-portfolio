"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { explorations } from "@/lib/constants/explorations";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function PersonalExplorations() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const count = explorations.length;
  const active = explorations[index];
  const isFirst = index === 0;
  const isLast = index === count - 1;

  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(i + 1, count - 1)),
    [count],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && !isFirst) goPrev();
      if (event.key === "ArrowRight" && !isLast) goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext, isFirst, isLast]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="grid gap-5 md:grid-cols-2 mt-5">
        {explorations.map((exploration, i) => (
          <SheetTrigger
            key={exploration.id}
            onClick={() => setIndex(i)}
            className="group relative block aspect-678/596 w-full cursor-pointer "
          >
            <Image
              src={exploration.src}
              alt={exploration.title}
              fill
              className="object-cover"
            />
          </SheetTrigger>
        ))}
      </div>

      <SheetContent
        side="bottom"
        overlayClassName="z-[105]!"
        className="inset-x-0 bottom-0 top-(--header-height) z-[110]! h-[calc(100dvh-var(--header-height))] max-h-none w-full max-w-none overflow-y-auto bg-[#F9FAFB] p-0"
      >
        <div className="flex items-center justify-between bg-white px-6 py-6 md:px-10">
          <SheetTitle className="font-noodle text-xl uppercase">
            {active.title}
          </SheetTitle>

          <SheetClose className="font-semibold uppercase tracking-wide underline underline-offset-2 font-noodle text-lg">
            Close
          </SheetClose>
        </div>

        <div className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[1.3fr_1fr] md:px-10">
          <div className="relative aspect-678/596 w-full overflow-hidden rounded-2xl">
            <Image
              key={active.id}
              src={active.src}
              alt={active.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-5 text-[15px] leading-relaxed text-[#475467]">
              {active.description.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {active.liveLink && (
              <a
                href={active.liveLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block w-fit bg-[#101828] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
              >
                Check it out
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-8 md:px-10">
          <button
            type="button"
            onClick={goPrev}
            disabled={isFirst}
            className="text-sm font-semibold uppercase tracking-wide underline underline-offset-2 disabled:pointer-events-none disabled:opacity-0"
          >
            Prev
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={isLast}
            className="text-sm font-semibold uppercase tracking-wide underline underline-offset-2 disabled:pointer-events-none disabled:opacity-0"
          >
            Next
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
