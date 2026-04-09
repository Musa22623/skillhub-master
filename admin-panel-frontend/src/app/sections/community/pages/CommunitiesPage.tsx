import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/app/providers/ToastProvider";
import { communityTabPages } from "@/app/sections/community/config/communities";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import { FilterToolbar } from "@/app/components/page/FilterToolbar";
import { PageHeader } from "@/app/components/page/PageHeader";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { TableSection } from "@/app/components/page/TableSection";
import type {
  FilterConfig,
  FilterValue,
  SearchFieldOption,
  SortDirection,
  SortOption,
  TableColumn,
} from "@/app/components/types/ui";
import { Tabs } from "@/app/components/ui/Tabs";
import { DataTable } from "@/app/components/ui/DataTable";

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

export function CommunitiesPage() {
  const { notify } = useToast();
  const [activeTabId, setActiveTabId] = useState(communityTabPages[0]?.id ?? "");
  const [filterValues, setFilterValues] = useState<Record<string, FilterValue>>({});
  const [selectedSearchFields, setSelectedSearchFields] = useState<string[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [sortState, setSortState] = useState<{ columnId?: string; direction: SortDirection; sortId?: string }>({
    columnId: undefined,
    direction: "asc",
    sortId: undefined,
  });

  const activePage = useMemo(
    () => communityTabPages.find((page) => page.id === activeTabId) ?? communityTabPages[0],
    [activeTabId],
  );

  const filters = activePage?.filters ?? [];
  const columns = (activePage?.columns ?? []) as TableColumn<AdminRecord>[];
  const rows = activePage?.rows ?? [];
  const bulkActions = activePage?.bulkActions ?? [];
  const bulkActionLabel = activePage?.bulkActionLabel ?? "Bulk Actions";
  const filterLayout = activePage?.filterLayout ?? "single";
  const enableSearchFieldSelector = activePage?.enableSearchFieldSelector ?? false;

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

  const searchFields = activePage?.searchFields ?? derivedSearchFields;
  const sortOptions = activePage?.sortOptions ?? derivedSortOptions;
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
      columnId: undefined,
      direction: "asc",
      sortId: undefined,
    });
    setFilterValues({});
    setSelectedRowIds([]);
  }, [activePage?.id]);

  useEffect(() => {
    setSelectedRowIds([]);
  }, [filterValues, rows]);

  const filteredRows = useMemo(
    () => applyFilters(rows, filters, filterValues, columns, selectedSearchFields),
    [columns, filterValues, filters, rows, selectedSearchFields],
  );

  if (!activePage) {
    return null;
  }

  return (
    <div className="page-container max-w-content">
      <PageHeader
        title="Communities"
        description={activePage.description ?? "Manage collections, posts, and spaces from one page."}
        actions={activePage.actions}
        onAction={notify}
      />

      <Tabs
        items={communityTabPages.map((page) => ({ id: page.id, label: page.title }))}
        activeId={activePage.id}
        onChange={setActiveTabId}
      />

      {activePage.stats?.length ? <StatsGrid stats={activePage.stats} /> : null}

      <TableSection
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
          rowActions={activePage.rowActions}
          rowActionDisplay={activePage.rowActionDisplay ?? "menu"}
          emptyMessage={activePage.emptyMessage}
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
