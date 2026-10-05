import { ViewTransition } from "react";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";
import { pageTransition } from "@/lib/transitions";

export default function Home() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="home">
        <WorksMarquee />
        <ProfileShowcase />
      </main>
    </ViewTransition>
  );
}