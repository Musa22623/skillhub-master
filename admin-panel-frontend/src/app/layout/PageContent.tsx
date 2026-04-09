import type { PropsWithChildren } from "react";

export function PageContent({ children }: PropsWithChildren) {
  return (
    <div className="md:pl-[280px]">
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
