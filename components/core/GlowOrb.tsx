export default function GlowOrb() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[220px] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] opacity-80 blur-2xl"
      style={{
        background:
          "linear-gradient(200deg, #bfe3ff 0%, #d8e9ff 22%, #f3d9e8 45%, #ffe9c7 62%, #cfe8ff 80%, #a9d6ff 100%)",
        borderRadius: "38% 62% 55% 45% / 50% 45% 55% 50%",
        filter: "blur(28px) saturate(130%)",
      }}
    />
  );
}
