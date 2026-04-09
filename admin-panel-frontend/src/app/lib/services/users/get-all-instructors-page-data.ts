import { fetchAllInstructorsPage } from "@/app/lib/api/users.api";
import { mapAllInstructorsApiResponse } from "@/app/lib/mappers/all-instructors.mapper";

export async function getAllInstructorsPageData() {
  const response = await fetchAllInstructorsPage();
  return mapAllInstructorsApiResponse(response);
}
