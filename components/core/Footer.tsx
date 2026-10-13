import { BOOKING_URL } from "@/lib/constants/contact";
import ContactLinks from "./ContactLinks";
import TypeToy from "./TypeToy";

const FooterSection = () => {
  return (
    <footer className="relative z-10 flex flex-col gap-4 bg-page px-4 py-8 md:h-192 md:px-12.5 md:py-20">
      <div className="flex flex-col items-start gap-14.25 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start gap-3">
          <h2 className="max-w-92.5 font-mono text-[28px] leading-9 font-medium tracking-[-0.56px] text-fg md:tracking-normal">
            Let&apos;s start a conversation
            <br aria-hidden />
            about your project.
          </h2>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border-b border-line bg-surface px-3 py-4 font-mono text-base leading-5 font-medium text-fg uppercase underline transition-[opacity,scale] duration-160 ease-out hover:opacity-70 active:scale-97"
          >
            Book a call
          </a>
        </div>

        <ContactLinks />
      </div>

      <TypeToy className="h-100 md:h-auto md:min-h-0 md:flex-1" />

      <p className="font-mono text-sm leading-5 font-medium text-fg">
        © 2026— with love, caffeine and tokens :)
      </p>
    </footer>
  );
};

export default FooterSection;
