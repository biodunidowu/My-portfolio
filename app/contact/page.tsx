import type { Metadata } from "next";
import { ViewTransition } from "react";
import ContactLinks from "@/components/core/ContactLinks";
import CopyEmail from "@/components/home/CopyEmail";
import { pageTransition } from "@/lib/transitions";
import FooterSection from "@/components/core/Footer";

export const metadata: Metadata = {
  title: "Contact — Idowu Abiodun",
  description: "Get in touch about product design work, contracts or a call.",
};

export default function ContactPage() {
  return (
    <ViewTransition {...pageTransition}>
      <main className="relative p-9">
        <div
          aria-hidden
          className="fixed inset-0 z-0 bg-[url(/images/contact-bg.jpg)] bg-cover bg-center"
        />
        <FooterSection />
      </main>
    </ViewTransition>
  );
}
