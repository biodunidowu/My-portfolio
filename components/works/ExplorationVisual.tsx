import Image from "next/image";
import { cn } from "@/lib/utils";
import { TILE, type Exploration } from "@/lib/constants/explorations";
import AutoplayVideo from "./AutoplayVideo";

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** The framed shot from the design: painting background with the work on top. */
export default function ExplorationVisual({
  exploration,
  sizes,
  preload,
  fetchPriority,
  hero = false,
  className,
}: {
  exploration: Exploration;
  sizes: string;
  /** Load now rather than when scrolled near (all of the tile's images). */
  preload?: boolean;
  /** "low" for tiles loaded ahead in the background (a hidden tab). */
  fetchPriority?: "high" | "low" | "auto";
  /** On the exploration's own page, which may sit on a different painting. */
  hero?: boolean;
  className?: string;
}) {
  const { tile, title } = exploration;

  return (
    <div
      className={cn(
        "skeleton relative aspect-678/546 w-full overflow-hidden",
        className,
      )}
    >
      <Image
        src={(hero && tile.heroBackgroundSrc) || tile.backgroundSrc}
        loading={preload ? "eager" : "lazy"}
        fetchPriority={fetchPriority}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
      />

      {tile.shots.map((shot, i) => (
        <div
          key={shot.src}
          className="absolute overflow-hidden"
          style={{
            left: pct(shot.box.x, TILE.width),
            top: pct(shot.box.y, TILE.height),
            width: pct(shot.box.w, TILE.width),
            height: pct(shot.box.h, TILE.height),
          }}
        >
          {shot.video ? (
            <AutoplayVideo src={shot.src} label={title} className="bg-[#0A0A0A]" />
          ) : shot.crop ? (
            <Image
              src={shot.src}
              alt={i === 0 ? title : ""}
              width={600}
              height={1200}
              sizes="(min-width: 768px) 25vw, 50vw"
              loading={preload ? "eager" : "lazy"}
              fetchPriority={fetchPriority}
              className="absolute top-0 max-w-none"
              style={{
                width: `${shot.crop.w}%`,
                height: `${shot.crop.h}%`,
                left: `${shot.crop.left}%`,
              }}
            />
          ) : (
            <Image
              src={shot.src}
              alt={title}
              fill
              sizes={sizes}
              loading={preload ? "eager" : "lazy"}
              fetchPriority={fetchPriority}
              className="object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
