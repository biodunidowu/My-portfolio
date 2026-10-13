import type { CSSProperties } from "react";

// Hatch for the About page band, in 1440-frame coordinates (x from the page
// edge, y from the band top). It spans the three right-hand columns
// (x 711 → 1373); the SVG viewBox starts at 711 so it stretches with them.

type Hatch = [left: number, top: number, width: number, height: number];

const back: Hatch[] = [
  [711, 0, 65, 65], [731, 0, 65, 65], [747, 0, 65, 65], [762, 0, 65, 65],
  [776, 0, 65, 65], [793, 0, 65, 65],
  [1111, 1, 67, 65], [1123, 1, 59, 58], [1134, 1, 48, 47], [1145, 1, 37, 35],
  [1155, 1, 27, 25], [1164, 1, 18, 16],
  [1302, 1, 67, 65], [1314, 1, 59, 58], [1325, 1, 48, 47], [1336, 1, 37, 35],
  [1346, 1, 27, 25], [1355, 1, 18, 16],
];

const forward: Hatch[] = [
  [869, 1, 70, 65], [885, 12, 55, 53],
  [940, 1, 64, 64], [940, 1, 51, 53], [940, 1, 39, 40], [940, 1, 28, 31],
  [940, 1, 17, 19], [950, 1, 65, 65],
  [1183, 1, 58, 58], [1183, 1, 47, 47], [1183, 1, 38, 35], [1183, 1, 28, 25],
  [1183, 1, 19, 16], [1189, 1, 61, 65],
];

export default function AboutBand({ className }: { className?: string }) {
  const order = (i: number) => ({ "--i": i }) as CSSProperties;

  return (
    <svg
      aria-hidden
      viewBox="711 0 662 65"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M64 64L0 0H127.5L64 64Z"
        fill="var(--surface)"
        className="band-fade"
        transform="translate(794 1)"
      />
      <g stroke="var(--line-subtle)" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {back.map(([l, t, w, h], i) => (
          <line key={`b${l}-${w}`} pathLength={1} className="band-draw" style={order(i)} x1={l} y1={t} x2={l + w} y2={t + h} />
        ))}
        {forward.map(([l, t, w, h], i) => (
          <line key={`f${l}-${w}`} pathLength={1} className="band-draw" style={order(i)} x1={l} y1={t + h} x2={l + w} y2={t} />
        ))}
      </g>
    </svg>
  );
}
