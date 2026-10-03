export type Work = {
  id: number;
  title: string;
  src: string;
};

export const works: Work[] = [
  { id: 1, title: "Image 1", src: "/images/Frame 15.png" },
  { id: 2, title: "Image 2", src: "/images/Frame 16.png" },
  { id: 3, title: "Image 3", src: "/images/Frame 17.png" },
  { id: 4, title: "Image 4", src: "/images/Frame 18.png" },
  { id: 5, title: "Image 5", src: "/images/Frame 19.png" },
  { id: 6, title: "Image 6", src: "/images/Frame 20.png" },
  { id: 7, title: "Image 7", src: "/images/Frame 21.png" },
  { id: 8, title: "Image 8", src: "/images/Frame 22.png" },
];

export type CaseStudySection =
  | { type: "paragraph"; heading?: string; body: string }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "liveLink"; label: string; href: string };

export type CaseStudy = {
  slug: string;
  brand: {
    name: string;
    logoSrc: string;
    role: string;
  };
  visual: {
    backgroundSrc: string;
  };
  sections: CaseStudySection[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cwito",
    brand: {
      name: "Cwito",
      logoSrc: "/images/case-cwito.png",
      role: "Product Designer (Full-time)",
    },
    visual: {
      backgroundSrc: "/images/case-cwito.png",
    },
    sections: [
      {
        type: "paragraph",
        heading: "Overview",
        body: "Cwito is a crypto trading and bill-payment platform. As part of the core design team, I owned UI across multiple surfaces of the product — from everyday utility features to the systems driving user retention.",
      },
      {
        type: "list",
        heading: "Scope of Work",
        items: [
          "Designed utility features (airtime, data, and other bill payments) to make routine transactions fast and frictionless.",
          "Designed the Reward Center, a growth-focused feature aimed at increasing user engagement and retention.",
          "Contributed to the admin dashboard and web platform, extending the design system beyond mobile.",
        ],
      },
      {
        type: "list",
        heading: "Impact",
        items: [
          "Helped grow the platform to over **10,000** active users.",
          "Contributed to a platform that processed **₦2.5 billion** in transactions.",
        ],
      },
      {
        type: "liveLink",
        label: "Live Link",
        href: "https://cwito.example.com",
      },
      {
        type: "paragraph",
        heading: "Multi-Currency Wallet (A Lesson in Scope)",
        body: "I led the design for a multi-currency wallet feature, intended to let users hold and transact in multiple currencies within the app. Despite solid design execution, the feature didn't gain traction post-launch — a reminder that adoption depends on more than UI: timing, marketing support, and cross-team alignment all matter as much as the design itself.",
      },
      {
        type: "paragraph",
        heading: "What I took from it",
        body: "Design doesn't ship in a vacuum. It sharpened how I think about de-risking features early — pushing for clearer success metrics and go-to-market alignment before investing deep design effort.",
      },
    ],
  },
];
