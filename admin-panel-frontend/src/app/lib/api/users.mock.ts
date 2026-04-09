import { legacyData } from "@/app/features/legacy/legacyData";
import type {
  AllInstructorsApiResponse,
  ApplicationsApiResponse,
  LegacyApplicationDto,
  LegacyContractDto,
  LegacyInstructorDto,
  LegacyMemberDto,
  LegacyUserDto,
  LegacyUserStatDto,
  TeamContactsApiResponse,
  TeamMembersApiResponse,
  UserManagementApiResponse,
  UserManagementQueryParams,
  UserManagementSummaryApiResponse,
} from "@/app/lib/types/users";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";

type LegacyUserManagementPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    usersData?: LegacyUserDto[];
  };
};

type LegacyApplicationsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    applicationsData?: LegacyApplicationDto[];
  };
};

type LegacyAllInstructorsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    instructorsData?: LegacyInstructorDto[];
  };
};

type LegacyTeamContactsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    contractsData?: LegacyContractDto[];
  };
};

type LegacyTeamMembersPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    membersData?: LegacyMemberDto[];
  };
};

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function normalizeUserStatus(status: string) {
  return status.toLowerCase() === "pending" ? "Pending" : toTitleCase(status);
}

function normalizeUserRole(role: string) {
  return toTitleCase(role);
}

function rowSearchValue(row: LegacyUserDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.name, row.internalId].filter(Boolean).join(" ");
    case "email":
      return row.email;
    case "plan":
      return normalizeUserRole(row.role);
    case "tags":
      return (row.tags ?? []).join(" ");
    case "status":
      return normalizeUserStatus(row.status);
    default:
      return [
        row.name,
        row.internalId,
        row.email,
        normalizeUserRole(row.role),
        (row.tags ?? []).join(" "),
        normalizeUserStatus(row.status),
      ]
        .filter(Boolean)
        .join(" ");
  }
}

function sortRows(rows: LegacyUserDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.name
        : sortBy === "email"
          ? left.email
          : sortBy === "plan"
            ? normalizeUserRole(left.role)
            : sortBy === "tags"
              ? (left.tags ?? []).join(", ")
              : sortBy === "status"
                ? normalizeUserStatus(left.status)
                : sortBy === "updatedAt"
                  ? left.lastLogin ?? left.joined
                  : "";
    const rightValue =
      sortBy === "name"
        ? right.name
        : sortBy === "email"
          ? right.email
          : sortBy === "plan"
            ? normalizeUserRole(right.role)
            : sortBy === "tags"
              ? (right.tags ?? []).join(", ")
              : sortBy === "status"
                ? normalizeUserStatus(right.status)
                : sortBy === "updatedAt"
                  ? right.lastLogin ?? right.joined
                  : "";

    if (leftValue < rightValue) {
      return sortDir === "asc" ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return sortDir === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function toConfiguredQuery(params: UserManagementQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
      role: params.role ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

export async function fetchMockUserManagementPage({
  query = "",
  status = "",
  role = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: UserManagementQueryParams): Promise<UserManagementApiResponse> {
  const legacyPage = legacyData["user-management"] as unknown as LegacyUserManagementPage | undefined;
  const sourceRows = [...(legacyPage?.datasets?.usersData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const normalizedRole = role.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "email", "plan", "tags", "status"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeUserStatus(row.status).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (normalizedRole && normalizeUserRole(row.role).toLowerCase() !== normalizedRole) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) => rowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery));
  });

  const sortedRows = sortRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: legacyPage?.datasets?.statsData ?? [],
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredQuery({
      query,
      status,
      role,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchMockUserManagementSummary(): Promise<UserManagementSummaryApiResponse> {
  const legacyPage = legacyData["user-management"] as unknown as LegacyUserManagementPage | undefined;

  return {
    stats: legacyPage?.datasets?.statsData ?? [],
  };
}

export async function fetchMockApplicationsPage(): Promise<ApplicationsApiResponse> {
  const page = legacyData.applications as unknown as LegacyApplicationsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.applicationsData ?? [],
  };
}

export async function fetchMockAllInstructorsPage(): Promise<AllInstructorsApiResponse> {
  const page = legacyData["all-instructors"] as unknown as LegacyAllInstructorsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.instructorsData ?? [],
  };
}

export async function fetchMockTeamContactsPage(): Promise<TeamContactsApiResponse> {
  const page = legacyData["team-contacts"] as unknown as LegacyTeamContactsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.contractsData ?? [],
  };
}

export async function fetchMockTeamMembersPage(): Promise<TeamMembersApiResponse> {
  const page = legacyData["team-members"] as unknown as LegacyTeamMembersPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.membersData ?? [],
  };
}
