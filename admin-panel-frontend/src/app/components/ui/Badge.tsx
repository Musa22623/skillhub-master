import type { PropsWithChildren } from "react";
import type { BadgeTone } from "@/app/components/types/ui";

const tones: Record<BadgeTone, string> = {
  success: "border-[#B7EB8F] bg-[#F6FFED] text-state-success",
  danger: "border-[#FFA39E] bg-[#FFF1F0] text-state-danger",
  warning: "border-[#FFE58F] bg-[#FFFBE6] text-state-warning",
  info: "border-[#91D5FF] bg-[#E6F7FF] text-state-info",
  neutral: "border-[#D9D9D9] bg-[#FAFAFA] text-state-neutral",
};

type BadgeProps = PropsWithChildren<{
  tone?: BadgeTone;
  className?: string;
}>;

export function Badge({ children, tone = "info", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
