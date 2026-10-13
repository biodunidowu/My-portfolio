import { ViewTransition } from "react";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";
import { pageTransition } from "@/lib/transitions";
import FooterSection from "@/components/core/Footer";

export default function Home() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="home" className="relative">
        {/* Desktop grid lines framing the video column. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-30 hidden w-px bg-[#EAECF0] xl:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-178 hidden w-px bg-[#EAECF0] xl:block"
        />

        <WorksMarquee />
        <ProfileShowcase />
      </main>

      <FooterSection />
    </ViewTransition>
  );
}
