import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { experience } from "@/lib/constants/experience";
import ExperienceItem from "@/components/home/ExperienceItem";
import { pageTransition } from "@/lib/transitions";

export const metadata: Metadata = {
  title: "About — Idowu Abiodun",
  description:
    "Product designer working with early-stage teams to take products from idea to MVP.",
};

export default function AboutPage() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="about" className="px-4 md:px-12 py-10 lg:py-16">
        <div className="max-w-3xl space-y-8">
          <h1 className="font-noodle text-4xl md:text-5xl uppercase">
            About me
          </h1>

          <div className="space-y-4 leading-relaxed text-[#475467]">
            <p className="text-lg text-[#101828] leading-snug">
              Hey I&apos;m Abiodun, a <strong>Product Designer</strong> and{" "}
              <strong>tinkerer.</strong>
            </p>

            <p className="text-[15px]">
              I help startups go from idea to MVP. Over the past 5 years,
              I&apos;ve led research and product strategy across multiple
              early-stage teams, working closely with founders to design and
              ship products people actually use.
            </p>

            <p className="text-[15px]">
              Most of my work lives in fintech and crypto — payments, wallets,
              exchanges and the growth systems around them. I care about the
              unglamorous parts: de-risking a feature before the design effort
              goes in, and measuring whether it actually moved anything.
            </p>
          </div>

          <div className="pt-6">
            <Link
              href="/works"
              transitionTypes={["nav-forward"]}
              className="rounded-[12px] shadow-sm bg-white px-5 py-4 font-medium uppercase underline underline-offset-2 transition-opacity hover:opacity-70 font-noodle text-2xl"
            >
              See my work
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-3xl space-y-6">
          <span className="uppercase text-[#101828] md:font-medium">
            Experience
          </span>

          {experience.map((item) => (
            <ExperienceItem key={item.company} {...item} />
          ))}
        </div>
      </main>
    </ViewTransition>
  );
}