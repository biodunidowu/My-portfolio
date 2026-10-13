export type AboutProject = { name: string; href: string };

export type AboutContent = {
  photoSrc: string;
  photoAlt: string;
  /** Two prose columns, each a list of paragraphs. */
  columns: string[][];
  tinkerIntro: string;
  projects: AboutProject[];
  /** First quote shown; hovering cycles through the rest. */
  quotes: string[];
};

export const about: AboutContent = {
  photoSrc: "/images/about/portrait.webp",
  photoAlt: "Abiodun taking a mirror selfie beside a glass-block window",
  columns: [
    [
      "I specialize in taking loosely defined ideas from founders and product managers and shaping them into clear, actionable product direction.",
      "I work through research, structured thinking, and design execution to get real products in front of early adopters — whether that means untangling a vague brief, mapping out user flows from scratch, or designing across mobile, web, and admin surfaces for the same product.",
      "Outside of work, I'm mostly indoors — catching up on movies and anime (I've watched a lot, but somehow still don't have a favorite), or falling down a YouTube rabbit hole of food and travel videos.",
    ],
    [
      "I've also picked up a slightly random hobby: learning the capital city of every country, one fact at a time. I'm nowhere near done, but I like collecting the surprising ones. (Did you know Brazil's capital isn't Rio? It's Brasília.)",
    ],
  ],
  tinkerIntro:
    "I told you earlier I'm a tinkerer too. Here are some things I've built:",
  projects: [
    { name: "TypeWarp", href: "https://typewarp.vercel.app/" },
    {
      name: "Image Effects Playground",
      href: "https://image-effects-playground.vercel.app/",
    },
    { name: "QuoteRush", href: "https://quoterush.vercel.app/" },
  ],
  quotes: [
    "The force is with me and I'm one with the force.",
    "To infinity and beyond!",
    "I'll be back.",
    "Why so serious?",
    "Just keep swimming.",
    "Houston, we have a problem.",
    "Life finds a way.",
    "I am inevitable.",
  ],
};
