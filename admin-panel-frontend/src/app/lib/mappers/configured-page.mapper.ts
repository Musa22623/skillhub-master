import { resolveLegacyStats, resolveLegacyTable } from "@/app/features/legacy/legacyResolver";
import type { ConfiguredPageApiResponse, ConfiguredPageData } from "@/app/lib/types/admin-page";
import type { PageConfig, TableColumn } from "@/app/components/types/ui";

export function mapConfiguredPageApiResponse<Row extends { id: string }>(
  config: PageConfig<Row>,
  response: ConfiguredPageApiResponse<Row>,
): ConfiguredPageData<Row> {
  if (response.source === "mock-config") {
    return {
      source: response.source,
      stats: response.stats,
      rows: response.rows,
      tabs: response.tabs,
    };
  }

  const tabs = config.tabs?.map((tab, index) => {
    const table = resolveLegacyTable(config.id, tab.id, index);

    return {
      id: tab.id,
      stats: tab.stats,
      columns: table?.columns as TableColumn<Row>[] | undefined,
      rows: table?.rows as Row[] | undefined,
      emptyMessage: tab.emptyMessage,
    };
  });

  const defaultTable = resolveLegacyTable(config.id);
  const defaultStats = resolveLegacyStats(config.id);

  return {
    source: response.source,
    stats: config.tabs ? config.stats : defaultStats ?? config.stats,
    columns: defaultTable?.columns as TableColumn<Row>[] | undefined,
    rows: defaultTable?.rows as Row[] | undefined,
    tabs,
  };
}
