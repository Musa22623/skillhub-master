"use client";

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Icon } from "@/app/components/ui/Icon";
import type { ActionVariant, IconName } from "@/app/components/types/ui";

const variants: Record<ActionVariant, string> = {
  primary: "bg-brand text-white hover:bg-[#3A7BAF]",
  secondary: "bg-surface-muted text-text-primary hover:bg-[#EAF3F8]",
  ghost: "bg-transparent text-brand hover:bg-brand-soft",
  danger: "bg-state-danger text-white hover:bg-[#E84244]",
};

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ActionVariant;
    icon?: IconName;
  }
>;

export function Button({
  children,
  className = "",
  variant = "primary",
  icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-9 items-center gap-2 rounded-md px-3.5 text-[13px] font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {icon ? <Icon name={icon} className="h-[15px] w-[15px]" /> : null}
      {children}
    </button>
  );
}
