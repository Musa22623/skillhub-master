"use client";

import { Suspense, useEffect, useState } from "react";
import { getConfiguredPageData, getConfiguredPageShellData } from "@/app/lib/services/admin-pages.service";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
import { usePathname, useRouter } from "next/navigation";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppShell } from "@/app/layout/AppShell";
import { pageRegistry } from "@/app/navigation/pageRegistry";
import { DashboardPage } from "@/app/sections/dashboard/pages/DashboardPage";
import { ConfiguredPage } from "@/app/sections/shared/ConfiguredPage";

function normalizePath(pathname: string) {
  if (pathname === "/") {
    return "";
  }

  return pathname.replace(/^\/+|\/+$/g, "");
}

function AppContent() {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const normalizedPath = normalizePath(pathname);
  const activeConfig = pageRegistry.find((config) => config.path === normalizedPath);
  const [pageData, setPageData] = useState<ConfiguredPageData<{ id: string }> | null>(null);

  useEffect(() => {
    if (pathname !== "/" && !activeConfig) {
      router.replace("/");
    }
  }, [activeConfig, pathname, router]);

  useEffect(() => {
    let cancelled = false;

    if (!activeConfig || activeConfig.component) {
      setPageData(null);
      return () => {
        cancelled = true;
      };
    }

    const loader = activeConfig.dataMode === "server" ? getConfiguredPageShellData : getConfiguredPageData;

    loader(activeConfig as never).then((data) => {
      if (!cancelled) {
        setPageData(data as ConfiguredPageData<{ id: string }>);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeConfig]);

  let content = <DashboardPage />;

  if (activeConfig) {
    const CustomPage = activeConfig.component;
    content = CustomPage ? <CustomPage /> : <ConfiguredPage config={activeConfig as never} pageData={pageData as never} />;
  }

  return <AppShell>{content}</AppShell>;
}

export function NextApp() {
  return (
    <AppProviders>
      <Suspense fallback={null}>
        <AppContent />
      </Suspense>
    </AppProviders>
  );
}
