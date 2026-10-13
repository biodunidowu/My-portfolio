import { contactLinks } from "@/lib/constants/contact";

export default function ContactLinks() {
  return (
    <ul className="flex flex-row flex-wrap gap-3 font-mono text-xs leading-5 font-medium text-fg uppercase md:w-73.75 md:flex-col">
      {contactLinks.map((link) => {
        const external = link.href.startsWith("http");

        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="transition-opacity hover:opacity-60"
            >
              {link.label}.
            </a>
          </li>
        );
      })}
    </ul>
  );
}
