import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact me", href: "#contact" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-(--color-line) px-6 py-4 md:px-10">
      <a href="#home" className="flex items-center gap-3">
        <Image
          src="/avatar.jpg"
          alt="Abiodun"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover"
        />

        <span
          className="text-2xl leading-none"
          style={{ fontFamily: "var(--font-script)" }}
        >
          Abiodun
        </span>
      </a>

      <nav className="hidden items-center gap-10 text-sm font-medium md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-(--color-muted) transition-colors hover:text-(--color-text)"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        pad
        <span className="inline-flex items-center gap-2 rounded-full border border-(--color-line) px-4 py-2 text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-(--color-accent)" />
          Open to work
        </span>
      </div>
    </header>
  );
}
