import type { Metadata, Viewport } from "next";
import {
  Anton,
  Geist,
  Geist_Mono,
  Meow_Script,
  Spline_Sans,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/core/Header";

const splineSans = Spline_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
});

// Footer type toy ("TYPE SOMETHING").
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

// About page movie quote. Telma by Indian Type Foundry, from Fontshare.
const telma = localFont({
  src: "./fonts/Telma-Light.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
  fallback: ["Georgia", "serif"],
  variable: "--font-quote",
});

const noodle = localFont({
  src: "./fonts/BigNoodleTitling-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
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

const canterbury = localFont({
  src: "./fonts/Canterbury.ttf",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Old English Text MT", "serif"],
  variable: "--font-blackletter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const meowScript = Meow_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
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
        geistSans.variable,
        geistMono.variable,
        noodle.variable,
        meowScript.variable,
        splineSans.variable,
        calloveya.variable,
        canterbury.variable,
        anton.variable,
        telma.variable,
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
