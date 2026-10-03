import { CaseStudy } from "@/lib/constants/works";
import Image from "next/image";

export default function CaseStudyHeader({
  brand,
}: {
  brand: CaseStudy["brand"];
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EAECF0] pb-5">
      <div className="flex items-center gap-2">
        <Image src={brand.logoSrc} alt="" width={28} height={28} />
        <span className="text-lg font-bold">{brand.name}</span>
      </div>
      <p className="text-sm text-[#475467]">
        Role: <span className="font-medium text-[#101828]">{brand.role}</span>
      </p>
    </div>
  );
}
