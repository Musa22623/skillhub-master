import { legacyData } from "@/app/features/legacy/legacyData";
import type { PageConfig } from "@/app/components/types/ui";
import type { ConfiguredPageApiResponse } from "@/app/lib/types/admin-page";

export async function fetchConfiguredPageApiResponse<Row extends { id: string }>(
  config: PageConfig<Row>,
): Promise<ConfiguredPageApiResponse<Row>> {
  const useLegacyData = config.useLegacyData ?? true;

  if (useLegacyData) {
    return {
      source: "mock-legacy",
      pageId: config.id,
      legacyPage: legacyData[config.id as keyof typeof legacyData] ?? null,
    };
  }

  return {
    source: "mock-config",
    pageId: config.id,
    stats: config.stats,
    rows: config.rows,
    tabs: config.tabs?.map((tab) => ({
      id: tab.id,
      stats: tab.stats,
      rows: tab.rows,
      emptyMessage: tab.emptyMessage,
    })),
  };
}
