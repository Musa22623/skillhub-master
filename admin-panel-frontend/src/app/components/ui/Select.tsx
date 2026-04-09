import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`h-10 rounded-md border border-surface-line bg-white px-3 text-sm text-text-primary ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
