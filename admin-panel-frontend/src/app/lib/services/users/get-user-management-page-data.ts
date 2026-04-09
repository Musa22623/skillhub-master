import { fetchUserManagementPage } from "@/app/lib/api/users.api";
import { mapUserManagementApiResponse } from "@/app/lib/mappers/users.mapper";
import type { UserManagementPageData, UserManagementQueryParams } from "@/app/lib/types/users";

export async function getUserManagementPageData(
  params: UserManagementQueryParams,
): Promise<UserManagementPageData> {
  const response = await fetchUserManagementPage(params);
  return mapUserManagementApiResponse(response);
}
