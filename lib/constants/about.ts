export type AboutContent = {
  photoSrc: string;
  photoAlt: string;
  columns: string[][];
  caption: string;
};

export const about: AboutContent = {
  photoSrc: "/images/potrait.svg",
  photoAlt: "Abiodun",
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
  caption: "The force is with me and I'm one with the force.",
};
