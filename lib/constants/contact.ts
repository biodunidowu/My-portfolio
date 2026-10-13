export type ContactLink = {
  label: string;
  href: string;
};

export const EMAIL = "heyyabiodun@gmail.com";
export const BOOKING_URL = "https://cal.com/biodunidowu/30min";
export const CV_URL =
  "https://docs.google.com/document/d/1kerR_LcViU8K9OSw-9iKTrx8n-uB-KYccAFp5dKL9ow/edit?usp=sharing";

export const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "Instagram", href: "https://www.instagram.com/_biodunidowu" },
  { label: "X.com", href: "https://x.com/_biodunidowu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/idowuabiodun2000" },
];
