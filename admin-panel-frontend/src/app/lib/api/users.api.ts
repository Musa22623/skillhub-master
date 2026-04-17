import type {
  AllInstructorsApiResponse,
  AllInstructorsListApiResponse,
  AllInstructorsQueryParams,
  AllInstructorsSummaryApiResponse,
  ApplicationsListApiResponse,
  ApplicationsQueryParams,
  ApplicationsSummaryApiResponse,
  ApplicationsApiResponse,
  TeamContactsListApiResponse,
  TeamContactsQueryParams,
  TeamContactsSummaryApiResponse,
  TeamContactsApiResponse,
  TeamMembersListApiResponse,
  TeamMembersQueryParams,
  TeamMembersSummaryApiResponse,
  TeamMembersApiResponse,
  UserManagementApiResponse,
  UserManagementQueryParams,
  UserManagementSummaryApiResponse,
} from "@/app/lib/types/users";
import { fetchAdminJson } from "@/app/lib/http/admin-client";
import {
  fetchMockAllInstructorsPage,
  fetchMockAllInstructorsListPage,
  fetchMockAllInstructorsSummary,
  fetchMockApplicationsListPage,
  fetchMockApplicationsPage,
  fetchMockApplicationsSummary,
  fetchMockTeamContactsListPage,
  fetchMockTeamContactsPage,
  fetchMockTeamContactsSummary,
  fetchMockTeamMembersListPage,
  fetchMockTeamMembersPage,
  fetchMockTeamMembersSummary,
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

export async function fetchApplicationsSummary(): Promise<ApplicationsSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<ApplicationsSummaryApiResponse>("/api/admin/applications/summary");
  }

  return fetchMockApplicationsSummary();
}

export async function fetchApplicationsPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: ApplicationsQueryParams = {}): Promise<ApplicationsListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<ApplicationsListApiResponse>("/api/admin/applications", {
      query: {
        query,
        status,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  return fetchMockApplicationsListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchApplicationsLegacyPage(): Promise<ApplicationsApiResponse> {
  return fetchMockApplicationsPage();
}

export async function fetchAllInstructorsSummary(): Promise<AllInstructorsSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<AllInstructorsSummaryApiResponse>("/api/admin/instructors/summary");
  }

  return fetchMockAllInstructorsSummary();
}

export async function fetchAllInstructorsPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: AllInstructorsQueryParams = {}): Promise<AllInstructorsListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<AllInstructorsListApiResponse>("/api/admin/instructors", {
      query: {
        query,
        status,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  return fetchMockAllInstructorsListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchAllInstructorsLegacyPage(): Promise<AllInstructorsApiResponse> {
  return fetchMockAllInstructorsPage();
}

export async function fetchTeamContactsSummary(): Promise<TeamContactsSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<TeamContactsSummaryApiResponse>("/api/admin/team-contacts/summary");
  }

  return fetchMockTeamContactsSummary();
}

export async function fetchTeamContactsPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: TeamContactsQueryParams = {}): Promise<TeamContactsListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<TeamContactsListApiResponse>("/api/admin/team-contacts", {
      query: {
        query,
        status,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  return fetchMockTeamContactsListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchTeamContactsLegacyPage(): Promise<TeamContactsApiResponse> {
  return fetchMockTeamContactsPage();
}

export async function fetchTeamMembersSummary(): Promise<TeamMembersSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<TeamMembersSummaryApiResponse>("/api/admin/team-members/summary");
  }

  return fetchMockTeamMembersSummary();
}

export async function fetchTeamMembersPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: TeamMembersQueryParams = {}): Promise<TeamMembersListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<TeamMembersListApiResponse>("/api/admin/team-members", {
      query: {
        query,
        status,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  return fetchMockTeamMembersListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchTeamMembersLegacyPage(): Promise<TeamMembersApiResponse> {
  return fetchMockTeamMembersPage();
}
