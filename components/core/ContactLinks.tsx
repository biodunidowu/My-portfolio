import type { CSSProperties } from "react";
import { contactLinks } from "@/lib/constants/contact";

// The mobile design lists X last; desktop keeps the source order.
const mobileLast = "X.com";

export default function ContactLinks() {
  return (
    <ul className="flex w-full flex-row justify-between gap-3 text-xs leading-5 font-medium text-black uppercase md:w-73.75 md:flex-col">
      {contactLinks.map((link, index) => {
        const external = link.href.startsWith("http");
        const order = {
          "--order": link.label === mobileLast ? contactLinks.length : index,
          "--md-order": index,
        } as CSSProperties;

        return (
          <li
            key={link.label}
            style={order}
            className="order-(--order) md:order-(--md-order)"
          >
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
