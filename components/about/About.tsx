import { AboutContent } from "@/lib/constants/about";
import Image from "next/image";

export default function About({ content }: { content: AboutContent }) {
  return (
    <section className="relative bg-[#F9FAFB] pb-16">
      <div className="relative z-10 px-6 lg:w-132.5">
        <div className="bg-white px-8 py-6 shadow-sm rounded-lg">
          <h1 className="font-noodle text-2xl uppercase">About me</h1>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-10 px-6 pt-10 lg:grid-cols-[minmax(0,480px)_1fr]">
        <div className="relative aspect-4/5 w-full overflow-hidden bg-white">
          <Image
            src={content.photoSrc}
            alt={content.photoAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover grayscale"
          />
        </div>

        <div className="relative flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {content.columns.map((paragraphs, i) => (
              <div
                key={i}
                className="space-y-6 text-[15px] leading-relaxed text-[#475467]"
              >
                {paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-10 self-end text-right font-serif text-sm italic text-[#98A2B3]">
            {content.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
