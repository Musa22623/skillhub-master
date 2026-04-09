import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/styles/index.css";

export const metadata: Metadata = {
  title: "Platform Admin",
  description: "Administrative console migrated to Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
