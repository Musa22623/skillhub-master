import type { PageConfig, FilterValue, SortDirection } from "@/app/components/types/ui";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";

function normalizePage(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function normalizeSortDirection(value: string | null | undefined): SortDirection | undefined {
  if (value === "asc" || value === "desc") {
    return value;
  }

  return undefined;
}

function parseFilterValue(rawValue: string | null, selectionMode?: "single" | "multiple"): FilterValue {
  if (!rawValue) {
    return selectionMode === "multiple" ? [] : "";
  }

  if (selectionMode === "multiple") {
    return rawValue
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
  }

  return rawValue;
}

function serializeFilterValue(value: FilterValue | undefined) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(",") : "";
  }

  return value ?? "";
}

export function getDefaultConfiguredPageQuery<Row>(
  config: PageConfig<Row>,
): ConfiguredPageQueryParams {
  return {
    query: "",
    filters: {},
    sortBy: config.defaultSortColumn,
    sortDir: config.defaultSortColumn ? "asc" : undefined,
    page: 1,
    pageSize: config.defaultPageSize ?? 25,
    searchFields: config.enableSearchFieldSelector
      ? (config.searchFields ?? []).map((field) => field.id)
      : [],
  };
}

export function parseConfiguredPageQuery<Row>(
  config: PageConfig<Row>,
  searchParams: Pick<URLSearchParams, "get">,
): ConfiguredPageQueryParams {
  const defaults = getDefaultConfiguredPageQuery(config);
  const filters: Record<string, FilterValue> = {};

  for (const filter of config.filters ?? []) {
    filters[filter.id] = parseFilterValue(searchParams.get(filter.id), filter.selectionMode);
  }

  const searchFilter = (config.filters ?? []).find((filter) => filter.type === "search");
  const rawSearchFields = searchParams.get("searchFields");
  const validSearchFields = new Set((config.searchFields ?? []).map((field) => field.id));
  const searchFields = rawSearchFields
    ? rawSearchFields
        .split(",")
        .map((value: string) => value.trim())
        .filter((value: string) => validSearchFields.has(value))
    : defaults.searchFields;

  const page = normalizePage(searchParams.get("page"), defaults.page ?? 1);
  const pageSize = normalizePage(searchParams.get("pageSize"), defaults.pageSize ?? 25);
  const sortBy = searchParams.get("sortBy") ?? defaults.sortBy;
  const sortDir = normalizeSortDirection(searchParams.get("sortDir")) ?? (sortBy ? defaults.sortDir ?? "asc" : undefined);
  const queryValue = searchFilter ? filters[searchFilter.id] : defaults.query;

  return {
    query: typeof queryValue === "string" ? queryValue : defaults.query,
    filters,
    sortBy: sortBy ?? undefined,
    sortDir,
    page,
    pageSize,
    searchFields,
  };
}

export function mergeConfiguredPageQuery(
  current: ConfiguredPageQueryParams,
  next: Partial<ConfiguredPageQueryParams>,
): ConfiguredPageQueryParams {
  return {
    ...current,
    ...next,
    filters: {
      ...(current.filters ?? {}),
      ...(next.filters ?? {}),
    },
  };
}

export function buildConfiguredPageSearchParams<Row>(
  config: PageConfig<Row>,
  query: ConfiguredPageQueryParams,
): URLSearchParams {
  const searchParams = new URLSearchParams();

  for (const filter of config.filters ?? []) {
    const value = serializeFilterValue(query.filters?.[filter.id]);
    if (value) {
      searchParams.set(filter.id, value);
    }
  }

  if (query.sortBy) {
    searchParams.set("sortBy", query.sortBy);
  }

  if (query.sortDir) {
    searchParams.set("sortDir", query.sortDir);
  }

  if ((query.page ?? 1) > 1) {
    searchParams.set("page", String(query.page));
  }

  if ((query.pageSize ?? (config.defaultPageSize ?? 25)) !== (config.defaultPageSize ?? 25)) {
    searchParams.set("pageSize", String(query.pageSize));
  }

  if (config.enableSearchFieldSelector && query.searchFields && query.searchFields.length > 0) {
    searchParams.set("searchFields", query.searchFields.join(","));
  }

  return searchParams;
}
