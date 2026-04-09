import type { SortDirection, StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type { ConfiguredPagePagination, ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import type { ListResponse, SummaryResponse } from "@/app/lib/types/api";

export type LegacyUserStatDto = {
  id: string;
  title: string;
  value: string;
  trend: {
    value: string;
    type: string;
  } | null;
};

export type LegacyUserDto = {
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

export type UserManagementApiResponse = ListResponse<LegacyUserDto> & {
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyUserDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type UserManagementSummaryApiResponse = SummaryResponse<LegacyUserStatDto>;

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

export type LegacyApplicationDto = {
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
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyApplicationDto[];
};

export type LegacyInstructorDto = {
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
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyInstructorDto[];
};

export type LegacyContractDto = {
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
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyContractDto[];
};

export type LegacyMemberDto = {
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
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyMemberDto[];
};

export type SimpleAdminPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
};
