export type Experience = {
  company: string;
  period: string;
  /** Bullet copy; `**bold**` marks key figures. */
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Cwito",
    period: "Feb 2025 – Jan 2026",
    points: [
      "Led end-to-end product design across multiple fintech and ed-tech products, including Cwito, a crypto exchange platform with **10,000+** users and **₦2.5B+** in processed transactions.",
    ],
  },
  {
    company: "Useceller",
    period: "Jan 2026 – Feb 2026",
    points: [
      "Contributed to the V2 redesign of a crypto product, improving overall usability and feature clarity.",
      "Designed a new Swap feature, enabling users to seamlessly exchange crypto assets within the app.",
    ],
  },
];
