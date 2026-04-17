import type { PageConfig } from "@/app/components/types/ui";
import type { ConfiguredPageData, ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import { getAllProductsListData, getAllProductsSummaryData } from "@/app/lib/services/products/all-products.service";
import { getBundlesListData, getBundlesSummaryData } from "@/app/lib/services/products/bundles.service";
import { getCoursesListData, getCoursesSummaryData } from "@/app/lib/services/products/courses.service";
import { getEventProductsListData, getEventProductsSummaryData } from "@/app/lib/services/products/event-products.service";
import { getSessionInstancesListData, getSessionInstancesSummaryData } from "@/app/lib/services/products/session-instances.service";
import type { FilterConfig, FilterValue, TableColumn } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import { getAllInstructorsListData, getAllInstructorsSummaryData } from "@/app/lib/services/users/all-instructors.service";
import { getApplicationsListData, getApplicationsSummaryData } from "@/app/lib/services/users/applications.service";
import { getTeamContactsListData, getTeamContactsSummaryData } from "@/app/lib/services/users/team-contacts.service";
import { getTeamMembersListData, getTeamMembersSummaryData } from "@/app/lib/services/users/team-members.service";
import { getUserManagementListData, getUserManagementSummaryData } from "@/app/lib/services/users/user-management.service";
import type {
  AllProductsPageData,
  AllProductsQueryParams,
  AllProductsSummaryData,
  BundlePageData,
  BundleQueryParams,
  BundleSummaryData,
  CoursePageData,
  CourseQueryParams,
  CourseSummaryData,
  EventProductPageData,
  EventProductQueryParams,
  EventProductSummaryData,
  SessionInstancePageData,
  SessionInstanceQueryParams,
  SessionInstanceSummaryData,
} from "@/app/lib/types/products";
import type {
  AllInstructorsPageData,
  AllInstructorsQueryParams,
  AllInstructorsSummaryData,
  ApplicationsPageData,
  ApplicationsQueryParams,
  ApplicationsSummaryData,
  TeamContactsPageData,
  TeamContactsQueryParams,
  TeamContactsSummaryData,
  TeamMembersPageData,
  TeamMembersQueryParams,
  TeamMembersSummaryData,
  UserManagementPageData,
  UserManagementQueryParams,
  UserManagementSummaryData,
} from "@/app/lib/types/users";

type ServerConfiguredPageHandler<Row extends { id: string }> = {
  getPageData?: (config: PageConfig<Row>, query?: ConfiguredPageQueryParams) => Promise<ConfiguredPageData<Row>>;
  getShellData?: (config: PageConfig<Row>) => Promise<ConfiguredPageData<Row>>;
  getTableData: (config: PageConfig<Row>, query: ConfiguredPageQueryParams) => Promise<ConfiguredPageData<Row>>;
};

type PageDataWithStats<Row extends { id: string }> = {
  stats: ConfiguredPageData<Row>["stats"];
  rows: ConfiguredPageData<Row>["rows"];
  pagination?: ConfiguredPageData<Row>["pagination"];
  query?: ConfiguredPageData<Row>["query"];
};

type SummaryData<Row extends { id: string }> = {
  stats: ConfiguredPageData<Row>["stats"];
};

type InlineServerPageRow = AdminRecord & { id: string };

function getStringFilter(query: ConfiguredPageQueryParams | undefined, filterId: string) {
  const value = query?.filters?.[filterId];
  return typeof value === "string" ? value : undefined;
}

function mapCommonServerQueryParams(query: ConfiguredPageQueryParams | undefined) {
  return {
    query: query?.query,
    sortBy: query?.sortBy,
    sortDir: query?.sortDir,
    page: query?.page,
    pageSize: query?.pageSize,
    searchFields: query?.searchFields,
  };
}

function mapUserManagementServerQuery(query: ConfiguredPageQueryParams | undefined): UserManagementQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
    role: getStringFilter(query, "role"),
  };
}

function mapAllProductsServerQuery(query: ConfiguredPageQueryParams | undefined): AllProductsQueryParams {
  return {
    query: query?.query,
    status: getStringFilter(query, "status"),
    type: getStringFilter(query, "type"),
    sortBy: query?.sortBy,
    sortDir: query?.sortDir,
    page: query?.page,
    pageSize: query?.pageSize,
    searchFields: query?.searchFields,
  };
}

function mapProductCatalogServerQuery(query: ConfiguredPageQueryParams | undefined): CourseQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
  };
}

function mapAllInstructorsServerQuery(query: ConfiguredPageQueryParams | undefined): AllInstructorsQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
  };
}

function mapApplicationsServerQuery(query: ConfiguredPageQueryParams | undefined): ApplicationsQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
  };
}

function mapTeamMembersServerQuery(query: ConfiguredPageQueryParams | undefined): TeamMembersQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
  };
}

function mapTeamContactsServerQuery(query: ConfiguredPageQueryParams | undefined): TeamContactsQueryParams {
  return {
    ...mapCommonServerQueryParams(query),
    status: getStringFilter(query, "status"),
  };
}

function buildShellData<Row extends { id: string }>(
  config: PageConfig<Row>,
  summary: SummaryData<Row>,
): ConfiguredPageData<Row> {
  return {
    source: "mock-legacy",
    columns: config.columns,
    stats: summary.stats,
  };
}

function buildPageData<Row extends { id: string }>(
  config: PageConfig<Row>,
  pageData: PageDataWithStats<Row>,
): ConfiguredPageData<Row> {
  return {
    source: "mock-legacy",
    columns: config.columns,
    stats: pageData.stats,
    rows: pageData.rows,
    pagination: pageData.pagination,
    query: pageData.query,
  };
}

function buildTableData<Row extends { id: string }>(
  config: PageConfig<Row>,
  pageData: PageDataWithStats<Row>,
): ConfiguredPageData<Row> {
  return {
    source: "mock-legacy",
    columns: config.columns,
    rows: pageData.rows,
    pagination: pageData.pagination,
    query: pageData.query,
  };
}

function normalizeFilterValue(rawValue: FilterValue | undefined) {
  if (Array.isArray(rawValue)) {
    return rawValue.map((value) => value.toLowerCase());
  }

  return rawValue ? [rawValue.toLowerCase()] : [];
}

function applyInlineFilters<Row extends { id: string }>(
  rows: Row[],
  columns: TableColumn<Row>[],
  filters: FilterConfig[],
  query: ConfiguredPageQueryParams,
  selectedSearchFields: string[],
) {
  return rows.filter((row) =>
    filters.every((filter) => {
      const value = query.filters?.[filter.id];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return true;
      }

      if (filter.type === "search") {
        if (Array.isArray(value)) {
          return true;
        }

        const searchableColumns = columns.filter(
          (column) => column.searchValue && (selectedSearchFields.length === 0 || selectedSearchFields.includes(column.id)),
        );

        return searchableColumns.some((column) =>
          (column.searchValue?.(row) ?? "").toLowerCase().includes(value.toLowerCase()),
        );
      }

      const targetedColumn = filter.columnId ? columns.find((column) => column.id === filter.columnId) : undefined;
      const targetedValue = targetedColumn
        ? String(targetedColumn.searchValue?.(row) ?? targetedColumn.sortValue?.(row) ?? "")
        : JSON.stringify(row);
      const normalizedTarget = targetedValue.toLowerCase();
      const normalizedValues = normalizeFilterValue(value);

      if (normalizedValues.length === 0) {
        return true;
      }

      if (filter.matchMode === "equals") {
        return normalizedValues.some((item) => normalizedTarget === item);
      }

      return normalizedValues.some((item) => normalizedTarget.includes(item));
    }),
  );
}

function sortInlineRows<Row extends { id: string }>(
  rows: Row[],
  columns: TableColumn<Row>[],
  query: ConfiguredPageQueryParams,
) {
  if (!query.sortBy) {
    return rows;
  }

  const sortColumn = columns.find((column) => column.id === query.sortBy);
  if (!sortColumn?.sortValue) {
    return rows;
  }

  const direction = query.sortDir ?? "asc";

  return [...rows].sort((left, right) => {
    const leftValue = sortColumn.sortValue?.(left) ?? "";
    const rightValue = sortColumn.sortValue?.(right) ?? "";

    if (leftValue < rightValue) {
      return direction === "asc" ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function createInlineConfiguredPageHandler<Row extends InlineServerPageRow>(): ServerConfiguredPageHandler<Row> {
  async function resolvePageData(config: PageConfig<Row>, query?: ConfiguredPageQueryParams): Promise<ConfiguredPageData<Row>> {
    const filters = config.filters ?? [];
    const searchFields = query?.searchFields ?? [];
    const page = query?.page ?? 1;
    const pageSize = query?.pageSize ?? config.defaultPageSize ?? 25;
    const filteredRows = applyInlineFilters(
      (config.rows ?? []) as Row[],
      (config.columns ?? []) as TableColumn<Row>[],
      filters,
      query ?? {},
      searchFields,
    );
    const sortedRows = sortInlineRows(filteredRows, (config.columns ?? []) as TableColumn<Row>[], query ?? {});
    const startIndex = (page - 1) * pageSize;
    const pagedRows = sortedRows.slice(startIndex, startIndex + pageSize);

    return {
      source: "mock-config",
      columns: config.columns,
      stats: config.stats,
      rows: pagedRows,
      pagination: {
        page,
        pageSize,
        totalRows: sortedRows.length,
      },
      query,
    };
  }

  return {
    getPageData: resolvePageData,
    async getShellData(config) {
      return {
        source: "mock-config",
        columns: config.columns,
        stats: config.stats,
      };
    },
    async getTableData(config, query) {
      const fullData = await resolvePageData(config, query);
      return {
        source: fullData?.source ?? "mock-config",
        columns: config.columns,
        rows: fullData?.rows,
        pagination: fullData?.pagination,
        query: fullData?.query,
      };
    },
  };
}

function createServerConfiguredPageHandler<Row extends { id: string }, QueryParams, PageResult extends PageDataWithStats<Row>, SummaryResult extends SummaryData<Row>>({
  mapQuery,
  getPageData,
  getSummaryData,
}: {
  mapQuery: (query: ConfiguredPageQueryParams | undefined) => QueryParams;
  getPageData: (params: QueryParams) => Promise<PageResult>;
  getSummaryData: () => Promise<SummaryResult>;
}): ServerConfiguredPageHandler<Row> {
  return {
    async getPageData(config, query) {
      return buildPageData(config, await getPageData(mapQuery(query)));
    },
    async getShellData(config) {
      return buildShellData(config, await getSummaryData());
    },
    async getTableData(config, query) {
      return buildTableData(config, await getPageData(mapQuery(query)));
    },
  };
}

const serverConfiguredPagesRegistry: Record<string, ServerConfiguredPageHandler<{ id: string }>> = {
  "all-products": createServerConfiguredPageHandler<{ id: string }, AllProductsQueryParams, AllProductsPageData, AllProductsSummaryData>({
    mapQuery: mapAllProductsServerQuery,
    getPageData: getAllProductsListData,
    getSummaryData: getAllProductsSummaryData,
  }),
  courses: createServerConfiguredPageHandler<{ id: string }, CourseQueryParams, CoursePageData, CourseSummaryData>({
    mapQuery: mapProductCatalogServerQuery,
    getPageData: getCoursesListData,
    getSummaryData: getCoursesSummaryData,
  }),
  "event-products": createServerConfiguredPageHandler<{ id: string }, EventProductQueryParams, EventProductPageData, EventProductSummaryData>({
    mapQuery: mapProductCatalogServerQuery,
    getPageData: getEventProductsListData,
    getSummaryData: getEventProductsSummaryData,
  }),
  "session-instances": createServerConfiguredPageHandler<{ id: string }, SessionInstanceQueryParams, SessionInstancePageData, SessionInstanceSummaryData>({
    mapQuery: mapProductCatalogServerQuery,
    getPageData: getSessionInstancesListData,
    getSummaryData: getSessionInstancesSummaryData,
  }),
  bundles: createServerConfiguredPageHandler<{ id: string }, BundleQueryParams, BundlePageData, BundleSummaryData>({
    mapQuery: mapProductCatalogServerQuery,
    getPageData: getBundlesListData,
    getSummaryData: getBundlesSummaryData,
  }),
  "user-management": createServerConfiguredPageHandler<{ id: string }, UserManagementQueryParams, UserManagementPageData, UserManagementSummaryData>({
    mapQuery: mapUserManagementServerQuery,
    getPageData: getUserManagementListData,
    getSummaryData: getUserManagementSummaryData,
  }),
  "all-instructors": createServerConfiguredPageHandler<{ id: string }, AllInstructorsQueryParams, AllInstructorsPageData, AllInstructorsSummaryData>({
    mapQuery: mapAllInstructorsServerQuery,
    getPageData: getAllInstructorsListData,
    getSummaryData: getAllInstructorsSummaryData,
  }),
  applications: createServerConfiguredPageHandler<{ id: string }, ApplicationsQueryParams, ApplicationsPageData, ApplicationsSummaryData>({
    mapQuery: mapApplicationsServerQuery,
    getPageData: getApplicationsListData,
    getSummaryData: getApplicationsSummaryData,
  }),
  "team-contacts": createServerConfiguredPageHandler<{ id: string }, TeamContactsQueryParams, TeamContactsPageData, TeamContactsSummaryData>({
    mapQuery: mapTeamContactsServerQuery,
    getPageData: getTeamContactsListData,
    getSummaryData: getTeamContactsSummaryData,
  }),
  "team-members": createServerConfiguredPageHandler<{ id: string }, TeamMembersQueryParams, TeamMembersPageData, TeamMembersSummaryData>({
    mapQuery: mapTeamMembersServerQuery,
    getPageData: getTeamMembersListData,
    getSummaryData: getTeamMembersSummaryData,
  }),
};

export function getServerConfiguredPageHandler<Row extends { id: string }>(
  config: PageConfig<Row>,
): ServerConfiguredPageHandler<Row> | undefined {
  const explicitHandler = serverConfiguredPagesRegistry[config.id] as unknown as ServerConfiguredPageHandler<Row> | undefined;
  if (explicitHandler) {
    return explicitHandler;
  }

  if (config.dataMode === "server" && !config.component && !config.tabs && config.columns && config.rows) {
    return createInlineConfiguredPageHandler<Row & InlineServerPageRow>() as unknown as ServerConfiguredPageHandler<Row>;
  }

  return undefined;
}
