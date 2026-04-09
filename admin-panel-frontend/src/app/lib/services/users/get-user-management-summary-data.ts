import { fetchUserManagementSummary } from "@/app/lib/api/users.api";
import { mapUserManagementSummaryApiResponse } from "@/app/lib/mappers/users.mapper";
import type { UserManagementSummaryData } from "@/app/lib/types/users";

export async function getUserManagementSummaryData(): Promise<UserManagementSummaryData> {
  const response = await fetchUserManagementSummary();
  return mapUserManagementSummaryApiResponse(response);
}
