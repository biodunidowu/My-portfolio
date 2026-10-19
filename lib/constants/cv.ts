// CV content, from the Google Doc (October 2026). Wording and facts are the
// doc's; only casing, spacing and date formats are tidied.

export const CV_PDF = "/cv/idowu-abiodun-cv.pdf";

export type CvRole = {
  company: string;
  /** Location / extra context shown after the company name. */
  place?: string;
  title: string;
  /** Employment type and setup, e.g. "Contract · Remote". */
  terms: string;
  dates?: string;
  points: string[];
};

export const cv = {
  name: "Idowu Abiodun",
  role: "Product Designer",
  links: [
    { label: "biodunidowu.xyz", href: "https://www.biodunidowu.xyz" },
    { label: "heyyabiodun@gmail.com", href: "mailto:heyyabiodun@gmail.com" },
    {
      label: "linkedin.com/in/idowuabiodun2000",
      href: "https://www.linkedin.com/in/idowuabiodun2000",
    },
  ],
  summary:
    "Product Designer with 5+ years of experience designing fintech, HR SaaS, and Ed-tech products across mobile, web, and admin platforms. Strong background in end-to-end product design, from research and ideation to high‑fidelity design and handoff. Previously led design on a crypto exchange platform with 10,000+ users and over ₦2.5B in processed transactions, as well as HR products supporting payroll and employee management. Passionate about creating scalable, user‑centric solutions that drive business impact.",
  experience: [
    {
      company: "Celler",
      title: "Product Designer",
      terms: "Contract · Remote",
      dates: "Jan 2026 – Feb 2026",
      points: [
        "Contributed to the V2 redesign of a crypto product, improving overall usability and feature clarity.",
        "Designed a new Swap feature, enabling users to seamlessly exchange crypto assets within the app.",
        "Delivered end-to-end design artifacts including user flows, wireframes, and high-fidelity UI for rapid development.",
        "Collaborated with developers and product stakeholders to ship features that successfully launched to live users.",
      ],
    },
    {
      company: "Daba Group",
      place: "Cwito, TeachWithDaba, Valo AI",
      title: "Lead Product Designer",
      terms: "Full-time · Remote",
      dates: "Feb 2025 – Jan 2026",
      points: [
        "Led end-to-end product design across multiple fintech and ed‑tech products, including Cwito, a crypto exchange platform with 10,000+ users and ₦2.5B+ in processed transactions.",
        "Designed experiences across mobile apps, web apps, and admin dashboards, ensuring usability and design consistency at scale.",
        "Redesigned and revamped the Buy & Sell flow to support newly added crypto assets, improving scalability and ease of use.",
        "Designed the Reward Center to drive user engagement and retention through in‑app incentives.",
        "Designed the Utility Center, enabling users to purchase airtime, data, and other services within the platform.",
        "Optimized the checkout flow for the SBT Trading Course, a core revenue‑generating product, improving purchase completion and supporting sustained business operations.",
        "Collaborated closely with developers, product managers, and other stakeholders to translate product requirements into intuitive design solutions.",
      ],
    },
    {
      company: "E-Metrics Suite",
      place: "Dallas, Texas, USA",
      title: "Product Designer",
      terms: "Contract · Remote",
      dates: "Aug 2025 – Oct 2025",
      points: [
        "Worked on E‑Metric Suites, an HR SaaS platform enabling organizations to manage payroll, leave, and employee operations.",
        "Designed core features including Payroll Management and Leave Management, focusing on clarity, usability, and compliance‑friendly workflows.",
        "Designed the user onboarding flow to improve adoption for both employers and employees.",
        "Created role‑based experiences across Employer and Employee dashboards.",
        "Contributed to Sequential Job, a related recruitment product, by designing the landing page to improve job discovery and search experience.",
        "Delivered wireframes, user flows, and high‑fidelity designs to support rapid iteration.",
      ],
    },
    {
      company: "Yougazine",
      place: "Canada",
      title: "UI/UX Designer",
      terms: "Contract · Remote",
      dates: "Oct 2024 – Dec 2024",
      points: [
        "Led design for the company’s flipbook website interface, collaborating with senior designers, product managers, and developers.",
        "Optimized the checkout experience, achieving a 25% reduction in checkout abandonment.",
        "Applied user‑centered design principles to enhance digital magazine personalization.",
      ],
    },
    {
      company: "Rayna UI",
      place: "Lagos, Nigeria",
      title: "Web Designer",
      terms: "Contract · Remote",
      dates: "Dec 2023 – Jun 2024",
      points: [
        "Contributed to the design and launch of Design System V2, improving consistency across products.",
        "Designed wireframes and content strategy for industry‑specific landing pages.",
        "Collaborated with designers to establish reusable design patterns across multiple sectors.",
      ],
    },
    {
      company: "Taojaa",
      place: "Lagos, Nigeria",
      title: "Junior Product Designer",
      terms: "Full-time · Remote",
      dates: "May 2023 – Apr 2024",
      points: [
        "Optimized the user onboarding experience, contributing to 250+ user signups during product launch.",
        "Conducted user research and usability testing to validate design decisions.",
        "Created interactive prototypes and wireframes to support iterative development.",
      ],
    },
    {
      company: "Fast Link Logistics",
      title: "Graphics Designer",
      terms: "Contract · Remote",
      points: [
        "Led a complete brand identity redesign, contributing to a 15% increase in sales.",
        "Improved social media engagement from 5% to 20% through strategic visual content.",
        "Managed design projects from concept to delivery.",
      ],
    },
  ] satisfies CvRole[],
  skills: [
    {
      label: "Design tools",
      value: "Rive, Figma, Figma Make, Framer, Adobe Photoshop",
    },
    {
      label: "Research & testing",
      value: "A/B testing, usability testing, qualitative research, quantitative research",
    },
    {
      label: "Design & prototyping",
      value: "Design systems, website design in Framer, Rive",
    },
  ],
  certifications: [
    { name: "Practical User Research and Masterclass course", issuer: "Designership", year: "2025" },
    { name: "Ultimate Figma Masterclass 2.0", issuer: "Designership", year: "2025" },
    { name: "UX Design", issuer: "Udemy", year: "2022" },
    { name: "UX Strategy", issuer: "Udemy", year: "2022" },
  ],
  education: {
    school: "University of Ilorin",
    place: "Kwara State, Nigeria",
    degree: "Bachelor of Education — History and Education",
    detail: "Second Class Honours",
    date: "Dec 2022",
  },
};
