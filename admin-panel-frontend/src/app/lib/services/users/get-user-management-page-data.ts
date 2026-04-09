import { fetchUserManagementPage } from "@/app/lib/api/users.api";
import { mapUserManagementApiResponse } from "@/app/lib/mappers/users.mapper";
import type { UserManagementPageData } from "@/app/lib/types/users";

export async function getUserManagementPageData(): Promise<UserManagementPageData> {
  const response = await fetchUserManagementPage();
  return mapUserManagementApiResponse(response);
}
