import { fetchConfiguredPageApiResponse } from "@/app/lib/api/admin-pages.api";
import { mapConfiguredPageApiResponse } from "@/app/lib/mappers/configured-page.mapper";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
import { getAllProductsPageData } from "@/app/lib/services/products/get-all-products-page-data";
import { getAllInstructorsPageData } from "@/app/lib/services/users/get-all-instructors-page-data";
import { getApplicationsPageData } from "@/app/lib/services/users/get-applications-page-data";
import { getTeamContactsPageData } from "@/app/lib/services/users/get-team-contacts-page-data";
import { getTeamMembersPageData } from "@/app/lib/services/users/get-team-members-page-data";
import { getUserManagementPageData } from "@/app/lib/services/users/get-user-management-page-data";
import { getUserManagementSummaryData } from "@/app/lib/services/users/get-user-management-summary-data";
import type { PageConfig } from "@/app/components/types/ui";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";

export async function getConfiguredPageData<Row extends { id: string }>(
  config: PageConfig<Row>,
  query?: ConfiguredPageQueryParams,
): Promise<ConfiguredPageData<Row>> {
  const pageDataLoaders: Partial<Record<string, () => Promise<{ stats: unknown; rows: unknown }>>> = {
    "user-management": () =>
      getUserManagementPageData({
        query: query?.query,
        status: typeof query?.filters?.status === "string" ? query.filters.status : undefined,
        role: typeof query?.filters?.role === "string" ? query.filters.role : undefined,
        sortBy: query?.sortBy,
        sortDir: query?.sortDir,
        page: query?.page,
        pageSize: query?.pageSize,
        searchFields: query?.searchFields,
      }),
    "all-instructors": getAllInstructorsPageData,
    applications: getApplicationsPageData,
    "team-contacts": getTeamContactsPageData,
    "team-members": getTeamMembersPageData,
    "all-products": getAllProductsPageData,
  };

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
  if (config.id === "user-management") {
    const summary = await getUserManagementSummaryData();

    return {
      source: "mock-legacy",
      columns: config.columns,
      stats: summary.stats as unknown as ConfiguredPageData<Row>["stats"],
    };
  }

  return getConfiguredPageData(config);
}

export async function getConfiguredPageTableData<Row extends { id: string }>(
  config: PageConfig<Row>,
  query: ConfiguredPageQueryParams,
): Promise<ConfiguredPageData<Row>> {
  if (config.id === "user-management") {
    const pageData = await getUserManagementPageData({
      query: query?.query,
      status: typeof query?.filters?.status === "string" ? query.filters.status : undefined,
      role: typeof query?.filters?.role === "string" ? query.filters.role : undefined,
      sortBy: query?.sortBy,
      sortDir: query?.sortDir,
      page: query?.page,
      pageSize: query?.pageSize,
      searchFields: query?.searchFields,
    });

    return {
      source: "mock-legacy",
      columns: config.columns,
      rows: pageData.rows as unknown as ConfiguredPageData<Row>["rows"],
      pagination: pageData.pagination,
      query: pageData.query,
    };
  }

  return getConfiguredPageData(config, query);
}
