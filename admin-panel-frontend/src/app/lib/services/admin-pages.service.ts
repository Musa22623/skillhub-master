import { fetchConfiguredPageApiResponse } from "@/app/lib/api/admin-pages.api";
import { mapConfiguredPageApiResponse } from "@/app/lib/mappers/configured-page.mapper";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
import type { PageConfig } from "@/app/components/types/ui";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import { getServerConfiguredPageHandler } from "@/app/lib/services/server-configured-pages.registry";

export async function getConfiguredPageData<Row extends { id: string }>(
  config: PageConfig<Row>,
  query?: ConfiguredPageQueryParams,
): Promise<ConfiguredPageData<Row>> {
  const serverHandler = getServerConfiguredPageHandler(config);
  if (serverHandler?.getPageData) {
    return serverHandler.getPageData(config, query);
  }

  const pageDataLoaders: Partial<Record<string, () => Promise<{ stats: unknown; rows: unknown }>>> = {};

  const pageDataLoader = pageDataLoaders[config.id];
  if (pageDataLoader) {
    const pageData = await pageDataLoader();

    return {
      source: "mock-legacy",
      columns: config.columns,
      stats: pageData.stats as unknown as ConfiguredPageData<Row>["stats"],
      rows: pageData.rows as unknown as ConfiguredPageData<Row>["rows"],
      pagination: (pageData as ConfiguredPageData<Row>).pagination,
      query: (pageData as ConfiguredPageData<Row>).query,
    };
  }

  const response = await fetchConfiguredPageApiResponse(config);
  return mapConfiguredPageApiResponse(config, response);
}

export async function getConfiguredPageShellData<Row extends { id: string }>(
  config: PageConfig<Row>,
): Promise<ConfiguredPageData<Row>> {
  const serverHandler = getServerConfiguredPageHandler(config);
  if (serverHandler?.getShellData) {
    return serverHandler.getShellData(config);
  }

  return getConfiguredPageData(config);
}

export async function getConfiguredPageTableData<Row extends { id: string }>(
  config: PageConfig<Row>,
  query: ConfiguredPageQueryParams,
): Promise<ConfiguredPageData<Row>> {
  const serverHandler = getServerConfiguredPageHandler(config);
  if (serverHandler) {
    return serverHandler.getTableData(config, query);
  }

  return getConfiguredPageData(config, query);
}
