import { legacyData } from "@/app/features/legacy/legacyData";
import { fetchAdminJson } from "@/app/lib/http/admin-client";
import type {
  AllProductsItemDto,
  AllProductsListApiResponse,
  AllProductsQueryParams,
  AllProductsSummaryApiResponse,
  BundleListApiResponse,
  BundleQueryParams,
  BundleSummaryApiResponse,
  CourseListApiResponse,
  CourseQueryParams,
  CourseSummaryApiResponse,
  EventProductListApiResponse,
  EventProductQueryParams,
  EventProductSummaryApiResponse,
  ProductStatDto,
  SessionInstanceListApiResponse,
  SessionInstanceQueryParams,
  SessionInstanceSummaryApiResponse,
} from "@/app/lib/types/products";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import {
  fetchMockBundlesListPage,
  fetchMockBundlesSummary,
  fetchMockCoursesListPage,
  fetchMockCoursesSummary,
  fetchMockEventProductsListPage,
  fetchMockEventProductsSummary,
  fetchMockSessionInstancesListPage,
  fetchMockSessionInstancesSummary,
} from "@/app/lib/api/products.mock";

type StaticAllProductsPage = {
  datasets?: {
    statsData?: ProductStatDto[];
    productsData?: AllProductsItemDto[];
  };
};

const adminApiMode = process.env.NEXT_PUBLIC_ADMIN_API_MODE ?? "http";

function shouldUseHttpApi() {
  return adminApiMode === "http";
}

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function normalizeProductStatus(status: string) {
  if (status.toLowerCase() === "published") {
    return "Published";
  }
  if (status.toLowerCase() === "pending") {
    return "Pending approval";
  }
  return toTitleCase(status);
}

function normalizeProductType(type: string) {
  return toTitleCase(type);
}

function productRowSearchValue(row: AllProductsItemDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.title, row.productId].filter(Boolean).join(" ");
    case "category":
      return normalizeProductType(row.type);
    case "owner":
      return row.instructor?.name ?? "";
    case "metric":
      return String(row.enrollments);
    case "status":
      return normalizeProductStatus(row.status);
    default:
      return [
        row.title,
        row.productId,
        normalizeProductType(row.type),
        row.instructor?.name ?? "",
        String(row.enrollments),
        normalizeProductStatus(row.status),
        row.updated ?? row.created,
      ]
        .filter(Boolean)
        .join(" ");
    }
  }
function sortProductRows(rows: AllProductsItemDto[], sortBy?: string, sortDir: "asc" | "desc" = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.title
        : sortBy === "category"
          ? normalizeProductType(left.type)
          : sortBy === "owner"
            ? left.instructor?.name ?? ""
            : sortBy === "metric"
              ? left.enrollments
              : sortBy === "status"
                ? normalizeProductStatus(left.status)
                : sortBy === "updatedAt"
                  ? left.updated ?? left.created
                  : "";
    const rightValue =
      sortBy === "name"
        ? right.title
        : sortBy === "category"
          ? normalizeProductType(right.type)
          : sortBy === "owner"
            ? right.instructor?.name ?? ""
            : sortBy === "metric"
              ? right.enrollments
              : sortBy === "status"
                ? normalizeProductStatus(right.status)
                : sortBy === "updatedAt"
                  ? right.updated ?? right.created
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

function toConfiguredProductsQuery(params: AllProductsQueryParams): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
      type: params.type ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

export async function fetchAllProductsSummary(): Promise<AllProductsSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<AllProductsSummaryApiResponse>("/api/admin/products/summary");
  }

  const page = legacyData["all-products"] as unknown as StaticAllProductsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
  };
}

export async function fetchAllProductsListPage({
  query = "",
  status = "",
  type = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: AllProductsQueryParams = {}): Promise<AllProductsListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<AllProductsListApiResponse>("/api/admin/products", {
      query: {
        query,
        status,
        type,
        sortBy,
        sortDir,
        page: pageNumber,
        pageSize,
        searchFields,
      },
    });
  }

  const page = legacyData["all-products"] as unknown as StaticAllProductsPage | undefined;
  const sourceRows = [...(page?.datasets?.productsData ?? [])];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const normalizedType = type.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : ["name", "category", "owner", "metric", "status"];

  const filteredRows = sourceRows.filter((row) => {
    if (normalizedStatus && normalizeProductStatus(row.status).toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (normalizedType && normalizeProductType(row.type).toLowerCase() !== normalizedType) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) =>
      productRowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery),
    );
  });

  const sortedRows = sortProductRows(filteredRows, sortBy, sortDir);
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
    query: toConfiguredProductsQuery({
      query,
      status,
      type,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

export async function fetchCoursesSummary(): Promise<CourseSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<CourseSummaryApiResponse>("/api/admin/courses/summary");
  }

  return fetchMockCoursesSummary();
}

export async function fetchCoursesListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: CourseQueryParams = {}): Promise<CourseListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<CourseListApiResponse>("/api/admin/courses", {
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

  return fetchMockCoursesListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchEventProductsSummary(): Promise<EventProductSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<EventProductSummaryApiResponse>("/api/admin/event-products/summary");
  }

  return fetchMockEventProductsSummary();
}

export async function fetchEventProductsListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: EventProductQueryParams = {}): Promise<EventProductListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<EventProductListApiResponse>("/api/admin/event-products", {
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

  return fetchMockEventProductsListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchSessionInstancesSummary(): Promise<SessionInstanceSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<SessionInstanceSummaryApiResponse>("/api/admin/session-instances/summary");
  }

  return fetchMockSessionInstancesSummary();
}

export async function fetchSessionInstancesListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: SessionInstanceQueryParams = {}): Promise<SessionInstanceListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<SessionInstanceListApiResponse>("/api/admin/session-instances", {
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

  return fetchMockSessionInstancesListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}

export async function fetchBundlesSummary(): Promise<BundleSummaryApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<BundleSummaryApiResponse>("/api/admin/bundles/summary");
  }

  return fetchMockBundlesSummary();
}

export async function fetchBundlesListPage({
  query = "",
  status = "",
  sortBy,
  sortDir = "asc",
  page: pageNumber = 1,
  pageSize = 25,
  searchFields = [],
}: BundleQueryParams = {}): Promise<BundleListApiResponse> {
  if (shouldUseHttpApi()) {
    return fetchAdminJson<BundleListApiResponse>("/api/admin/bundles", {
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

  return fetchMockBundlesListPage({
    query,
    status,
    sortBy,
    sortDir,
    page: pageNumber,
    pageSize,
    searchFields,
  });
}
