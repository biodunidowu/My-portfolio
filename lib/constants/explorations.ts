/** A rectangle on the 678×546 tile, in px. */
type Box = { x: number; y: number; w: number; h: number };

export type ExplorationShot = {
  src: string;
  /** Plays as a muted, looping video instead of a still image. */
  video?: boolean;
  box: Box;
  /**
   * Phone shots are cropped: the image is larger than its box and offset
   * inside it (percentages of the box, from the design).
   */
  crop?: { w: number; h: number; left: number };
};

export type ExplorationTile = {
  backgroundSrc: string;
  /** The painting behind the shot on the exploration's own page, if different. */
  heroBackgroundSrc?: string;
  shots: ExplorationShot[];
};

export type Exploration = {
  id: string;
  title: string;
  category: string;
  /** Paragraphs split on blank lines; **text** renders bold. */
  description: string;
  /** Public file (e.g. Figma Community); unset → no "Check it out" link. */
  liveLink?: string;
  tile: ExplorationTile;
};

export const TILE = { width: 678, height: 546 };

const BASE = "/images/works/explorations/";
const bg = (name: string) => `${BASE}${name}-bg.webp`;
const shot = (name: string, x: number, y: number, w: number, h: number) => ({
  src: `${BASE}${name}.webp`,
  box: { x, y, w, h },
});

const tiles: Record<string, ExplorationTile> = {
  "neural-operations-dashboard": { backgroundSrc: bg("neural"), shots: [shot("neural", 15, 49, 648, 448)] },
  "global-satellite-tracking-module": { backgroundSrc: bg("global"), shots: [shot("global", 14, 40, 650, 463)] },
  wordquake: { backgroundSrc: bg("wordquake"), shots: [shot("wordquake", 19, 32, 640, 533)] },
  "nexus-studio": { backgroundSrc: bg("nexus"), shots: [shot("nexus", 15, 32, 649, 462)] },
  "corporate-filing-module": { backgroundSrc: bg("corporate"), shots: [shot("corporate", 9, 52, 660, 470)] },
  "anomaly-detection-module": { backgroundSrc: bg("anomaly"), shots: [shot("anomaly", 12, 40, 655, 467)] },
  "aircraft-data-module": { backgroundSrc: bg("corporate"), heroBackgroundSrc: bg("anomaly"), shots: [shot("aircraft", 13, 41, 652, 465)] },
  "silo-command-hud": { backgroundSrc: bg("anomaly"), shots: [shot("silo", 15, 41, 649, 462)] },
  "tawq-explored-direction": {
    backgroundSrc: bg("corporate"),
    heroBackgroundSrc: bg("anomaly"),
    shots: [
      {
        src: "/videos/tawq-exploration.mp4",
        video: true,
        box: { x: 9, y: 52, w: 660, h: 470 },
      },
    ],
  },
  "otp-sign-in-light-dark": {
    backgroundSrc: bg("anomaly"),
    shots: [
      { ...shot("otp-1", 27, 76, 293, 541), crop: { w: 137.98, h: 147.49, left: -19.13 } },
      { ...shot("otp-2", 320, 76, 302, 577), crop: { w: 138.74, h: 143.25, left: -17.58 } },
    ],
  },
  "layout-practice-editorial-grid": { backgroundSrc: bg("corporate"), heroBackgroundSrc: bg("anomaly"), shots: [shot("editorial", 18, 92, 642, 361)] },
  "otp-sign-in-take-two": {
    backgroundSrc: bg("anomaly"),
    shots: [
      { ...shot("otp2-1", 29, 60, 302, 599), crop: { w: 131.24, h: 107.05, left: -15.9 } },
      { ...shot("otp2-2", 334, 60, 303, 588), crop: { w: 129.18, h: 107.63, left: -14.59 } },
    ],
  },
};

/** Grid order from the design, left to right, top to bottom. */
const order = [
  "neural-operations-dashboard",
  "global-satellite-tracking-module",
  "wordquake",
  "nexus-studio",
  "corporate-filing-module",
  "anomaly-detection-module",
  "aircraft-data-module",
  "silo-command-hud",
  "tawq-explored-direction",
  "otp-sign-in-light-dark",
  "layout-practice-editorial-grid",
  "otp-sign-in-take-two",
];

const entries: Omit<Exploration, "tile">[] = [
  {
    id: "tawq-explored-direction",
    title: "Tawq — Explored Direction (Unreleased)",
    category: "Interface",
    description:
      "An early visual direction explored for Tawq's battery swap flow.\n\nThis version leaned into a bold, high-contrast orange-and-black aesthetic, with heavy typography and a raw, industrial feel throughout the swap experience.\n\nIt covered the full flow — charge status, payment, station instructions, and swap confirmation.\n\nUltimately, the team felt this style skewed too intense for Tawq's everyday riders, so we moved forward with a different visual direction for the final product.\n\nSharing it here as part of the process — not every direction makes it to production, and exploring the wrong fit is often what clarifies the right one.",
  },
  {
    id: "aircraft-data-module",
    title: "Aircraft Data Module — N-T355",
    category: "Interface",
    description:
      "Part of the same Tron: Ares inspired series, focused on a specific tracked aircraft.\n\nThis screen goes deeper into a single asset — full technical specs, wireframe views, and live position.\n\nA glowing wireframe render, styled after aerospace blueprints, anchors the layout, paired with top and front views for a complete technical read.\n\nA live tracking map on the right shows the aircraft among nearby traffic, mid-flight. Dense spec data (range, cabin dimensions, heading) grounds the interface in realism.\n\nSmall narrative details, like flight logs tied to a person's name, hint at a larger story beneath the data.\n\nThis exploration was about pushing detail and technical depth within the same visual system.",
  },
  {
    id: "anomaly-detection-module",
    title: "Anomaly Detection Module",
    category: "Interface",
    description:
      "Another piece in the same Tron: Ares-inspired series as the satellite tracking module.\n\nThis one shifts focus from tracking a known target to detecting the unknown. Multiple low-threat anomalies are scattered across the map as ambient signals, while a central radar-style scanner locks onto one for closer inspection.\n\nConcentric rings and a soft glow draw the eye straight to the point of interest, echoing the same warm amber language used across the series.\n\nThe dense coordinate and status data along the edges stays consistent with the set, reinforcing that these interfaces belong to one connected system.\n\nThis exploration was about building anticipation the moment before a threat is confirmed.",
  },
  {
    id: "global-satellite-tracking-module",
    title: "Global Satellite Tracking Module",
    category: "Interface",
    description:
      "Inspired by a scene from Tron: Ares, imagining a real-time interface for aircraft tracking and origin tracing.\n\nBuilt around a military-grade satellite reconnaissance aesthetic — dense coordinates, grid overlays, and live flight data layered across a topographic map.\n\nThe focus is a single tracked aircraft, traced back to its point of origin, with surrounding traffic rendered as muted, secondary signals. Warm amber highlights cut through the dark UI to direct attention instantly.\n\nDeparture, arrival, and status details sit in a dense data strip at the base, balancing information density with visual clarity.\n\nThis exploration was about building tension and focuses into a data-heavy interface.",
  },
  {
    id: "corporate-filing-module",
    title: "Corporate Filing Module — Redacted",
    category: "Interface",
    description:
      "Inspired by Tron: Ares, part of the same visual world as the satellite tracking module.\n\nThis one was more about play — experimenting with texture, grain, and visual distortion. Built as a redacted corporate filing screen, revealing entity details behind a noisy overlay.\n\nThe film-grain and smudge effects give the UI a leaked, classified feel, as if the data wasn't meant to be seen this clearly. Sharp orange accent bars cut through the noise, anchoring key fields for legibility.\n\nEven in a moody, degraded interface, hierarchy and readability were non-negotiable.\n\nThis exploration was less about function and more about mood, texture, and restraint.",
  },
  {
    id: "otp-sign-in-light-dark",
    title: "OTP Sign-In — Light & Dark",
    category: "Mobile",
    description:
      "A quick personal exploration, nothing too elaborate.\n\nA simple OTP sign-in screen, designed once and tested across both light and dark themes.\n\nThe focus was consistency — same layout, spacing, and hierarchy, just re-skinned.\n\nClear numeric inputs and a native-style keypad keep the flow familiar and frictionless. Small touches, like the 'Resend code' link and native message preview, ground it in realism.\n\nThis one was less about solving a problem and more about staying sharp on the fundamentals.",
  },
  {
    id: "otp-sign-in-take-two",
    title: "OTP Sign-In — Take Two",
    category: "Mobile",
    description:
      "A second pass at the same OTP sign-in flow, this time with an illustrated focal point.\n\nAn envelope-and-package icon replaces the plain numeric layout, adding a bit more personality.\n\nThe gradient glow on dark mode gives it warmth, while the light version stays soft and neutral.\n\nSame core structure as the first version — inbox prompt, code input, resend action — but the added illustration shifts the tone from purely functional to slightly more inviting.\n\nTesting both themes side by side again to see which visual language felt more 'on brand.'\n\nA small iteration, but useful for comparing plain UI versus illustration-led UI for the same flow.",
  },
  {
    id: "silo-command-hud",
    title: "Silo Command HUD — Squad Status Interface",
    category: "Game UI",
    description:
      "Inspired by the Silo series, specifically how the silo was structured into distinct segments. I wanted to translate that layered, compartmentalized structure into a game UI.\n\nEach hexagonal cluster represents a squad, with a central player icon surrounded by status effects — health, buffs, and hazards — all read at a glance through iconography alone. Multiple squads are laid out symmetrically, mirroring how the silo itself was zoned. The deep red and black palette keeps the tone tense, almost alert-state by default.\n\nEmpty hex clusters hint at squads not yet in view, keeping the full map partially obscured.\n\nThis exploration was about taking structure from an unrelated medium and reshaping it into UI logic.",
  },
  {
    id: "nexus-studio",
    title: "Nexus Studio — Outlaw Syndicate: Redhook",
    category: "Branding",
    description:
      "Designed as part of a UI assessment for a gaming company, Mazerance.\n\nThe brief was to design a game studio landing page for a new title launch. Outlaw Syndicate: Redhook is framed as a gritty, cyberpunk action game, so the design leans fully into that world — neon-lit streets, silhouetted characters, tension in every frame.\n\nBold, condensed typography and a stark orange-to-black gradient anchor the hero section.\n\nClear platform availability and dual CTAs (join, watch trailer) keep the page action-oriented. A scrolling gameplay gallery beneath the fold extends the immersion further.\n\nThis exploration was about capturing a game's tone and identity through UI alone, translating mood and atmosphere into a page that sells the world, not just the product.",
  },
  {
    id: "layout-practice-editorial-grid",
    title: "Layout Practice — Editorial Grid",
    category: "Typography",
    description:
      "A layout exercise focused purely on editorial composition and grid discipline.\n\nReal-world content (Nike's sustainability reporting) was used as a placeholder, letting me focus entirely on hierarchy, spacing, and image-to-text balance.\n\nA bold stat leads the page, paired with strong photography to set immediate context. The asymmetric image grid breaks the rhythm without losing visual balance. Dense body copy is handled with generous line-height to stay readable at scale.\n\nThis exploration was about practicing restraint — letting content breathe, not decorate.",
  },
  {
    id: "wordquake",
    title: "WordQuake (Competitive Word Search)",
    category: "Game UI",
    description:
      "Designed as part of a UI assessment for a gaming company.\n\nWord Quake reimagines the classic word search as a real-time, competitive game. Players race against opponents to spot hidden words on a dense 26x26 grid, with a live pot, round timer, and leaderboard driving the pressure.\n\nThe dark, high-contrast grid keeps focus on letter scanning, while found letters glow to reinforce progress at a glance.\n\nA minimal side panel tracks players, scores, and word history without clutter. The typed-word bar at the base gives instant, game-like feedback on each guess.\n\nThis exploration was about making a familiar puzzle feel fast, social, and competitive.",
  },
  {
    id: "neural-operations-dashboard",
    title: "Neural Operations Dashboard",
    category: "Exploration",
    description:
      "Live on Figma Community with **300+** duplicates and counting.\n\nA speculative control interface for managing LLM-based agents in real time.\n\nBuilt around the idea of treating autonomous agents like active infrastructure — each one trackable, activatable, and controllable at a glance.\n\nThe dark, terminal-inspired UI leans into a command-center feel, surfacing model version, response times, and task activity side by side. Every detail, from cycle counts to live logs, is designed to feel like a system actually thinking.\n\nAn emergency stop control anchors the interface with a clear failsafe. This exploration was about designing trust into a system humans don't fully see.",
    liveLink: "https://www.figma.com/community/file/1521924051783526601",
  },
];

export const explorations: Exploration[] = order.map((id) => {
  const entry = entries.find((e) => e.id === id);
  if (!entry) throw new Error(`Missing exploration copy for "${id}"`);
  return { ...entry, tile: tiles[id] };
});

export const getExploration = (id: string) =>
  explorations.find((ex) => ex.id === id);

/** Neighbours in grid order. The ends don't wrap: the first has no "back". */
export function getSiblingExplorationIds(id: string) {
  const index = explorations.findIndex((ex) => ex.id === id);
  if (index === -1) return { prevId: undefined, nextId: undefined };

  return {
    prevId: explorations[index - 1]?.id,
    nextId: explorations[index + 1]?.id,
  };
}
