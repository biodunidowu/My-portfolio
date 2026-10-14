import { notFound } from "next/navigation";
import ExplorationDetail from "@/components/works/ExplorationDetail";
import { explorations, getExploration } from "@/lib/constants/explorations";

export function generateStaticParams() {
  return explorations.map((ex) => ({ slug: ex.id }));
}

export default async function Page({
  params,
}: PageProps<"/works/explorations/[slug]">) {
  const { slug } = await params;
  const exploration = getExploration(slug);
  if (!exploration) notFound();

  return <ExplorationDetail exploration={exploration} inPanel />;
}
