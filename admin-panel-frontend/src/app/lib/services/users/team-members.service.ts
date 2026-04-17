import { fetchTeamMembersPage, fetchTeamMembersSummary } from "@/app/lib/api/users.api";
import {
  mapTeamMembersListResponse,
  mapTeamMembersSummaryResponse,
} from "@/app/lib/mappers/users/team-members.mapper";
import type {
  TeamMembersPageData,
  TeamMembersQueryParams,
  TeamMembersSummaryData,
} from "@/app/lib/types/users";

export async function getTeamMembersListData(
  params: TeamMembersQueryParams,
): Promise<TeamMembersPageData> {
  const response = await fetchTeamMembersPage(params);
  return mapTeamMembersListResponse(response);
}

export async function getTeamMembersSummaryData(): Promise<TeamMembersSummaryData> {
  const response = await fetchTeamMembersSummary();
  return mapTeamMembersSummaryResponse(response);
}
