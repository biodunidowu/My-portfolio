import { works } from "@/lib/constants/works";
import Image from "next/image";

export default function WorksMarquee() {
  // Render the list twice back to back so the track can scroll exactly
  // -50% and loop seamlessly into itself.
  const trackItems = [...works, ...works];

  return (
    <section
      id="works"
      aria-label="Selected work"
      className="marquee-viewport overflow-hidden my-7.5"
    >
      <div className="marquee-track flex gap-4 w-max">
        {trackItems.map((work, index) => (
          <div key={`${work.id}-${index}`} className="relative shrink-0">
            <Image
              src={work.src}
              alt={work.title}
              width={463}
              height={356}
              className="h-65.75 w-auto object-contain md:h-auto"
              priority={index < works.length}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
