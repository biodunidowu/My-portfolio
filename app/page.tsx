import Header from "@/components/home/Header";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";

export default function Home() {
  return (
    <main>
      <Header />
      <WorksMarquee />
      <ProfileShowcase />
    </main>
  );
}
