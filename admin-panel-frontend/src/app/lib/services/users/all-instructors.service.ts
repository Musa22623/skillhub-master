import { fetchAllInstructorsPage, fetchAllInstructorsSummary } from "@/app/lib/api/users.api";
import {
  mapAllInstructorsListResponse,
  mapAllInstructorsSummaryResponse,
} from "@/app/lib/mappers/users/all-instructors.mapper";
import type {
  AllInstructorsPageData,
  AllInstructorsQueryParams,
  AllInstructorsSummaryData,
} from "@/app/lib/types/users";

export async function getAllInstructorsListData(
  params: AllInstructorsQueryParams,
): Promise<AllInstructorsPageData> {
  const response = await fetchAllInstructorsPage(params);
  return mapAllInstructorsListResponse(response);
}

export async function getAllInstructorsSummaryData(): Promise<AllInstructorsSummaryData> {
  const response = await fetchAllInstructorsSummary();
  return mapAllInstructorsSummaryResponse(response);
}
