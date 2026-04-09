import { fetchTeamContactsPage } from "@/app/lib/api/users.api";
import { mapTeamContactsApiResponse } from "@/app/lib/mappers/users.mapper";

export async function getTeamContactsPageData() {
  const response = await fetchTeamContactsPage();
  return mapTeamContactsApiResponse(response);
}
