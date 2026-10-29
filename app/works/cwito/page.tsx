import type { Metadata } from "next";
import { ViewTransition } from "react";
import FooterSection from "@/components/core/Footer";
import CwitoCaseStudy from "@/components/works/case/CwitoCaseStudy";
import { cwitoCaseStudy } from "@/lib/constants/cwitoCaseStudy";
import { pageTransition } from "@/lib/transitions";

export const metadata: Metadata = {
  title: "Cwito Reward Center — Case study — Idowu Abiodun",
  description: cwitoCaseStudy.intro,
};

export default function Page() {
  return (
    <ViewTransition {...pageTransition}>
      <main className="overflow-x-clip">
        <CwitoCaseStudy />
      </main>
      <FooterSection />
    </ViewTransition>
  );
}
