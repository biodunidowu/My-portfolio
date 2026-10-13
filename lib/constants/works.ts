type Size = { width: number; height: number };

export type Work = {
  id: number;
  title: string;
  /** Foreground shot, centred on the card. */
  src: string;
  /** Painting behind the shot; decorative. */
  backgroundSrc: string;
  /** Rendered size of the shot on a 344×264 card (below md). */
  mobile: Size;
  /** Rendered size of the shot on a 464×457 card (md and up). */
  desktop: Size;
  /** Extra treatment for shots that are UI cards or phone frames. */
  frame?: "shadow" | "rounded";
  /** Position in the mobile carousel when it differs from desktop. */
  mobileOrder?: number;
  /**
   * Animated shot. Served as-is: the image optimizer re-encodes to a single
   * still frame, so these files are pre-compressed instead.
   */
  animated?: boolean;
};

export const works: Work[] = [
  {
    id: 1,
    title: "Event poster with a sunburst headdress on a green gradient",
    src: "/images/home/work-1.webp",
    backgroundSrc: "/images/home/work-1-bg.webp",
    mobile: { width: 193, height: 242 },
    desktop: { width: 328, height: 410 },
  },
  {
    id: 2,
    title: "Gauntlet X vehicle stats screen from a game interface",
    src: "/images/home/work-2.webp",
    backgroundSrc: "/images/home/work-2-bg.webp",
    mobile: { width: 295, height: 210 },
    desktop: { width: 444, height: 316 },
  },
  {
    id: 3,
    title: "Flagged-transaction summary card from a fraud monitoring dashboard",
    src: "/images/home/work-3.webp",
    backgroundSrc: "/images/home/work-3-bg.webp",
    mobile: { width: 197, height: 190 },
    desktop: { width: 266, height: 257 },
    frame: "shadow",
    mobileOrder: 4,
  },
  {
    id: 4,
    title: "Skill tree screen from a game interface",
    src: "/images/home/work-4.webp",
    backgroundSrc: "/images/home/work-4-bg.webp",
    mobile: { width: 320, height: 200 },
    desktop: { width: 445, height: 279 },
    mobileOrder: 3,
  },
  {
    id: 5,
    title: "Animated “Gauntlet” poster with a wireframe vehicle render",
    src: "/images/home/work-5.webp",
    animated: true,
    backgroundSrc: "/images/home/work-5-bg.webp",
    mobile: { width: 185, height: 232 },
    desktop: { width: 324, height: 405 },
  },
  {
    id: 6,
    title: "Aircraft scan screen from a sci-fi game HUD",
    src: "/images/home/work-6.webp",
    backgroundSrc: "/images/home/work-6-bg.webp",
    mobile: { width: 300, height: 170 },
    desktop: { width: 419, height: 237 },
  },
  {
    id: 7,
    title: "Player profile screen from a mobile gaming app",
    src: "/images/home/work-7.webp",
    backgroundSrc: "/images/home/work-7-bg.webp",
    mobile: { width: 103, height: 223 },
    desktop: { width: 181, height: 390 },
    frame: "rounded",
  },
];

export type CaseStudySection =
  | { type: "paragraph"; heading?: string; body: string }
  | { type: "list"; heading?: string; items: string[] }
  | { type: "status"; label: string }
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

export function getSiblingSlugs(slug: string) {
  const index = caseStudies.findIndex((cs) => cs.slug === slug);
  if (index === -1) return { prevSlug: undefined, nextSlug: undefined };

  const last = caseStudies.length - 1;
  return {
    prevSlug: caseStudies[index === 0 ? last : index - 1].slug,
    nextSlug: caseStudies[index === last ? 0 : index + 1].slug,
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "cwito",
    brand: {
      name: "Cwito",
      logoSrc: "/images/cwito-logo.svg",
      role: "Product Designer (Full-time)",
    },
    visual: {
      backgroundSrc: "/images/case-cwito.svg",
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
        href: "https://www.cwito.com/",
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

  {
    slug: "tawq",
    brand: {
      name: "Tawq",
      logoSrc: "/images/tawq-logo.svg",
      role: "Product Designer (Contract)",
    },
    visual: {
      backgroundSrc: "/images/case-tawq.svg",
    },
    sections: [
      {
        type: "paragraph",
        heading: "Overview",
        body: "Tawq is an e-bike battery subscription and swapping platform. Riders pay a subscription fee and swap depleted batteries for charged ones at network stations instead of owning and charging one themselves. I joined to design across mobile, admin, and customer-facing surfaces for a platform now in production.",
      },
      {
        type: "paragraph",
        heading: "The Problem",
        body: "Market research and the business model were already defined before I joined. The challenge was translating a new hardware-connected model — batteries, IoT-enabled bikes, physical swap stations — into interfaces that felt simple for everyday riders and gave admins real-time control over a live fleet.",
      },
      {
        type: "list",
        heading: "Scope of Work",
        items: [
          "Users Mobile App: Battery status and range estimator, swap station map with live inventory, dual-wallet system (active balance + collateral), and the end-to-end battery swap flow.",
          "Admin Dashboard: Fleet metrics, rider and wallet oversight, live GPS asset tracking, and swap station monitoring.",
          "Customer Dashboard: Telemetry view for fleet-partner clients to track their assigned bikes and usage.",
        ],
      },
      {
        type: "paragraph",
        heading: "Learnings and Takeaways",
        body: "This was my first project designing for a real-time, hardware-connected system, figuring out how to make battery health instantly trustworthy for a rider, and remote actions (like disabling a bike) feel deliberate rather than risky for admins. Designing three interconnected surfaces on a two-month timeline also sharpened how I keep consistency across very different user types.",
      },
      {
        type: "status",
        label: "Status: Currently in Development",
      },
    ],
  },

  {
    slug: "rhoblo",
    brand: {
      name: "Rhoblo",
      logoSrc: "/images/rhoblo-logo.svg",
      role: "Product Designer (Contract)",
    },
    visual: {
      backgroundSrc: "/images/case-rhoblo.svg",
    },
    sections: [
      {
        type: "paragraph",
        heading: "Overview",
        body: "Rhoblo is a food and grocery delivery platform, recently launched in Uyo, Akwa Ibom. It connects customers, local vendors, and riders on one platform covering everything from restaurant orders to grocery delivery with real-time tracking. I designed the entire product end-to-end: landing page, customer app, rider app, vendor dashboard, and admin dashboard.",
      },
      {
        type: "paragraph",
        heading: "The Problem",
        body: "As a ground-up build, the challenge was designing four distinct, interconnected experiences — customer, vendor, rider, and admin — that each needed to feel simple on their own while working together as one coherent system, ahead of a real market launch in Uyo.",
      },
      {
        type: "list",
        heading: "Scope of Work",
        items: [
          "Customer App: Vendor and dish browsing, ordering and checkout, live order and rider tracking.",
          "Rider App: Order pickups, delivery flow, and earnings/payout tracking.",
          "Vendor Dashboard: Menu management, order handling, and performance analytics.",
          "Admin Dashboard: Platform-wide oversight across users, vendors, and orders.",
          "Landing Page: Marketing site for the Uyo launch, with role-segmented sign-up flows for customers, vendors, and riders.",
        ],
      },
      {
        type: "paragraph",
        heading: "Impact",
        body: "Rhoblo is live and operating in Uyo. Early feedback from the founding team has been positive since launch.",
      },
      {
        type: "liveLink",
        label: "Live Link",
        href: "https://rhoblo.example.com",
      },
    ],
  },

  {
    slug: "celler",
    brand: {
      name: "Celler",
      logoSrc: "/images/celler-logo.svg",
      role: "Product Designer (Contract)",
    },
    visual: {
      backgroundSrc: "/images/case-celler.svg",
    },
    sections: [
      {
        type: "paragraph",
        heading: "Overview",
        body: "Celler is a crypto wallet platform that lets users hold, send, and manage multiple digital assets in one place. The team was preparing to release V2 — a significant upgrade to the existing product — and brought me on as a contract designer to lead the redesign.",
      },
      {
        type: "paragraph",
        heading: "The Problem",
        body: "The team needed a V2 that felt more modern and capable than the existing product, but had a tight deadline to hit. There was no room for a long discovery phase — the challenge was translating a clear set of goals into shipped, polished screens quickly, without the redesign feeling rushed or inconsistent.",
      },
      {
        type: "list",
        heading: "Scope of Work",
        items: [
          "Redesigned the core wallet experience — home screen, balances, and transaction flows for V2.",
          "Introduced a swap feature, letting users convert directly between assets (e.g. BTC to USDT) within the app, a capability the previous version lacked.",
          "Extended the design to a web app version, ensuring consistency across mobile and desktop.",
          "Worked within a dark-themed UI system, balancing dense financial data (multiple assets, live rates, balances) with clarity and visual hierarchy.",
        ],
      },
      {
        type: "paragraph",
        heading: "Impact",
        body: "While the engagement was short-term and I don't have platform-wide metrics to share, the V2 shipped successfully within the deadline — covering mobile, web, and marketing surfaces in a single fast-paced cycle. The swap feature in particular filled a functional gap in the original product, giving users a reason to manage multiple assets in one place rather than moving between apps.",
      },
      {
        type: "liveLink",
        label: "Live Link",
        href: "https://celler.example.com",
      },
    ],
  },
];
