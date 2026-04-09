import type { PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren<{
  title?: ReactNode;
  action?: ReactNode;
  className?: string;
  bodyClassName?: string;
}>;

export function Card({ children, title, action, className = "", bodyClassName = "p-4" }: CardProps) {
  return (
    <section className={`panel overflow-hidden ${className}`}>
      {title || action ? (
        <header className="flex items-center justify-between border-b border-surface-line px-4 py-3">
          <div className="text-[14px] font-semibold text-text-primary">{title}</div>
          {action}
        </header>
      ) : null}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
