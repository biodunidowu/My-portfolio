import { contactLinks } from "@/lib/constants/contact";

export default function ContactLinks() {
  return (
    <ul className="space-y-3 text-right text-xs font-medium uppercase tracking-wide text-black">
      {contactLinks.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}.
          </a>
        </li>
      ))}
    </ul>
  );
}
