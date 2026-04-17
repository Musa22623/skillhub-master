import { fetchTeamContactsPage, fetchTeamContactsSummary } from "@/app/lib/api/users.api";
import {
  mapTeamContactsListResponse,
  mapTeamContactsSummaryResponse,
} from "@/app/lib/mappers/users/team-contacts.mapper";
import type {
  TeamContactsPageData,
  TeamContactsQueryParams,
  TeamContactsSummaryData,
} from "@/app/lib/types/users";

export async function getTeamContactsListData(
  params: TeamContactsQueryParams,
): Promise<TeamContactsPageData> {
  const response = await fetchTeamContactsPage(params);
  return mapTeamContactsListResponse(response);
}

export async function getTeamContactsSummaryData(): Promise<TeamContactsSummaryData> {
  const response = await fetchTeamContactsSummary();
  return mapTeamContactsSummaryResponse(response);
}
