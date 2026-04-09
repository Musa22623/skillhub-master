import { fetchApplicationsPage } from "@/app/lib/api/users.api";
import { mapApplicationsApiResponse } from "@/app/lib/mappers/users.mapper";

export async function getApplicationsPageData() {
  const response = await fetchApplicationsPage();
  return mapApplicationsApiResponse(response);
}
