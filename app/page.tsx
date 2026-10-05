import { ViewTransition } from "react";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";
import { pageTransition } from "@/lib/transitions";
import FooterSection from "@/components/core/Footer";

export default function Home() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="home">
        <WorksMarquee />
        <ProfileShowcase />
      </main>

      <FooterSection />
    </ViewTransition>
  );
}