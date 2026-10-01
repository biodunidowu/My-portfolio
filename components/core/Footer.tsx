import React from "react";
import GridLines from "./GridLines";
import ContactLinks from "./ContactLinks";
import GlowOrb from "./GlowOrb";

const FooterSection = () => {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-(--color-bg) py-20"
    >
      <div className="relative mx-auto flex max-w-6xl items-start justify-between px-6">
        <div>
          <h2 className="max-w-sm text-3xl font-medium mb-10">
            Let&apos;s start a conversation about your project.
          </h2>

          <a
            href="#book-a-call"
            className="rounded-[12px] shadow-sm bg-white px-3 py-5.5 font-medium uppercase underline underline-offset-2 transition-opacity hover:opacity-70 font-noodle text-2xl"
          >
            Book a call
          </a>
        </div>

        <ContactLinks />
      </div>

      <div className="relative mt-16 h-80">
        <GlowOrb />

        <p
          aria-hidden
          className="font-signature pointer-events-none absolute inset-x-0 bottom-0 select-none text-center text-[6rem] leading-none text-(--color-text) opacity-20 sm:text-[8rem]"
        >
          Idowu Abiodun
        </p>

        {/* Accessible, visible text for screen readers / SEO since the
            script rendering above is decorative and marked aria-hidden. */}
        <span className="sr-only">Idowu Abiodun</span>
      </div>
    </footer>
  );
};

export default FooterSection;
