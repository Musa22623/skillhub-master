import { fetchUserManagementPage, fetchUserManagementSummary } from "@/app/lib/api/users.api";
import {
  mapUserManagementListResponse,
  mapUserManagementSummaryResponse,
} from "@/app/lib/mappers/users/user-management.mapper";
import type {
  UserManagementPageData,
  UserManagementQueryParams,
  UserManagementSummaryData,
} from "@/app/lib/types/users";

export async function getUserManagementListData(
  params: UserManagementQueryParams,
): Promise<UserManagementPageData> {
  const response = await fetchUserManagementPage(params);
  return mapUserManagementListResponse(response);
}

export async function getUserManagementSummaryData(): Promise<UserManagementSummaryData> {
  const response = await fetchUserManagementSummary();
  return mapUserManagementSummaryResponse(response);
}
