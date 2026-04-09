import type { PropsWithChildren } from "react";
import { ToastProvider } from "@/app/providers/ToastProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return <ToastProvider>{children}</ToastProvider>;
}
