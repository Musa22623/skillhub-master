import type { ReactNode } from "react";

type TableIconButtonProps = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
};

function renderTooltip(label: string) {
  return (
    <span className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-text-primary px-[10px] py-[6px] text-[12px] font-medium leading-none text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100">
      {label}
    </span>
  );
}

export function TableIconButton({ label, icon, onClick, className = "" }: TableIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F4F9FC] text-[#03314B] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white ${className}`}
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[14px] w-[14px]"
        aria-hidden="true"
      >
        {icon}
      </svg>
      {renderTooltip(label)}
    </button>
  );
}
