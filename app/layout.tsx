import type { Metadata } from "next";
import {
  Anton,
  Geist,
  Geist_Mono,
  Meow_Script,
  Spline_Sans,
  Spline_Sans_Mono,
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

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-spline-mono",
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
  title: "Idowu Abiodun — Product Designer",
  description:
    "Product designer working on crypto and fintech products. Selected case studies and explorations.",
};

const themeScript = `(function(){var t=null;try{t=localStorage.getItem("theme")}catch(e){}document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"})()`;

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
        splineSansMono.variable,
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
