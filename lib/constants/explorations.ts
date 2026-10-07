export type Exploration = {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
  category: string;
  description: string;
  liveLink?: string;
};

const BASE = "/images/explorations/";

export const explorations: Exploration[] = [
  {
    id: "aircraft-data-module",
    title: "Aircraft Data Module — N-T355",
    src: BASE + "Aircraft%20Data%20Module%20%E2%80%94%20N-T355%201.png",
    width: 678,
    height: 596,
    category: "Interface",
    description:
      "Part of the same Tron: Ares inspired series, focused on a specific tracked aircraft.\n\nThis screen goes deeper into a single asset — full technical specs, wireframe views, and live position.\n\nA glowing wireframe render, styled after aerospace blueprints, anchors the layout, paired with top and front views for a complete technical read.\n\nA live tracking map on the right shows the aircraft among nearby traffic, mid-flight. Dense spec data (range, cabin dimensions, heading) grounds the interface in realism.\n\nSmall narrative details, like flight logs tied to a person's name, hint at a larger story beneath the data.\n\nThis exploration was about pushing detail and technical depth within the same visual system.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "anomaly-detection-module",
    title: "Anomaly Detection Module",
    src: BASE + "Anomaly%20Detection%20Module%201.png",
    width: 678,
    height: 615,
    category: "Interface",
    description:
      "Another piece in the same Tron: Ares-inspired series as the satellite tracking module.\n\nThis one shifts focus from tracking a known target to detecting the unknown. Multiple low-threat anomalies are scattered across the map as ambient signals, while a central radar-style scanner locks onto one for closer inspection.\n\nConcentric rings and a soft glow draw the eye straight to the point of interest, echoing the same warm amber language used across the series.\n\nThe dense coordinate and status data along the edges stays consistent with the set, reinforcing that these interfaces belong to one connected system.\n\nThis exploration was about building anticipation the moment before a threat is confirmed.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "global-satellite-tracking-module",
    title: "Global Satellite Tracking Module",
    src: BASE + "Global%20Satellite%20Tracking%20Module%201.png",
    width: 678,
    height: 581,
    category: "Interface",
    description:
      "Inspired by a scene from Tron: Ares, imagining a real-time interface for aircraft tracking and origin tracing.\n\nBuilt around a military-grade satellite reconnaissance aesthetic — dense coordinates, grid overlays, and live flight data layered across a topographic map.\n\nThe focus is a single tracked aircraft, traced back to its point of origin, with surrounding traffic rendered as muted, secondary signals. Warm amber highlights cut through the dark UI to direct attention instantly.\n\nDeparture, arrival, and status details sit in a dense data strip at the base, balancing information density with visual clarity.\n\nThis exploration was about building tension and focus into a data-heavy interface.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "corporate-filing-module",
    title: "Corporate Filing Module — Redacted",
    src: BASE + "Corporate%20Filing%20Module%20%E2%80%94%20Redacted%201.png",
    width: 678,
    height: 585,
    category: "Interface",
    description:
      "Inspired by Tron: Ares, part of the same visual world as the satellite tracking module.\n\nThis one was more about play — experimenting with texture, grain, and visual distortion. Built as a redacted corporate filing screen, revealing entity details behind a noisy overlay.\n\nThe film-grain and smudge effects give the UI a leaked, classified feel, as if the data wasn't meant to be seen this clearly. Sharp orange accent bars cut through the noise, anchoring key fields for legibility.\n\nEven in a moody, degraded interface, hierarchy and readability were non-negotiable.\n\nThis exploration was less about function and more about mood, texture, and restraint.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "otp-sign-in-light-dark",
    title: "OTP Sign-In — Light & Dark",
    src: BASE + "OTP%20Sign-In%20%E2%80%94%20Light%20&%20Dark%201.png",
    width: 678,
    height: 623,
    category: "Mobile",
    description:
      "A quick personal exploration, nothing too elaborate.\n\nA simple OTP sign-in screen, designed once and tested across both light and dark themes.\n\nThe focus was consistency — same layout, spacing, and hierarchy, just re-skinned.\n\nClear numeric inputs and a native-style keypad keep the flow familiar and frictionless. Small touches, like the 'Resend code' link and native message preview, ground it in realism.\n\nThis one was less about solving a problem and more about staying sharp on the fundamentals.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "otp-sign-in-take-two",
    title: "OTP Sign-In — Take Two",
    src: BASE + "OTP%20Sign-In%20%E2%80%94%20Take%20Two%201.png",
    width: 678,
    height: 649,
    category: "Mobile",
    description:
      "A second pass at the same OTP sign-in flow, this time with an illustrated focal point.\n\nAn envelope-and-package icon replaces the plain numeric layout, adding a bit more personality.\n\nThe gradient glow on dark mode gives it warmth, while the light version stays soft and neutral.\n\nSame core structure as the first version — inbox prompt, code input, resend action — but the added illustration shifts the tone from purely functional to slightly more inviting.\n\nTesting both themes side by side again to see which visual language felt more 'on brand.'\n\nA small iteration, but useful for comparing plain UI versus illustration-led UI for the same flow.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "silo-command-hud",
    title: "Silo Command HUD — Squad Status Interface",
    src:
      BASE +
      "Silo%20Command%20HUD%20%E2%80%94%20Squad%20Status%20Interface%201.png",
    width: 678,
    height: 592,
    category: "Game UI",
    description:
      "Inspired by the Silo series, specifically how the silo was structured into distinct segments. I wanted to translate that layered, compartmentalized structure into a game UI.\n\nEach hexagonal cluster represents a squad, with a central player icon surrounded by status effects — health, buffs, and hazards — all read at a glance through iconography alone. Multiple squads are laid out symmetrically, mirroring how the silo itself was zoned. The deep red and black palette keeps the tone tense, almost alert-state by default.\n\nEmpty hex clusters hint at squads not yet in view, keeping the full map partially obscured.\n\nThis exploration was about taking structure from an unrelated medium and reshaping it into UI logic.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "nexus-studio",
    title: "Nexus Studio — Outlaw Syndicate: Redhook",
    src:
      BASE +
      "Nexus%20Studio%20%E2%80%94%20Outlaw%20Syndicate_%20Redhook%201.png",
    width: 678,
    height: 561,
    category: "Branding",
    description:
      "Designed as part of a UI assessment for a gaming company, Mazerance.\n\nThe brief was to design a game studio landing page for a new title launch. Outlaw Syndicate: Redhook is framed as a gritty, cyberpunk action game, so the design leans fully into that world — neon-lit streets, silhouetted characters, tension in every frame.\n\nBold, condensed typography and a stark orange-to-black gradient anchor the hero section.\n\nClear platform availability and dual CTAs (join, watch trailer) keep the page action-oriented. A scrolling gameplay gallery beneath the fold extends the immersion further.\n\nThis exploration was about capturing a game's tone and identity through UI alone, translating mood and atmosphere into a page that sells the world, not just the product.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "layout-practice-editorial-grid",
    title: "Layout Practice — Editorial Grid",
    src: BASE + "Layout%20Practice%20%E2%80%94%20Editorial%20Grid%201.png",
    width: 678,
    height: 647,
    category: "Typography",
    description:
      "A layout exercise focused purely on editorial composition and grid discipline.\n\nReal-world content (Nike's sustainability reporting) was used as a placeholder, letting me focus entirely on hierarchy, spacing, and image-to-text balance.\n\nA bold stat leads the page, paired with strong photography to set immediate context. The asymmetric image grid breaks the rhythm without losing visual balance. Dense body copy is handled with generous line-height to stay readable at scale.\n\nThis exploration was about practicing restraint — letting content breathe, not decorate.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "wordquake",
    title: "WordQuake (Competitive Word Search)",
    src: BASE + "WordQuake%20(Competitive%20Word%20Search)%201.png",
    width: 678,
    height: 605,
    category: "Game UI",
    description:
      "Designed as part of a UI assessment for a gaming company.\n\nWord Quake reimagines the classic word search as a real-time, competitive game. Players race against opponents to spot hidden words on a dense 26x26 grid, with a live pot, round timer, and leaderboard driving the pressure.\n\nThe dark, high-contrast grid keeps focus on letter scanning, while found letters glow to reinforce progress at a glance.\n\nA minimal side panel tracks players, scores, and word history without clutter. The typed-word bar at the base gives instant, game-like feedback on each guess.\n\nThis exploration was about making a familiar puzzle feel fast, social, and competitive.",
    liveLink: "https://figma.com/community/your-file",
  },
  {
    id: "neural-operations-dashboard",
    title: "Neural Operations Dashboard",
    src: BASE + "image%20351.png",
    width: 678,
    height: 581,
    category: "Exploration",
    description:
      "Live on Figma Community with 300+ duplicates and counting.\n\nA speculative control interface for managing LLM-based agents in real time.\n\nBuilt around the idea of treating autonomous agents like active infrastructure — each one trackable, activatable, and controllable at a glance.\n\nThe dark, terminal-inspired UI leans into a command-center feel, surfacing model version, response times, and task activity side by side. Every detail, from cycle counts to live logs, is designed to feel like a system actually thinking.\n\nAn emergency stop control anchors the interface with a clear failsafe. This exploration was about designing trust into a system humans don't fully see.",
    liveLink: "https://figma.com/community/your-file",
  },
];

export function getSiblingExplorationIds(id: string) {
  const index = explorations.findIndex((ex) => ex.id === id);
  if (index === -1) return { prevId: undefined, nextId: undefined };

  const last = explorations.length - 1;
  return {
    prevId: explorations[index === 0 ? last : index - 1].id,
    nextId: explorations[index === last ? 0 : index + 1].id,
  };
}
