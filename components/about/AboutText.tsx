export default function AboutText({ columns }: { columns: string[][] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
      {columns.map((paragraphs, i) => (
        <div
          key={i}
          className="space-y-6 text-[15px] leading-relaxed text-[#475467]"
        >
          {paragraphs.map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
