import { CaseStudy } from "@/lib/constants/works";
import Image from "next/image";

export default function CaseStudyHeader({
  brand,
}: {
  brand: CaseStudy["brand"];
}) {
  return (
    <div className="flex items-center justify-between border-b border-line bg-surface py-4 px-3 shadow-xs">
      <Image src={brand.logoSrc} alt="" width={103} height={42} />

      <p className="text-sm text-fg-2">
        Role: <span className="font-medium text-fg">{brand.role}</span>
      </p>
    </div>
  );
}
