import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-start justify-center gap-6 px-4 md:px-12 py-20 lg:py-32">
      <p className="font-noodle text-2xl uppercase text-[#9CA3AF]">404</p>

      <h1 className="max-w-2xl text-4xl md:text-5xl font-medium leading-tight">
        This page doesn&apos;t exist.
      </h1>

      <p className="max-w-xl text-[15px] leading-relaxed text-[#475467]">
        The link may be out of date, or the page may have moved. The work is
        still where you left it.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/"
          className="rounded-[12px] shadow-sm bg-white px-5 py-4 font-medium uppercase underline underline-offset-2 transition-opacity hover:opacity-70 font-noodle text-2xl"
        >
          Back home
        </Link>

        <Link
          href="/works"
          className="rounded-[12px] px-5 py-4 font-medium uppercase underline underline-offset-2 text-[#475467] transition-colors hover:text-black font-noodle text-2xl"
        >
          See my work
        </Link>
      </div>
    </main>
  );
}