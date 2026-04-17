import type { SortDirection, StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type { ConfiguredPagePagination, ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import type { ListResponse, SummaryResponse } from "@/app/lib/types/api";

export type UserStatDto = {
  id: string;
  title: string;
  value: string;
  trend: {
    value: string;
    type: string;
  } | null;
};

export type UserManagementItemDto = {
  id: number;
  name: string;
  internalId: string;
  lwId: string;
  email: string;
  role: string;
  status: string;
  joined: string;
  joinedFull?: string;
  lastLogin?: string;
  ip?: string;
  lastIp?: string;
  avatar?: string;
  tags?: string[];
  viewLinks?: string[];
  linkedTo?: string[];
};

export type UserManagementApiResponse = ListResponse<UserManagementItemDto> & {
  stats: readonly UserStatDto[];
  rows: readonly UserManagementItemDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type UserManagementSummaryApiResponse = SummaryResponse<UserStatDto>;

export type UserManagementPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type UserManagementSummaryData = {
  stats: StatConfig[];
};

export type UserManagementQueryParams = {
  query?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type InstructorApplicationDto = {
  id: number;
  appId: string;
  name: string;
  email: string;
  avatar?: string;
  applied: string;
  appliedFull?: string;
  category: string;
  experience: string;
  status: string;
};

export type ApplicationsApiResponse = {
  stats: readonly UserStatDto[];
  rows: readonly InstructorApplicationDto[];
};

export type ApplicationsSummaryApiResponse = SummaryResponse<UserStatDto>;

export type ApplicationsQueryParams = {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type ApplicationsListApiResponse = ListResponse<InstructorApplicationDto> & {
  stats: readonly UserStatDto[];
  rows: readonly InstructorApplicationDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type InstructorListItemDto = {
  id: number;
  name: string;
  email: string;
  internalId: string;
  lwId: string;
  avatar?: string;
  approvedDate: string;
  products: {
    total: number;
    courses: number;
    events: number;
    bundles: number;
  };
  totalSales: string;
  payoutStatus: string;
  lastPayout: {
    amount: string;
    date: string;
  };
  pending: string;
};

export type AllInstructorsApiResponse = {
  stats: readonly UserStatDto[];
  rows: readonly InstructorListItemDto[];
};

export type AllInstructorsSummaryApiResponse = SummaryResponse<UserStatDto>;

export type AllInstructorsQueryParams = {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type AllInstructorsListApiResponse = ListResponse<InstructorListItemDto> & {
  stats: readonly UserStatDto[];
  rows: readonly InstructorListItemDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type TeamContactDto = {
  id: number;
  contractId: string;
  name: string;
  manager: {
    name: string;
    email: string;
  };
  model: string;
  status: string;
  expiry: string;
};

export type TeamContactsApiResponse = {
  stats: readonly UserStatDto[];
  rows: readonly TeamContactDto[];
};

export type TeamContactsSummaryApiResponse = SummaryResponse<UserStatDto>;

export type TeamContactsQueryParams = {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type TeamContactsListApiResponse = ListResponse<TeamContactDto> & {
  stats: readonly UserStatDto[];
  rows: readonly TeamContactDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type TeamMemberDto = {
  id: number;
  name: string;
  email: string;
  planName: string;
  role: string;
  status: string;
  joined: string;
  joinedFull?: string;
};

export type TeamMembersApiResponse = {
  stats: readonly UserStatDto[];
  rows: readonly TeamMemberDto[];
};

export type TeamMembersSummaryApiResponse = SummaryResponse<UserStatDto>;

export type TeamMembersQueryParams = {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type TeamMembersListApiResponse = ListResponse<TeamMemberDto> & {
  stats: readonly UserStatDto[];
  rows: readonly TeamMemberDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type SimpleAdminPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
};

export type AllInstructorsPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type AllInstructorsSummaryData = {
  stats: StatConfig[];
};

export type ApplicationsPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type ApplicationsSummaryData = {
  stats: StatConfig[];
};

export type TeamMembersPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type TeamMembersSummaryData = {
  stats: StatConfig[];
};

export type TeamContactsPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type TeamContactsSummaryData = {
  stats: StatConfig[];
};
