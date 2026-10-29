import { caseStudies } from "./works";

const BASE = "/images/works/cases/";

type Size = { width: number; height: number };

export type CaseCardShot = Size & {
  src: string;
  alt: string;
  /** Corner radius in px, as set per screen in the design. */
  radius: number;
};

export type CaseCardBrand = {
  /** Background of the 42px logo tile. */
  tileColor: string;
  /** Centred in the tile unless `left`/`top` place it explicitly. */
  mark: Size & { src: string; left?: number; top?: number };
  wordmark: Size & { src: string };
  /** Space between the tile and the wordmark. */
  gap: number;
  /** Dark wordmarks are flipped to light (keeping their hue) on dark panels. */
  invertOnDark?: boolean;
};

export type CaseCard = {
  slug: string;
  name: string;
  /** Overview copy; `**bold**` is supported. */
  overview: string;
  backgroundSrc: string;
  /** Optional clip that plays over the background while hovered. */
  backgroundVideoSrc?: string;
  /** Card height on desktop. */
  height: number;
  /** Phone screens (three) or a single desktop preview. */
  shots: CaseCardShot[];
  brand?: CaseCardBrand;
  /** Overview panel height on desktop; brand + copy sit top, button bottom. */
  panelHeight: number;
  panelWidth?: number;
  panelRadius?: number;
  /** Gap between the brand row and the copy. */
  panelGap?: number;
  /** The one screen shown on phones, where the card is single-column. */
  featured?: number;
  shadow?: boolean;
  /**
   * Where "Read Case-study" goes: a site path ("/works/cwito") or a full URL.
   * Leave unset to show "Case-study coming soon" with no link.
   */
  caseStudyHref?: string;
};

function overviewOf(slug: string) {
  const study = caseStudies.find((cs) => cs.slug === slug);
  const section = study?.sections.find(
    (s) => s.type === "paragraph" && s.heading === "Overview",
  );
  return section && section.type === "paragraph" ? section.body : "";
}

const phone = (src: string, alt: string, width: number, height: number, radius = 12) => ({
  src: BASE + src,
  alt,
  width,
  height,
  radius,
});

export const caseCards: CaseCard[] = [
  {
    slug: "cwito",
    name: "Cwito",
    overview: overviewOf("cwito"),
    backgroundSrc: BASE + "cwito-bg.webp",
    backgroundVideoSrc: "/videos/cwito-bg.mp4",
    height: 590,
    shots: [
      phone("cwito-1.webp", "Cwito rewards unlock prompt over the home screen", 246, 533),
      phone("cwito-2.webp", "Cwito home screen with quick actions and bill payments", 246, 533),
      phone("cwito-3.webp", "Cwito Reward Center with cashback and points tasks", 246, 533),
    ],
    brand: {
      tileColor: "#023436",
      mark: { src: BASE + "cwito-icon.svg", width: 18, height: 18 },
      wordmark: { src: BASE + "cwito-wordmark.svg", width: 49, height: 16 },
      gap: 12,
      invertOnDark: true,
    },
    panelHeight: 534,
    panelRadius: 16,
    panelGap: 16,
    featured: 1,
    caseStudyHref: "/works/cwito",
  },
  {
    slug: "gambit",
    name: "Gambit",
    overview:
      "Gambit is a competitive gaming platform built around three core games — **WordQuake**, **Trigon**, and **CG Draw** — designed to bring real-time, skill-based competition to a mobile-first audience.",
    panelHeight: 498,
    featured: 2,
    backgroundSrc: BASE + "gambit-bg.webp",
    height: 546,
    shots: [
      phone("gambit-1.webp", "Gambit daily streak reward prompt", 230, 498),
      phone("gambit-2.webp", "Trigon game options screen", 230, 505),
      phone("gambit-3.webp", "Gambit home screen with daily reward and games", 230, 498),
    ],
    shadow: true,
  },
  {
    slug: "celler",
    name: "Celler",
    overview: overviewOf("celler"),
    backgroundSrc: BASE + "celler-bg.webp",
    height: 538,
    shots: [
      phone("celler-1.webp", "Celler swap crypto screen", 230, 498, 14.76),
      phone("celler-2.webp", "Celler wallet home with total balance", 230, 498, 18.12),
      phone("celler-3.webp", "Celler select coin list", 230, 498, 12.44),
    ],
    brand: {
      tileColor: "#346FFF",
      mark: {
        src: BASE + "celler-logomark.svg",
        width: 18.34,
        height: 26.13,
        left: 10,
        top: 9,
      },
      wordmark: { src: BASE + "celler-wordmark.svg", width: 47, height: 11.05 },
      gap: 8,
    },
    panelHeight: 498,
    featured: 1,
  },
  {
    slug: "rhoblo",
    name: "Rhoblo",
    overview: overviewOf("rhoblo"),
    backgroundSrc: BASE + "rhoblo-bg.webp",
    height: 546,
    shots: [
      {
        src: BASE + "rhoblo-1.webp",
        alt: "Rhoblo vendor dashboard with the Manage Add-ons dialog",
        width: 651,
        height: 463,
        radius: 8,
      },
    ],
    brand: {
      tileColor: "#113E26",
      mark: { src: BASE + "rhoblo-logomark.svg", width: 32, height: 32 },
      wordmark: { src: BASE + "rhoblo-wordmark.svg", width: 78, height: 18 },
      gap: 8,
      invertOnDark: true,
    },
    panelHeight: 462,
  },
  {
    slug: "tawq",
    name: "Tawq",
    overview: overviewOf("tawq"),
    backgroundSrc: BASE + "tawq-bg.webp",
    height: 546,
    shots: [
      {
        src: BASE + "tawq-1.webp",
        alt: "Tawq platform analytics dashboard with revenue trend",
        width: 663,
        height: 471,
        radius: 12,
      },
    ],
    brand: {
      tileColor: "#007754",
      mark: { src: BASE + "tawq-logo.webp", width: 27, height: 27 },
      wordmark: { src: BASE + "tawq-wordmark.webp", width: 57, height: 27 },
      gap: 12,
    },
    panelWidth: 280,
    panelHeight: 462,
  },
];
