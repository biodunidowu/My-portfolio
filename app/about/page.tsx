import type { Metadata } from "next";
import { ViewTransition } from "react";
import { pageTransition } from "@/lib/transitions";
import { about } from "@/lib/constants/about";
import About from "@/components/about/About";

export const metadata: Metadata = {
  title: "About — Idowu Abiodun",
  description:
    "Product designer working with early-stage teams to take products from idea to MVP.",
};

export default function AboutPage() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="about" className="px-4 md:px-12 py-10 lg:py-12">
        <About content={about} />
      </main>
    </ViewTransition>
  );
}
