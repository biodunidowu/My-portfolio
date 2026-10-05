import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { caseStudies } from "@/lib/constants/works";
import { forwardNav } from "@/lib/transitions";

type Tile = {
  row: 1 | 2;
  slug: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const tiles: Tile[] = [
  { row: 1, slug: "celler", src: "/images/celler.svg", alt: "celler", width: 379, height: 546 },
  { row: 1, slug: "cwito", src: "/images/cwito.svg", alt: "cwito", width: 379, height: 546 },
  { row: 1, slug: "gambit", src: "/images/gambit.svg", alt: "gambit", width: 379, height: 546 },
  { row: 2, slug: "tawq", src: "/images/tawq.svg", alt: "tawq", width: 591, height: 601 },
  { row: 2, slug: "rhoblo", src: "/images/rhoble.svg", alt: "rhoblo", width: 591, height: 609 },
];

function WorkTile({ tile }: { tile: Tile }) {
  const published = caseStudies.some((cs) => cs.slug === tile.slug);

  const image = (
    <Image
      src={tile.src}
      alt={tile.alt}
      height={tile.height}
      width={tile.width}
      className="h-auto w-full"
    />
  );

  if (!published) {
    return <div className="block opacity-70">{image}</div>;
  }

  return (
    <Link
      href={`/works/${tile.slug}`}
      transitionTypes={[...forwardNav]}
      className="block cursor-pointer transition-opacity hover:opacity-80"
    >
      <ViewTransition name={`work-${tile.slug}`} share="morph" default="none">
        {image}
      </ViewTransition>
    </Link>
  );
}

export default function WorksGrid() {
  return (
    <div className="flex flex-col gap-11.5">
      <div className="grid xl:grid-cols-[repeat(3,max-content)] md:grid-cols-2 gap-6 place-content-center">
        {tiles
          .filter((tile) => tile.row === 1)
          .map((tile) => (
            <WorkTile key={tile.slug} tile={tile} />
          ))}
      </div>

      <div className="flex xl:flex-row flex-col justify-center items-center gap-6.75">
        {tiles
          .filter((tile) => tile.row === 2)
          .map((tile) => (
            <WorkTile key={tile.slug} tile={tile} />
          ))}
      </div>
    </div>
  );
}