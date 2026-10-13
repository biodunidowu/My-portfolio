import { ViewTransition } from "react";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";
import { pageTransition } from "@/lib/transitions";
import FooterSection from "@/components/core/Footer";
import HatchBand from "@/components/core/HatchBand";

export default function Home() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="home" className="relative overflow-x-clip">
        <HatchBand className="mt-5.75 md:mt-6.5" />
        <WorksMarquee />
        <ProfileShowcase />
      </main>

      <FooterSection />
    </ViewTransition>
  );
}
