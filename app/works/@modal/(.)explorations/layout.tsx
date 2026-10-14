import ExplorationPanel from "@/components/works/ExplorationPanel";

// The panel lives in the layout so stepping between explorations swaps its
// content instead of closing and reopening it.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ExplorationPanel>{children}</ExplorationPanel>;
}
