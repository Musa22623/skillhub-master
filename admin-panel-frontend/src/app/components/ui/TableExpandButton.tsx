"use client";

type TableExpandButtonProps = {
  expanded: boolean;
  onToggle: () => void;
  className?: string;
};

export function TableExpandButton({ expanded, onToggle, className = "" }: TableExpandButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex h-6 w-6 items-center justify-center text-[#666666] transition-transform ${expanded ? "rotate-90 text-brand" : ""} ${className}`}
      aria-label={expanded ? "Collapse row" : "Expand row"}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
