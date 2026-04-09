import { fetchTeamMembersPage } from "@/app/lib/api/users.api";
import { mapTeamMembersApiResponse } from "@/app/lib/mappers/users.mapper";

export async function getTeamMembersPageData() {
  const response = await fetchTeamMembersPage();
  return mapTeamMembersApiResponse(response);
}
