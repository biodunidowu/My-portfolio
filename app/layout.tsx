import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  antonCore,
  antonExt,
  meowScriptCore,
  meowScriptExt,
  splineSansCore,
  splineSansExt,
} from "./fonts/subset";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/core/Header";

// Spline Sans (site text), Anton (footer type toy, 404) and Meow Script are
// subset by scripts/subset-fonts.mjs; their family stacks are in globals.css.
// The rest ship as downloaded: their licences don't allow modified copies.

// About page movie quote. Telma by Indian Type Foundry, from Fontshare.
// Not preloaded: it's on one page, and a preload here would load it on all
// of them (Next also preloads the fonts of every route it prefetches).
const telma = localFont({
  src: "./fonts/Telma-Light.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
  variable: "--font-quote",
});

// Older case-study pages (Back / Next project). Not preloaded, as above.
const noodle = localFont({
  src: "./fonts/BigNoodleTitling-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
  variable: "--font-noodle",
});

const calloveya = localFont({
  src: "./fonts/Calloveya-Regular.woff",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Brush Script MT", "Segoe Script", "cursive"],
  variable: "--font-signature",
});

// Not on any page today, so not preloaded.
const canterbury = localFont({
  src: "./fonts/Canterbury.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: false,
  fallback: ["Old English Text MT", "serif"],
  variable: "--font-blackletter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.biodunidowu.xyz"),
  title: "Idowu Abiodun — Product Designer",
  description:
    "Product designer working on crypto and fintech products. Selected case studies and explorations.",
};

// Phone status bar / browser chrome colour: the header's surface per scheme.
// A saved light/dark choice overrides the OS: themeScript / ThemeSwitch put
// their own tag first in <head> (browsers use the first match), leaving these
// React-managed tags untouched.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const themeScript = `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";if(t==="light"||t==="dark"){var m=document.createElement("meta");m.name="theme-color";m.id="theme-color-choice";m.content=t==="dark"?"#000000":"#ffffff";document.head.prepend(m)}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-motion-mode="expressive"
      className={cn(
        "h-full",
        "antialiased",
        splineSansCore.variable,
        splineSansExt.variable,
        antonCore.variable,
        antonExt.variable,
        meowScriptCore.variable,
        meowScriptExt.variable,
        calloveya.variable,
        canterbury.variable,
        telma.variable,
        noodle.variable,
        "font-sans",
      )}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint: saved choice, else the OS setting. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-page">
        <Header />
        {children}
      </body>
    </html>
  );
}
