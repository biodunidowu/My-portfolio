import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact me", href: "#contact" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#EAECF0] md:px-10">
      <a href="#home" className="flex items-center gap-3">
        <Image
          src="/images/profile-img.svg"
          alt="Abiodun"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full object-cover"
        />

        <span className="font-script text-2xl leading-none text-[#98A2B3]">
          Abiodun
        </span>
      </a>

      <nav className="hidden items-center md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-noodle leading-none tracking-widest border-x border-x-[#EAECF0] py-8 px-20 text-[#9CA3AF] uppercase transition-colors hover:text-black"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <Image
          src="/images/game-pad.svg"
          alt="Abiodun"
          width={24}
          height={24}
        />

        <span className="inline-flex items-center gap-2 bg-[#F9FAFB] px-4 py-3 text-sm font-medium font-noodle">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          Open to work
        </span>
      </div>
    </header>
  );
}
