"use client";

import type { InputHTMLAttributes } from "react";
import { Icon } from "@/app/components/ui/Icon";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  withSearchIcon?: boolean;
};

export function Input({ className = "", withSearchIcon = false, ...props }: InputProps) {
  return (
    <div className={`relative ${props.type === "search" || withSearchIcon ? "w-full" : ""}`}>
      {withSearchIcon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
          <Icon name="search" className="h-4 w-4" />
        </span>
      ) : null}
      <input
        className={`h-9 w-full rounded-md border border-surface-line bg-white px-3.5 text-[13px] text-text-primary placeholder:text-text-secondary ${withSearchIcon ? "pl-9" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}
