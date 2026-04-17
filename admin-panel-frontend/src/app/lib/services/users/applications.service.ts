import { fetchApplicationsPage, fetchApplicationsSummary } from "@/app/lib/api/users.api";
import {
  mapApplicationsListResponse,
  mapApplicationsSummaryResponse,
} from "@/app/lib/mappers/users/applications.mapper";
import type {
  ApplicationsPageData,
  ApplicationsQueryParams,
  ApplicationsSummaryData,
} from "@/app/lib/types/users";

export async function getApplicationsListData(
  params: ApplicationsQueryParams,
): Promise<ApplicationsPageData> {
  const response = await fetchApplicationsPage(params);
  return mapApplicationsListResponse(response);
}

export async function getApplicationsSummaryData(): Promise<ApplicationsSummaryData> {
  const response = await fetchApplicationsSummary();
  return mapApplicationsSummaryResponse(response);
}
