"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import { PageContent } from "@/app/layout/PageContent";
import { Sidebar } from "@/app/layout/Sidebar";
import { navSections } from "@/app/navigation/navigation";

export function AppShell({ children }: PropsWithChildren) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const sections = useMemo(() => navSections, []);

  const resolvePath = (path?: string) => {
    if (!path) {
      return "/";
    }
    return path.startsWith("/") ? path : `/${path}`;
  };

  const isPathActive = (path?: string) => pathname === resolvePath(path);
  const isSectionActive = (paths: Array<string | undefined>) => paths.some((path) => isPathActive(path));
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
    sections.reduce<Record<string, boolean>>((accumulator, section) => {
      accumulator[section.id] = Boolean(
        section.children && isSectionActive(section.children.map((child) => child.path)),
      );
      return accumulator;
    }, {}),
  );

  useEffect(() => {
    setExpandedSections((current) =>
      sections.reduce<Record<string, boolean>>((accumulator, section) => {
        const shouldStayOpen = Boolean(
          section.children && isSectionActive(section.children.map((child) => child.path)),
        );
        accumulator[section.id] = shouldStayOpen ? true : current[section.id] ?? false;
        return accumulator;
      }, {}),
    );
  }, [pathname, sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  };

  return (
    <div className="min-h-screen bg-surface-page">
      <Sidebar
        mobileOpen={mobileOpen}
        sections={sections}
        expandedSections={expandedSections}
        isPathActive={isPathActive}
        isSectionActive={isSectionActive}
        resolvePath={resolvePath}
        onToggleMobile={() => setMobileOpen((current) => !current)}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleSection={toggleSection}
      />
      <PageContent>{children}</PageContent>
    </div>
  );
}
