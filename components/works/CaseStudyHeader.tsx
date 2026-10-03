import { CaseStudy } from "@/lib/constants/works";
import Image from "next/image";

export default function CaseStudyHeader({
  brand,
}: {
  brand: CaseStudy["brand"];
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#EAECF0] bg-white py-4 px-3 shadow-xs">
      <Image src={brand.logoSrc} alt="" width={103} height={42} />

      <p className="text-sm text-[#475467]">
        Role: <span className="font-medium text-[#101828]">{brand.role}</span>
      </p>
    </div>
  );
}
