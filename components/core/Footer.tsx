import type { ReactNode } from "react";
import Link from "next/link";
import { BOOKING_URL, EMAIL, contactLinks } from "@/lib/constants/contact";
import { navLinks } from "@/lib/constants/navigation";
import { forwardNav } from "@/lib/transitions";
import CopyEmail from "@/components/home/CopyEmail";
import BackToTop from "./BackToTop";
import TypeToy from "./TypeToy";

const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));

const label = "font-mono text-[11px] leading-4 tracking-[-0.22px] text-fg-3 uppercase";

const linkClass =
  "group inline-flex items-center gap-1.5 font-mono text-sm leading-5 font-medium text-fg uppercase transition-opacity duration-200 hover:opacity-60";

function Column({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <nav aria-label={title} className={className}>
      <h3 className={`${label} border-b border-line pb-2`}>{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </nav>
  );
}

const FooterSection = () => {
  return (
    <footer className="relative z-10 border-t border-line bg-page">
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 px-4 pt-10 pb-10 md:grid-cols-12 md:px-12.5 md:pt-16 md:pb-14">
        <div className="col-span-2 flex flex-col items-start gap-6 md:col-span-6 xl:col-span-7">
          <p className={label}>( Get in touch )</p>
          <h2 className="max-w-115 font-mono text-[28px] leading-9 font-medium tracking-[-0.56px] text-fg md:text-[32px] md:leading-10 md:tracking-[-0.64px]">
            Let&apos;s start a conversation about your project.
          </h2>
          <div className="flex flex-col items-start gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-fg px-4 py-3 font-mono text-sm leading-5 font-medium text-on-fg uppercase transition-[opacity,scale] duration-160 ease-out hover:opacity-85 active:scale-97"
            >
              Book a call
              <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </a>
            <div className="-ml-3">
              <CopyEmail email={EMAIL} />
            </div>
          </div>
        </div>

        <Column title="Social" className="md:col-span-3 xl:col-span-2 xl:col-start-9">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                {link.label}
                <span aria-hidden className="text-fg-muted transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </Column>

        <Column title="Index" className="md:col-span-3 xl:col-span-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} transitionTypes={[...forwardNav]} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </Column>
      </div>

      <div className="px-4 md:px-12.5">
        <div className="border border-line">
          <div className={`${label} flex items-center justify-between border-b border-line px-3 py-2`}>
            <span>Playground — type toy</span>
            <span aria-hidden>Click &amp; type</span>
          </div>
          <TypeToy className="h-80 md:h-110" />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-line px-4 py-5 font-mono text-xs leading-5 font-medium text-fg-3 sm:flex-row sm:items-center sm:justify-between md:mt-14 md:px-12.5">
        <p>© 2026— with love, caffeine and tokens :)</p>
        <BackToTop className="self-start sm:self-auto" />
      </div>
    </footer>
  );
};

export default FooterSection;
