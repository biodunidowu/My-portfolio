import Image from "next/image";
import { cn } from "@/lib/utils";

/** Gamepad + "Open to work" pill. Inline in the desktop header, a split row in the mobile menu. */
export default function WorkStatus({
  variant = "header",
  className,
}: {
  variant?: "header" | "menu";
  className?: string;
}) {
  const menu = variant === "menu";

  return (
    <div className={cn("items-center", menu ? "flex" : "gap-3", className)}>
      <span
        className={cn(
          "flex items-center justify-center",
          menu && "flex-1 self-stretch bg-[#F2F4F7] p-2",
        )}
      >
        <Image src="/images/game-pad.svg" alt="" width={24} height={24} />
      </span>

      <span
        className={cn(
          "flex items-center justify-center gap-2 bg-[#F9FAFB] p-2 leading-7 text-[#101828]",
          menu ? "w-42.25 text-base" : "text-sm",
        )}
      >
        <span className="size-2 rounded-full bg-[#22C55E]" />
        Open to work
      </span>
    </div>
  );
}
