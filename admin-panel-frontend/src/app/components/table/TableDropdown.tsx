import type { PropsWithChildren, ReactNode } from "react";

type TableDropdownProps = PropsWithChildren<{
  label: string;
  open: boolean;
  onToggle: () => void;
  align?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
  icon?: ReactNode;
  className?: string;
  menuClassName?: string;
}>;

export function TableDropdown({
  label,
  open,
  onToggle,
  align = "right",
  disabled = false,
  active = false,
  icon,
  className = "",
  menuClassName = "",
  children,
}: TableDropdownProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3.5 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
          active
            ? "border-brand/30 bg-brand-soft text-brand enabled:hover:bg-[#DDE9FF]"
            : "border-surface-line bg-[#F5F5F5] text-text-icon enabled:hover:bg-[#EBEBEB]"
        }`}
      >
        {icon}
        {label}
        <span className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>v</span>
      </button>
      {open ? (
        <div
          className={`absolute top-[calc(100%+6px)] z-20 min-w-[220px] rounded-lg border border-surface-line bg-white py-1.5 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
