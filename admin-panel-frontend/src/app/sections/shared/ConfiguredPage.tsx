"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/app/components/ui/DataTable";
import { Tabs } from "@/app/components/ui/Tabs";
import { FilterToolbar } from "@/app/components/page/FilterToolbar";
import { PageHeader } from "@/app/components/page/PageHeader";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { TableSection } from "@/app/components/page/TableSection";
import { Card } from "@/app/components/ui/Card";
import {
  buildConfiguredPageSearchParams,
  getDefaultConfiguredPageQuery,
  mergeConfiguredPageQuery,
  parseConfiguredPageQuery,
} from "@/app/lib/configured-page-query";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
import { getConfiguredPageTableData } from "@/app/lib/services/admin-pages.service";
import { useToast } from "@/app/providers/ToastProvider";
import { resolveLegacyStats, resolveLegacyTable } from "@/app/features/legacy/legacyResolver";
import type {
  FilterConfig,
  FilterValue,
  PageConfig,
  SearchFieldOption,
  SortDirection,
  SortOption,
  TabConfig,
  TableColumn,
} from "@/app/components/types/ui";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function applyFilters<Row>(
  rows: Row[],
  filters: FilterConfig[],
  values: Record<string, FilterValue>,
  columns: TableColumn<Row>[],
  selectedSearchFields: string[],
) {
  return rows.filter((row) =>
    filters.every((filter) => {
      const value = values[filter.id];
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
      const normalizedValues = Array.isArray(value) ? value.map((item) => item.toLowerCase()) : [value.toLowerCase()];

      if (filter.matchMode === "equals") {
        return normalizedValues.some((item) => normalizedTarget === item);
      }

      return normalizedValues.some((item) => normalizedTarget.includes(item));
    }),
  );
}

function hasLegacyActionColumn<Row>(columns: TableColumn<Row>[]) {
  return columns.some((column) => {
    const header = column.header.trim().toLowerCase();
    return header.includes("action") || /^column \d+$/.test(header);
  });
}

type ConfiguredPageProps<Row extends { id: string }> = {
  config: PageConfig<Row>;
  pageData?: ConfiguredPageData<Row>;
};

export function ConfiguredPage<Row extends { id: string }>({ config, pageData }: ConfiguredPageProps<Row>) {
  const { notify } = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const useLegacyData = config.useLegacyData ?? true;
  const serverMode = config.dataMode === "server";
  const density = config.density ?? "compact";
  const [activeTabId, setActiveTabId] = useState(config.tabs?.[0]?.id ?? "");
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>({});
  const [selectedSearchFields, setSelectedSearchFields] = useState<string[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortState, setSortState] = useState<{ columnId?: string; direction: SortDirection; sortId?: string }>({
    columnId: undefined,
    direction: "asc",
    sortId: undefined,
  });
  const [serverTableData, setServerTableData] = useState<ConfiguredPageData<Row> | null>(null);

  const activeTab = useMemo<TabConfig<Row> | undefined>(
    () => config.tabs?.find((tab) => tab.id === activeTabId) ?? config.tabs?.[0],
    [activeTabId, config.tabs],
  );
  const activeDataTab = useMemo(
    () => serverTableData?.tabs?.find((tab) => tab.id === activeTab?.id) ??
      serverTableData?.tabs?.[0] ??
      pageData?.tabs?.find((tab) => tab.id === activeTab?.id) ??
      pageData?.tabs?.[0],
    [activeTab?.id, pageData?.tabs, serverTableData?.tabs],
  );
  const activeTabIndex = config.tabs?.findIndex((tab) => tab.id === (activeTab?.id ?? "")) ?? 0;
  const legacyTable = useMemo(
    () => resolveLegacyTable(config.id, activeTab?.id, Math.max(activeTabIndex, 0)),
    [activeTab?.id, activeTabIndex, config.id],
  );
  const legacyStats = useMemo(() => resolveLegacyStats(config.id), [config.id]);

  const filters = activeTab?.filters ?? config.filters ?? [];
  const resolvedLegacyTable = useLegacyData ? legacyTable : null;
  const resolvedLegacyStats = useLegacyData ? legacyStats : null;
  const columns = (
    activeDataTab?.columns ??
    serverTableData?.columns ??
    pageData?.columns ??
    resolvedLegacyTable?.columns ??
    activeTab?.columns ??
    config.columns ??
    []
  ) as TableColumn<Row>[];
  const rows = (
    activeDataTab?.rows ??
    serverTableData?.rows ??
    pageData?.rows ??
    resolvedLegacyTable?.rows ??
    activeTab?.rows ??
    config.rows ??
    []
  ) as Row[];
  const legacyHasActionsColumn = resolvedLegacyTable ? hasLegacyActionColumn(resolvedLegacyTable.columns) : false;
  const rowActions = legacyHasActionsColumn ? undefined : activeTab?.rowActions ?? config.rowActions;
  const rowActionDisplay = activeTab?.rowActionDisplay ?? config.rowActionDisplay ?? "buttons";
  const bulkActions = activeTab?.bulkActions ?? config.bulkActions ?? [];
  const bulkActionLabel = activeTab?.bulkActionLabel ?? config.bulkActionLabel ?? "Bulk Actions";
  const filterLayout = activeTab?.filterLayout ?? config.filterLayout ?? "single";
  const defaultServerQuery = useMemo(() => getDefaultConfiguredPageQuery(config), [config]);
  const serverQuery = useMemo(
    () => (serverMode && searchParams ? parseConfiguredPageQuery(config, searchParams) : defaultServerQuery),
    [config, defaultServerQuery, searchParams, serverMode],
  );
  const serverQueryKey = searchParams?.toString() ?? "";
  const serverFilterValues = (serverQuery.filters ?? {}) as Record<string, FilterValue>;
  const stats =
    activeDataTab?.stats ??
    pageData?.stats ??
    activeTab?.stats ??
    (config.tabs ? config.stats : resolvedLegacyStats ?? config.stats);
  const derivedSearchFields = useMemo<SearchFieldOption[]>(
    () =>
      columns
        .filter((column) => column.searchValue)
        .map((column) => ({
          id: column.id,
          label: column.header,
        })),
    [columns],
  );
  const derivedSortOptions = useMemo<SortOption[]>(
    () =>
      columns
        .filter((column) => column.sortValue)
        .flatMap((column) => {
          const normalizedHeader = column.header.toLowerCase();
          const isDateLike =
            normalizedHeader.includes("date") ||
            normalizedHeader.includes("joined") ||
            normalizedHeader.includes("updated") ||
            normalizedHeader.includes("created") ||
            normalizedHeader.includes("submitted") ||
            normalizedHeader.includes("renewal");

          return [
            {
              id: `${column.id}-asc`,
              label: isDateLike ? `${column.header} (Oldest First)` : `${column.header} (A-Z)`,
              columnId: column.id,
              direction: "asc" as const,
            },
            {
              id: `${column.id}-desc`,
              label: isDateLike ? `${column.header} (Newest First)` : `${column.header} (Z-A)`,
              columnId: column.id,
              direction: "desc" as const,
            },
          ];
        }),
    [columns],
  );
  const enableSearchFieldSelector =
    activeTab?.enableSearchFieldSelector ?? config.enableSearchFieldSelector ?? false;
  const searchFields = activeTab?.searchFields ?? config.searchFields ?? derivedSearchFields;
  const sortOptions = activeTab?.sortOptions ?? config.sortOptions ?? derivedSortOptions;
  const currentFilterValues = serverMode ? serverFilterValues : filterValues;
  const currentSelectedSearchFields = serverMode ? (serverQuery.searchFields ?? []) : selectedSearchFields;
  const currentSortState = serverMode
    ? {
        columnId: serverQuery.sortBy,
        direction: serverQuery.sortDir ?? "asc",
        sortId: serverQuery.sortBy ? `${serverQuery.sortBy}-${serverQuery.sortDir ?? "asc"}` : undefined,
      }
    : sortState;
  const hasToolbar =
    filters.some((filter) => filter.type === "search" || filter.type === "select") ||
    sortOptions.length > 0 ||
    bulkActions.length > 0;

  useEffect(() => {
    if (!serverMode) {
      setServerTableData(null);
      return;
    }

    let cancelled = false;

    getConfiguredPageTableData(config, serverQuery).then((data) => {
      if (!cancelled) {
        setServerTableData(data as ConfiguredPageData<Row>);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [config, serverMode, serverQuery, serverQueryKey]);

  function replaceServerQuery(nextPartial: Partial<typeof serverQuery>) {
    if (!pathname) {
      return;
    }

    const nextQuery = mergeConfiguredPageQuery(serverQuery, nextPartial);
    const nextSearchParams = buildConfiguredPageSearchParams(config, nextQuery);
    const href = nextSearchParams.toString() ? `${pathname}?${nextSearchParams.toString()}` : pathname;
    router.replace(href, { scroll: false });
  }

  useEffect(() => {
    if (!enableSearchFieldSelector) {
      if (!serverMode) {
        setSelectedSearchFields([]);
      }
      return;
    }

    const nextSearchFieldIds = searchFields.map((field) => field.id);
    if (serverMode) {
      const preserved = (serverQuery.searchFields ?? []).filter((fieldId) => nextSearchFieldIds.includes(fieldId));
      const resolved = preserved.length > 0 ? preserved : nextSearchFieldIds;
      if (resolved.join(",") !== (serverQuery.searchFields ?? []).join(",")) {
        replaceServerQuery({
          searchFields: resolved,
          page: 1,
        });
      }
      return;
    }

    setSelectedSearchFields((current) => {
      const preserved = current.filter((fieldId) => nextSearchFieldIds.includes(fieldId));
      return preserved.length > 0 ? preserved : nextSearchFieldIds;
    });
  }, [enableSearchFieldSelector, searchFields, serverMode, serverQuery.searchFields]);

  useEffect(() => {
    if (serverMode) {
      return;
    }

    setSortState({
      columnId: activeTab?.defaultSortColumn,
      direction: "asc",
      sortId: activeTab?.defaultSortColumn ? `${activeTab.defaultSortColumn}-asc` : undefined,
    });
  }, [activeTab?.defaultSortColumn, config.id, serverMode]);

  useEffect(() => {
    setSelectedRowIds([]);
  }, [config.id, activeTab?.id, rows]);

  const filteredRows = useMemo(
    () => (serverMode ? rows : applyFilters(rows, filters, currentFilterValues, columns, currentSelectedSearchFields)),
    [columns, currentFilterValues, currentSelectedSearchFields, filters, rows, serverMode],
  );

  return (
    <div className={`page-container ${config.width === "narrow" ? "max-w-narrow" : "max-w-content"}`}>
      <PageHeader title={config.title} description={config.description} actions={config.actions} onAction={notify} density={density} />

      {config.tabs ? (
        <Tabs
          items={config.tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
          activeId={activeTab?.id ?? ""}
          onChange={(tabId) => {
            setActiveTabId(tabId);
            setFilterValues({});
          }}
        />
      ) : null}

      {stats?.length ? <StatsGrid stats={stats} density={density} /> : null}

      {config.notes?.length ? (
        <Card title="Notes" className="mb-6">
          <ul className="space-y-2 text-sm text-text-secondary">
            {config.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      <TableSection
        density={density}
        toolbar={
          hasToolbar ? (
            <FilterToolbar
              filters={filters}
              values={currentFilterValues}
              columns={columns}
              searchFields={enableSearchFieldSelector ? searchFields : []}
              selectedSearchFields={currentSelectedSearchFields}
              sortOptions={sortOptions}
              activeSortId={currentSortState.sortId}
              onChange={(id, value) => {
                if (serverMode) {
                  replaceServerQuery({
                    filters: {
                      [id]: value,
                    },
                    query: id === "query" && typeof value === "string" ? value : serverQuery.query,
                    page: 1,
                  });
                  return;
                }

                setFilterValues((current) => ({ ...current, [id]: value }));
              }}
              onSearchFieldsChange={(nextFields) => {
                if (serverMode) {
                  replaceServerQuery({
                    searchFields: nextFields,
                    page: 1,
                  });
                  return;
                }

                setSelectedSearchFields(nextFields);
              }}
              bulkActions={bulkActions}
              bulkActionLabel={bulkActionLabel}
              filterLayout={filterLayout}
              selectedCount={selectedRowIds.length}
              onBulkAction={(action) => {
                const selectedRows = rows.filter((row) => selectedRowIds.includes(row.id));
                const message = typeof action.message === "function" ? action.message(selectedRows) : action.message ?? action.label;
                notify(message);
              }}
              onSortChange={(columnId, direction, sortId) =>
                serverMode
                  ? replaceServerQuery({
                      sortBy: columnId,
                      sortDir: direction,
                      page: 1,
                    })
                  : setSortState({
                      columnId,
                      direction,
                      sortId,
                    })
              }
            />
          ) : undefined
        }
      >
        <DataTable
          rows={filteredRows}
          columns={columns}
          rowActions={rowActions}
          rowActionDisplay={rowActionDisplay}
          density={density}
          defaultSortColumn={activeTab?.defaultSortColumn}
          emptyMessage={activeTab?.emptyMessage ?? config.emptyMessage}
          onAction={notify}
          onSelectionChange={setSelectedRowIds}
          sortColumn={currentSortState.columnId}
          sortDirection={currentSortState.direction}
          sortingMode={serverMode ? "server" : "client"}
          paginationMode={serverMode ? "server" : "client"}
          currentPage={serverMode ? serverTableData?.pagination?.page ?? serverQuery.page ?? 1 : undefined}
          rowsPerPage={serverMode ? serverTableData?.pagination?.pageSize ?? serverQuery.pageSize ?? config.defaultPageSize ?? 25 : undefined}
          totalRows={serverMode ? serverTableData?.pagination?.totalRows ?? filteredRows.length : undefined}
          rowsPerPageOptions={config.rowsPerPageOptions}
          onRowsPerPageChange={(pageSize) => {
            if (serverMode) {
              replaceServerQuery({
                pageSize,
                page: 1,
              });
            }
          }}
          onPageChange={(page) => {
            if (serverMode) {
              replaceServerQuery({ page });
            }
          }}
          onSortChange={(columnId, direction) =>
            serverMode
              ? replaceServerQuery({
                  sortBy: columnId,
                  sortDir: direction,
                  page: 1,
                })
              : setSortState({
                  columnId,
                  direction,
                  sortId: `${columnId}-${direction}`,
                })
          }
        />
      </TableSection>
    </div>
  );
}
