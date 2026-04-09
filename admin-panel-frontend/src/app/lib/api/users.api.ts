import type {
  AllInstructorsApiResponse,
  ApplicationsApiResponse,
  TeamContactsApiResponse,
  TeamMembersApiResponse,
  UserManagementApiResponse,
  UserManagementQueryParams,
  UserManagementSummaryApiResponse,
} from "@/app/lib/types/users";
import { fetchAdminJson } from "@/app/lib/http/admin-client";
import {
  fetchMockAllInstructorsPage,
  fetchMockApplicationsPage,
  fetchMockTeamContactsPage,
  fetchMockTeamMembersPage,
  fetchMockUserManagementPage,
  fetchMockUserManagementSummary,
} from "@/app/lib/api/users.mock";

const adminApiMode = process.env.NEXT_PUBLIC_ADMIN_API_MODE ?? "http";

function shouldUseHttpApi() {
  return adminApiMode === "http";
}

export async function fetchUserManagementSummary(): Promise<UserManagementSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<UserManagementSummaryApiResponse>("/api/admin/users/summary");
  }

  return fetchMockUserManagementSummary();
}

export async function fetchUserManagementPage({
  query = "",
  status = "",
  role = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: UserManagementQueryParams): Promise<UserManagementApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<UserManagementApiResponse>("/api/admin/users", {
      query: {
        query,
        status,
        role,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  return fetchMockUserManagementPage({
    query,
    status,
    role,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchApplicationsPage(): Promise<ApplicationsApiResponse> {
  return fetchMockApplicationsPage();
}

export async function fetchAllInstructorsPage(): Promise<AllInstructorsApiResponse> {
  return fetchMockAllInstructorsPage();
}

export async function fetchTeamContactsPage(): Promise<TeamContactsApiResponse> {
  return fetchMockTeamContactsPage();
}

export async function fetchTeamMembersPage(): Promise<TeamMembersApiResponse> {
  return fetchMockTeamMembersPage();
}
