import ContactLinks from "./ContactLinks";
import GlowOrb from "./GlowOrb";

const FooterSection = () => {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden py-10 lg:py-20"
    >
      <div className="relative flex md:flex-row flex-col items-start justify-between px-6 md:px-20">
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
          className="font-signature pointer-events-none absolute inset-x-0 bottom-0 select-none text-center text-[182.08px] leading-[157.6px] font-normal text-[#98A2B3]"
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
