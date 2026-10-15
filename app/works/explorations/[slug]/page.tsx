import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import FooterSection from "@/components/core/Footer";
import ExplorationDetail from "@/components/works/ExplorationDetail";
import { explorations, getExploration } from "@/lib/constants/explorations";
import { pageTransition } from "@/lib/transitions";

// Only the known slugs exist; anything else is a real 404 (not a streamed 200).
export const dynamicParams = false;

export function generateStaticParams() {
  return explorations.map((ex) => ({ slug: ex.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/works/explorations/[slug]">): Promise<Metadata> {
  const exploration = getExploration((await params).slug);
  if (!exploration) return {};
  return {
    title: `${exploration.title} — Idowu Abiodun`,
    description: exploration.description.split("\n\n")[0].replaceAll("**", ""),
  };
}

/** A shared link or a refresh lands here; from the Works grid it opens as a panel. */
export default async function Page({
  params,
}: PageProps<"/works/explorations/[slug]">) {
  const { slug } = await params;
  const exploration = getExploration(slug);
  if (!exploration) notFound();

  return (
    <ViewTransition {...pageTransition}>
      <main className="overflow-x-clip pt-8">
        <ExplorationDetail exploration={exploration} />
      </main>
      <FooterSection />
    </ViewTransition>
  );
}
