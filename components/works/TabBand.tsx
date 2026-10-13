// Decorative band either side of the Works tabs. Coordinates are from the
// Figma frame (1200×65 band starting at x=120), so the SVG scales with it.

type Hatch = [left: number, top: number, width: number, height: number];

// "\" strokes run top-left to bottom-right; "/" strokes bottom-left to top-right.
const back: Hatch[] = [
  [0, 35, 30, 30], [0, 46, 20, 20], [0, 55, 11, 11], [0, 24, 42, 42],
  [0, 11, 54, 55], [1, 1, 65, 65], [12, 1, 64, 64],
  [204, 0, 65, 65], [220, 0, 65, 65], [233, 0, 65, 65], [246, 0, 65, 65],
  [261, 0, 65, 65], [874, 0, 65, 65], [894, 0, 65, 65], [910, 0, 65, 65],
  [925, 0, 65, 65], [939, 0, 65, 65], [956, 0, 65, 65],
  [1134, 1, 66, 65], [1146, 1, 54, 54], [1157, 1, 43, 43], [1168, 1, 32, 32],
  [1178, 1, 22, 22], [1187, 1, 13, 13],
];

const forward: Hatch[] = [
  [76, 0, 65, 65], [87, 0, 65, 65], [97, 0, 66, 65], [111, 0, 65, 65],
  [123, 0, 65, 65], [136, 0, 65, 65],
  [1021, 1, 65, 65], [1033, 1, 65, 65], [1046, 1, 65, 65], [1057, 1, 65, 65],
  [1071, 1, 62, 65],
];

// White triangles; paths are the Figma vectors. `flip` turns them point-up.
const triangles = [
  { x: 13.5, y: 1, w: 126.5, h: 63.5, d: "M63.5 63.5L0 0H126.5L63.5 63.5Z" },
  { x: 137.44, y: 0, w: 130.065, h: 65, d: "M64.9999 65L0 0L130.065 0L64.9999 65Z", flip: true },
  { x: 957, y: 1, w: 127.5, h: 64, d: "M64 64L0 0H127.5L64 64Z" },
  { x: 1072, y: 0.5, w: 127, h: 64.5, d: "M65.5 64.5L0 0L127 0L65.5 64.5Z", flip: true },
];

export default function TabBand() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 65"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden h-full w-300 -translate-x-1/2 xl:block"
    >
      {triangles.map((t) => (
        <path
          key={t.x}
          d={t.d}
          fill="white"
          transform={
            `translate(${t.x} ${t.y})` +
            (t.flip ? ` rotate(180 ${t.w / 2} ${t.h / 2})` : "")
          }
        />
      ))}

      <g stroke="#F3F4F6" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {back.map(([l, t, w, h]) => (
          <line key={`b${l}-${t}`} x1={l} y1={t} x2={l + w} y2={t + h} />
        ))}
        {forward.map(([l, t, w, h]) => (
          <line key={`f${l}`} x1={l} y1={t + h} x2={l + w} y2={t} />
        ))}
      </g>

      {/* Band edges and the frame either side of the tabs. */}
      <g stroke="#F2F4F7" strokeWidth="1">
        <line x1="0.5" y1="0" x2="0.5" y2="65" />
        <line x1="1199.5" y1="0" x2="1199.5" y2="65" />
        <line x1="369.5" y1="0" x2="369.5" y2="65" />
        <line x1="829.5" y1="0" x2="829.5" y2="65" />
      </g>
    </svg>
  );
}
