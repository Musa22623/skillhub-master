import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type { ConfiguredPagePagination, ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import type { ListResponse, SummaryResponse } from "@/app/lib/types/api";
import type { SortDirection } from "@/app/components/types/ui";

export type AllProductsItemDto = {
  id: number;
  productId: string;
  title: string;
  type: string;
  status: string;
  enrollments: number;
  created: string;
  updated?: string;
  instructor?: {
    name: string;
  };
};

export type ProductStatDto = {
  id: string;
  title: string;
  value: string;
  trend: {
    value: string;
    type: string;
  } | null;
  icon?: StatConfig["icon"];
};

export type CatalogProductRecordDto = {
  id: string;
  name: string;
  subtitle?: string;
  owner?: string;
  plan?: string;
  location?: string;
  metric?: string;
  status: string;
  updatedAt: string;
};

export type AllProductsSummaryApiResponse = SummaryResponse<ProductStatDto>;

export type AllProductsQueryParams = {
  query?: string;
  status?: string;
  type?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type AllProductsListApiResponse = ListResponse<AllProductsItemDto> & {
  stats: readonly ProductStatDto[];
  rows: readonly AllProductsItemDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type AllProductsPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type AllProductsSummaryData = {
  stats: StatConfig[];
};

export type ProductCatalogQueryParams = {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
};

export type ProductCatalogListApiResponse = ListResponse<CatalogProductRecordDto> & {
  stats: readonly ProductStatDto[];
  rows: readonly CatalogProductRecordDto[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type ProductCatalogSummaryApiResponse = SummaryResponse<ProductStatDto>;

export type ProductCatalogPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
  pagination: ConfiguredPagePagination;
  query: ConfiguredPageQueryParams;
};

export type ProductCatalogSummaryData = {
  stats: StatConfig[];
};

export type CourseQueryParams = ProductCatalogQueryParams;
export type CourseListApiResponse = ProductCatalogListApiResponse;
export type CourseSummaryApiResponse = ProductCatalogSummaryApiResponse;
export type CoursePageData = ProductCatalogPageData;
export type CourseSummaryData = ProductCatalogSummaryData;

export type EventProductQueryParams = ProductCatalogQueryParams;
export type EventProductListApiResponse = ProductCatalogListApiResponse;
export type EventProductSummaryApiResponse = ProductCatalogSummaryApiResponse;
export type EventProductPageData = ProductCatalogPageData;
export type EventProductSummaryData = ProductCatalogSummaryData;

export type SessionInstanceQueryParams = ProductCatalogQueryParams;
export type SessionInstanceListApiResponse = ProductCatalogListApiResponse;
export type SessionInstanceSummaryApiResponse = ProductCatalogSummaryApiResponse;
export type SessionInstancePageData = ProductCatalogPageData;
export type SessionInstanceSummaryData = ProductCatalogSummaryData;

export type BundleQueryParams = ProductCatalogQueryParams;
export type BundleListApiResponse = ProductCatalogListApiResponse;
export type BundleSummaryApiResponse = ProductCatalogSummaryApiResponse;
export type BundlePageData = ProductCatalogPageData;
export type BundleSummaryData = ProductCatalogSummaryData;
