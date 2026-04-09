import type { ReactNode } from "react";
import { Card } from "@/app/components/ui/Card";

type TableSectionProps = {
  toolbar?: ReactNode;
  children: ReactNode;
  density?: "compact" | "comfortable";
};

export function TableSection({ toolbar, children, density = "compact" }: TableSectionProps) {
  return (
    <Card className="overflow-visible" bodyClassName="p-0">
      {toolbar ? <div className={`border-b border-surface-line ${density === "comfortable" ? "px-5 py-4" : "px-4 py-3"}`}>{toolbar}</div> : null}
      {children}
    </Card>
  );
}
