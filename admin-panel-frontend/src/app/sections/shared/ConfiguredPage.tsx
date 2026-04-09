import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/app/components/ui/DataTable";
import { Tabs } from "@/app/components/ui/Tabs";
import { FilterToolbar } from "@/app/components/page/FilterToolbar";
import { PageHeader } from "@/app/components/page/PageHeader";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { TableSection } from "@/app/components/page/TableSection";
import { Card } from "@/app/components/ui/Card";
import type { ConfiguredPageData } from "@/app/lib/types/admin-page";
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
  const useLegacyData = config.useLegacyData ?? true;
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

  const activeTab = useMemo<TabConfig<Row> | undefined>(
    () => config.tabs?.find((tab) => tab.id === activeTabId) ?? config.tabs?.[0],
    [activeTabId, config.tabs],
  );
  const activeDataTab = useMemo(
    () => pageData?.tabs?.find((tab) => tab.id === activeTab?.id) ?? pageData?.tabs?.[0],
    [activeTab?.id, pageData?.tabs],
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
    pageData?.columns ??
    resolvedLegacyTable?.columns ??
    activeTab?.columns ??
    config.columns ??
    []
  ) as TableColumn<Row>[];
  const rows = (
    activeDataTab?.rows ??
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
  const hasToolbar =
    filters.some((filter) => filter.type === "search" || filter.type === "select") ||
    sortOptions.length > 0 ||
    bulkActions.length > 0;

  useEffect(() => {
    if (!enableSearchFieldSelector) {
      setSelectedSearchFields([]);
      return;
    }

    const nextSearchFieldIds = searchFields.map((field) => field.id);
    setSelectedSearchFields((current) => {
      const preserved = current.filter((fieldId) => nextSearchFieldIds.includes(fieldId));
      return preserved.length > 0 ? preserved : nextSearchFieldIds;
    });
  }, [enableSearchFieldSelector, searchFields]);

  useEffect(() => {
    setSortState({
      columnId: activeTab?.defaultSortColumn,
      direction: "asc",
      sortId: activeTab?.defaultSortColumn ? `${activeTab.defaultSortColumn}-asc` : undefined,
    });
  }, [activeTab?.defaultSortColumn, config.id]);

  useEffect(() => {
    setSelectedRowIds([]);
  }, [config.id, activeTab?.id, filterValues, rows]);

  const filteredRows = useMemo(
    () => applyFilters(rows, filters, filterValues, columns, selectedSearchFields),
    [columns, filterValues, filters, rows, selectedSearchFields],
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
              values={filterValues}
              columns={columns}
              searchFields={enableSearchFieldSelector ? searchFields : []}
              selectedSearchFields={selectedSearchFields}
              sortOptions={sortOptions}
              activeSortId={sortState.sortId}
              onChange={(id, value) => setFilterValues((current) => ({ ...current, [id]: value }))}
              onSearchFieldsChange={setSelectedSearchFields}
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
                setSortState({
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
          sortColumn={sortState.columnId}
          sortDirection={sortState.direction}
          onSortChange={(columnId, direction) =>
            setSortState({
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
