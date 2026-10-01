const COLUMN_COUNT = 5;

export default function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mx-auto grid max-w-6xl"
      style={{ gridTemplateColumns: `repeat(${COLUMN_COUNT}, 1fr)` }}
    >
      {Array.from({ length: COLUMN_COUNT + 1 }).map((_, index) => (
        <span
          key={index}
          className="h-full w-px bg-(--color-line)"
          style={{ justifySelf: index === COLUMN_COUNT ? "end" : "start" }}
        />
      ))}
    </div>
  );
}
