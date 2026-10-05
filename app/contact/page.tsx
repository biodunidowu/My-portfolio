import type { Metadata } from "next";
import { ViewTransition } from "react";
import ContactLinks from "@/components/core/ContactLinks";
import CopyEmail from "@/components/home/CopyEmail";
import { pageTransition } from "@/lib/transitions";

export const metadata: Metadata = {
  title: "Contact — Idowu Abiodun",
  description: "Get in touch about product design work, contracts or a call.",
};

export default function ContactPage() {
  return (
    <ViewTransition {...pageTransition}>
      <main id="contact" className="px-4 md:px-12 py-10 lg:py-16">
        <div className="max-w-3xl space-y-8">
          <h1 className="font-noodle text-4xl md:text-5xl uppercase">
            Let&apos;s talk
          </h1>

          <p className="text-lg text-[#101828] leading-snug">
            I&apos;m open to product design work, contracts and full-time roles.
          </p>

          <p className="text-[15px] leading-relaxed text-[#475467]">
            The fastest way to reach me is email. I read everything and usually
            reply within a couple of days — tell me about the product, the team,
            and where design is currently the bottleneck.
          </p>

          <CopyEmail email="Abiodunidowu1998@gmail.com" />

          <div className="pt-6">
            <span className="uppercase text-[#101828] md:font-medium">
              Elsewhere
            </span>

            <div className="mt-4">
              <ContactLinks />
            </div>
          </div>
        </div>
      </main>
    </ViewTransition>
  );
}