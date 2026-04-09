import { fetchConfiguredPageApiResponse } from "@/app/lib/api/admin-pages.api";
import { mapConfiguredPageApiResponse } from "@/app/lib/mappers/configured-page.mapper";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
import { getAllProductsPageData } from "@/app/lib/services/products/get-all-products-page-data";
import { getAllInstructorsPageData } from "@/app/lib/services/users/get-all-instructors-page-data";
import { getApplicationsPageData } from "@/app/lib/services/users/get-applications-page-data";
import { getTeamContactsPageData } from "@/app/lib/services/users/get-team-contacts-page-data";
import { getTeamMembersPageData } from "@/app/lib/services/users/get-team-members-page-data";
import { getUserManagementPageData } from "@/app/lib/services/users/get-user-management-page-data";
import type { PageConfig } from "@/app/components/types/ui";

export async function getConfiguredPageData<Row extends { id: string }>(
  config: PageConfig<Row>,
): Promise<ConfiguredPageData<Row>> {
  const pageDataLoaders: Partial<Record<string, () => Promise<{ stats: unknown; rows: unknown }>>> = {
    "user-management": getUserManagementPageData,
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
    };
  }

  const response = await fetchConfiguredPageApiResponse(config);
  return mapConfiguredPageApiResponse(config, response);
}
