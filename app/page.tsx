import FooterSection from "@/components/core/Footer";
import Header from "@/components/core/Header";
import ProfileShowcase from "@/components/home/ProfileShowcase";
import WorksMarquee from "@/components/home/WorksMarquee";

export default function Home() {
  return (
    <main id="home" className="bg-[#F9FAFB]">
      <Header />
      <WorksMarquee />
      <ProfileShowcase />
      <FooterSection />
    </main>
  );
}
