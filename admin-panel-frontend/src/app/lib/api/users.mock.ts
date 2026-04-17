import { legacyData } from "@/app/features/legacy/legacyData";
import type {
  AllInstructorsApiResponse,
  AllInstructorsListApiResponse,
  AllInstructorsQueryParams,
  AllInstructorsSummaryApiResponse,
  ApplicationsListApiResponse,
  ApplicationsQueryParams,
  ApplicationsSummaryApiResponse,
  ApplicationsApiResponse,
  InstructorApplicationDto,
  TeamContactDto,
  InstructorListItemDto,
  TeamMemberDto,
  UserManagementItemDto,
  UserStatDto,
  TeamContactsApiResponse,
  TeamContactsListApiResponse,
  TeamContactsQueryParams,
  TeamContactsSummaryApiResponse,
  TeamMembersListApiResponse,
  TeamMembersQueryParams,
  TeamMembersApiResponse,
  TeamMembersSummaryApiResponse,
  UserManagementApiResponse,
  UserManagementQueryParams,
  UserManagementSummaryApiResponse,
} from "@/app/lib/types/users";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";

type LegacyUserManagementPage = {
  datasets?: {
    statsData?: UserStatDto[];
    usersData?: UserManagementItemDto[];
  };
};

type StaticApplicationsPage = {
  datasets?: {
    statsData?: UserStatDto[];
    applicationsData?: InstructorApplicationDto[];
  };
};

type StaticAllInstructorsPage = {
  datasets?: {
    statsData?: UserStatDto[];
    instructorsData?: InstructorListItemDto[];
  };
};

type StaticTeamContactsPage = {
  datasets?: {
    statsData?: UserStatDto[];
    contractsData?: TeamContactDto[];
  };
};

type StaticTeamMembersPage = {
  datasets?: {
    statsData?: UserStatDto[];
    membersData?: TeamMemberDto[];
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

function rowSearchValue(row: UserManagementItemDto, fieldId: string) {
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

function sortRows(rows: UserManagementItemDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
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

function normalizeInstructorPayoutStatus(status: string) {
  switch (status.toLowerCase()) {
    case "eligible":
      return "Eligible";
    case "setup":
      return "Setup required";
    case "processing":
      return "Processing";
    case "hold":
      return "On hold";
    default:
      return toTitleCase(status);
  }
}

function instructorRowSearchValue(row: InstructorListItemDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.name, row.internalId].filter(Boolean).join(" ");
    case "email":
      return row.email;
    case "metric":
      return `${row.products.total} ${row.products.courses} ${row.products.events} ${row.products.bundles}`;
    case "status":
      return normalizeInstructorPayoutStatus(row.payoutStatus);
    case "updatedAt":
      return row.approvedDate;
    default:
      return [
        row.name,
        row.internalId,
        row.email,
        String(row.products.total),
        normalizeInstructorPayoutStatus(row.payoutStatus),
        row.approvedDate,
      ]
        .filter(Boolean)
        .join(" ");
    }
  }
function sortInstructorRows(rows: InstructorListItemDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.name
        : sortBy === "email"
          ? left.email
          : sortBy === "metric"
            ? left.products.total
            : sortBy === "status"
              ? normalizeInstructorPayoutStatus(left.payoutStatus)
              : sortBy === "updatedAt"
                ? left.approvedDate
                : "";
    const rightValue =
      sortBy === "name"
        ? right.name
        : sortBy === "email"
          ? right.email
          : sortBy === "metric"
            ? right.products.total
            : sortBy === "status"
              ? normalizeInstructorPayoutStatus(right.payoutStatus)
              : sortBy === "updatedAt"
                ? right.approvedDate
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

function toConfiguredInstructorQuery(params: AllInstructorsQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

function normalizeApplicationStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pending review";
    case "info":
      return "In review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return toTitleCase(status);
  }
}

function applicationRowSearchValue(row: InstructorApplicationDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.name, row.appId].filter(Boolean).join(" ");
    case "category":
      return row.category;
    case "stage":
      return row.experience;
    case "status":
      return normalizeApplicationStatus(row.status);
    case "updatedAt":
      return row.appliedFull ?? row.applied;
    default:
      return [
        row.name,
        row.appId,
        row.email,
        row.category,
        row.experience,
        normalizeApplicationStatus(row.status),
        row.appliedFull ?? row.applied,
      ]
        .filter(Boolean)
        .join(" ");
  }
}

function sortApplicationRows(rows: InstructorApplicationDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.name
        : sortBy === "category"
          ? left.category
          : sortBy === "stage"
            ? left.experience
            : sortBy === "status"
              ? normalizeApplicationStatus(left.status)
              : sortBy === "updatedAt"
                ? left.appliedFull ?? left.applied
                : "";
    const rightValue =
      sortBy === "name"
        ? right.name
        : sortBy === "category"
          ? right.category
          : sortBy === "stage"
            ? right.experience
            : sortBy === "status"
              ? normalizeApplicationStatus(right.status)
              : sortBy === "updatedAt"
                ? right.appliedFull ?? right.applied
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

function toConfiguredApplicationsQuery(params: ApplicationsQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

function normalizeTeamMemberStatus(status: string) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "Accepted";
    case "pending":
      return "Pending invite";
    case "removed":
      return "Removed";
    default:
      return toTitleCase(status);
  }
}

function teamMemberRowSearchValue(row: TeamMemberDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.name, row.planName].filter(Boolean).join(" ");
    case "email":
      return row.email;
    case "plan":
      return row.planName;
    case "count":
      return row.role;
    case "status":
      return normalizeTeamMemberStatus(row.status);
    default:
      return [
        row.name,
        row.email,
        row.planName,
        row.role,
        normalizeTeamMemberStatus(row.status),
        row.joinedFull ?? row.joined,
      ]
        .filter(Boolean)
        .join(" ");
    }
  }
function sortTeamMemberRows(rows: TeamMemberDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
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
            ? left.planName
            : sortBy === "count"
              ? left.role
              : sortBy === "status"
                ? normalizeTeamMemberStatus(left.status)
                : sortBy === "updatedAt"
                  ? left.joinedFull ?? left.joined
                  : "";
    const rightValue =
      sortBy === "name"
        ? right.name
        : sortBy === "email"
          ? right.email
          : sortBy === "plan"
            ? right.planName
            : sortBy === "count"
              ? right.role
              : sortBy === "status"
                ? normalizeTeamMemberStatus(right.status)
                : sortBy === "updatedAt"
                  ? right.joinedFull ?? right.joined
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

function toConfiguredTeamMembersQuery(params: TeamMembersQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

function normalizeTeamContactStatus(status: string) {
  if (status.toLowerCase() === "expiring") {
    return "Expiring";
  }

  return toTitleCase(status);
}

function teamContactRowSearchValue(row: TeamContactDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.manager.name, row.contractId].filter(Boolean).join(" ");
    case "email":
      return row.manager.email;
    case "location":
      return row.name;
    case "status":
      return normalizeTeamContactStatus(row.status);
    case "updatedAt":
      return row.expiry;
    default:
      return [
        row.manager.name,
        row.contractId,
        row.manager.email,
        row.name,
        row.model,
        normalizeTeamContactStatus(row.status),
        row.expiry,
      ]
        .filter(Boolean)
        .join(" ");
    }
  }
function sortTeamContactRows(rows: TeamContactDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.manager.name
        : sortBy === "email"
          ? left.manager.email
          : sortBy === "location"
            ? left.name
            : sortBy === "status"
              ? normalizeTeamContactStatus(left.status)
              : sortBy === "updatedAt"
                ? left.expiry
                : "";
    const rightValue =
      sortBy === "name"
        ? right.manager.name
        : sortBy === "email"
          ? right.manager.email
          : sortBy === "location"
            ? right.name
            : sortBy === "status"
              ? normalizeTeamContactStatus(right.status)
              : sortBy === "updatedAt"
                ? right.expiry
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

function toConfiguredTeamContactsQuery(params: TeamContactsQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
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
  const page = legacyData.applications as unknown as StaticApplicationsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.applicationsData ?? [],
  };
}

export async function fetchMockApplicationsListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: ApplicationsQueryParams): Promise<ApplicationsListApiResponse> {
  const page = legacyData.applications as unknown as StaticApplicationsPage | undefined;
  const sourceRows = [...(page?.datasets?.applicationsData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "category", "stage", "status", "updatedAt"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeApplicationStatus(row.status).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) =>
      applicationRowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery),
    );
  });

  const sortedRows = sortApplicationRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: page?.datasets?.statsData ?? [],
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredApplicationsQuery({
      query,
      status,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchMockApplicationsSummary(): Promise<ApplicationsSummaryApiResponse> {
  const page = legacyData.applications as unknown as StaticApplicationsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
  };
}

export async function fetchMockAllInstructorsPage(): Promise<AllInstructorsApiResponse> {
  const page = legacyData["all-instructors"] as unknown as StaticAllInstructorsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.instructorsData ?? [],
  };
}

export async function fetchMockAllInstructorsListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: AllInstructorsQueryParams): Promise<AllInstructorsListApiResponse> {
  const page = legacyData["all-instructors"] as unknown as StaticAllInstructorsPage | undefined;
  const sourceRows = [...(page?.datasets?.instructorsData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "email", "metric", "status", "updatedAt"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeInstructorPayoutStatus(row.payoutStatus).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) =>
      instructorRowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery),
    );
  });

  const sortedRows = sortInstructorRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: page?.datasets?.statsData ?? [],
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredInstructorQuery({
      query,
      status,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchMockAllInstructorsSummary(): Promise<AllInstructorsSummaryApiResponse> {
  const page = legacyData["all-instructors"] as unknown as StaticAllInstructorsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
  };
}

export async function fetchMockTeamContactsPage(): Promise<TeamContactsApiResponse> {
  const page = legacyData["team-contacts"] as unknown as StaticTeamContactsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.contractsData ?? [],
  };
}

export async function fetchMockTeamContactsListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: TeamContactsQueryParams): Promise<TeamContactsListApiResponse> {
  const page = legacyData["team-contacts"] as unknown as StaticTeamContactsPage | undefined;
  const sourceRows = [...(page?.datasets?.contractsData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "email", "location", "status", "updatedAt"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeTeamContactStatus(row.status).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) =>
      teamContactRowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery),
    );
  });

  const sortedRows = sortTeamContactRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: page?.datasets?.statsData ?? [],
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredTeamContactsQuery({
      query,
      status,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchMockTeamContactsSummary(): Promise<TeamContactsSummaryApiResponse> {
  const page = legacyData["team-contacts"] as unknown as StaticTeamContactsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
  };
}

export async function fetchMockTeamMembersPage(): Promise<TeamMembersApiResponse> {
  const page = legacyData["team-members"] as unknown as StaticTeamMembersPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.membersData ?? [],
  };
}

export async function fetchMockTeamMembersListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: TeamMembersQueryParams): Promise<TeamMembersListApiResponse> {
  const page = legacyData["team-members"] as unknown as StaticTeamMembersPage | undefined;
  const sourceRows = [...(page?.datasets?.membersData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "email", "plan", "count", "status"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeTeamMemberStatus(row.status).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) =>
      teamMemberRowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery),
    );
  });

  const sortedRows = sortTeamMemberRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: page?.datasets?.statsData ?? [],
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredTeamMembersQuery({
      query,
      status,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchMockTeamMembersSummary(): Promise<TeamMembersSummaryApiResponse> {
  const page = legacyData["team-members"] as unknown as StaticTeamMembersPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
  };
}
