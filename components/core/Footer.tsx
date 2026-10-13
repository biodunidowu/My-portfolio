import Image from "next/image";
import { BOOKING_URL } from "@/lib/constants/contact";
import ContactLinks from "./ContactLinks";
import Reveal from "./Reveal";

// Vertical grid lines: px offsets on the 1440 desktop layout, percentages
// of the 390 mobile frame below xl.
const desktopLines = [
  "left-30",
  "left-92",
  "left-178",
  "left-[1084px]",
  "right-[39px]",
];
const mobileLines = ["left-[19%]", "left-[51%]", "left-[75.6%]"];

const FooterSection = () => {
  return (
    <footer className="relative z-10 h-166.5 overflow-hidden bg-[#F9FAFB] xl:h-192">
      {desktopLines.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 hidden w-px bg-[#EAECF0] xl:block ${position}`}
        />
      ))}
      {mobileLines.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 w-px bg-[#EAECF0] xl:hidden ${position}`}
        />
      ))}

      <Image
        src="/images/home/footer-glow.webp"
        alt=""
        width={1024}
        height={352}
        className="pointer-events-none absolute top-79.75 left-0 h-100.5 w-166 max-w-none md:w-full object-cover mix-blend-multiply [mask-image:linear-gradient(to_bottom,transparent,black_30%)] xl:top-68.25 xl:h-123.75 xl:w-full"
      />

      <div className="relative flex flex-col items-start gap-2.5 px-4 pt-20 md:flex-row md:justify-between md:px-12.5 md:pt-25">
        <div className="flex flex-col items-start gap-4 xl:gap-3">
          <h2 className="text-2xl leading-8 font-medium tracking-[-0.02em] text-black xl:text-[28px] xl:leading-9">
            Let&apos;s start a conversation
            <br aria-hidden />
            about your project.
          </h2>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border-b border-[#EAECF0] bg-white px-3 py-4 text-base leading-5 font-medium text-[#101828] uppercase underline transition-[opacity,scale] duration-160 ease-out hover:opacity-70 active:scale-97"
          >
            Book a call
          </a>
        </div>

        <div className="mt-10 w-full md:mt-0 md:w-auto">
          <ContactLinks />
        </div>
      </div>

      <Reveal
        aria-hidden
        className="reveal font-blackletter pointer-events-none absolute inset-x-4 top-96.5 text-center text-[26.6vw] leading-[1.162] text-black select-none md:top-auto md:bottom-28 md:text-[min(16vw,230px)] md:leading-[0.788]"
      >
        Idowu <br className="md:hidden" />
        Abiodun
      </Reveal>

      <span className="sr-only">Idowu Abiodun</span>
    </footer>
  );
};

export default FooterSection;
