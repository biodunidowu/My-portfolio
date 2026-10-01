import { contactLinks } from "@/lib/constants/contact";

export default function ContactLinks() {
  return (
    <div className="flex md:flex-col flex-row space-y-3 text-xs font-medium uppercase tracking-wide text-black w-ful">
      {contactLinks.map((link) => (
        <span key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}.
          </a>
        </span>
      ))}
    </div>
  );
}
