"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { RowActionMenu } from "@/app/components/table/RowActionMenu";
import { TablePagination } from "@/app/components/table/TablePagination";
import type { SortDirection, TableAction, TableColumn } from "@/app/components/types/ui";

type DataTableProps<Row> = {
  rows: Row[];
  columns: TableColumn<Row>[];
  rowActions?: TableAction<Row>[];
  rowActionDisplay?: "buttons" | "menu";
  emptyMessage?: string;
  defaultSortColumn?: string;
  onAction?: (message: string) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSortChange?: (columnId: string, direction: SortDirection) => void;
  onSelectionChange?: (ids: string[]) => void;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  paginationMode?: "client" | "server";
  sortingMode?: "client" | "server";
  currentPage?: number;
  totalRows?: number;
  rowsPerPage?: number;
  onRowsPerPageChange?: (value: number) => void;
  onPageChange?: (page: number) => void;
  density?: "compact" | "comfortable";
};

export function DataTable<Row extends { id: string }>({
  rows,
  columns,
  rowActions = [],
  rowActionDisplay = "buttons",
  emptyMessage = "No records found.",
  defaultSortColumn,
  onAction,
  sortColumn: controlledSortColumn,
  sortDirection: controlledSortDirection,
  onSortChange,
  onSelectionChange,
  initialRowsPerPage = 25,
  rowsPerPageOptions = [10, 25, 50, 100],
  paginationMode = "client",
  sortingMode = "client",
  currentPage: controlledCurrentPage,
  totalRows: controlledTotalRows,
  rowsPerPage: controlledRowsPerPage,
  onRowsPerPageChange,
  onPageChange,
  density = "compact",
}: DataTableProps<Row>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [internalSortColumn, setInternalSortColumn] = useState<string | undefined>(defaultSortColumn);
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [openRowMenuId, setOpenRowMenuId] = useState<string | null>(null);
  const isServerPagination = paginationMode === "server";
  const isServerSorting = sortingMode === "server";
  const sortColumn = controlledSortColumn ?? internalSortColumn;
  const sortDirection = controlledSortDirection ?? internalSortDirection;
  const effectiveRowsPerPage = controlledRowsPerPage ?? rowsPerPage;
  const effectiveCurrentPage = controlledCurrentPage ?? page;
  const comfortable = density === "comfortable";

  const visibleRows = useMemo(() => {
    if (isServerSorting || !sortColumn) {
      return rows;
    }

    const column = columns.find((item) => item.id === sortColumn);
    if (!column?.sortValue) {
      return rows;
    }

    return [...rows].sort((left, right) => {
      const leftValue = column.sortValue!(left);
      const rightValue = column.sortValue!(right);

      if (leftValue < rightValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (leftValue > rightValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [columns, isServerSorting, rows, sortColumn, sortDirection]);

  const totalVisibleRows = isServerPagination ? controlledTotalRows ?? visibleRows.length : visibleRows.length;
  const pageCount = Math.max(1, Math.ceil(totalVisibleRows / effectiveRowsPerPage));
  const currentPage = Math.min(effectiveCurrentPage, pageCount);
  const startIndex = (currentPage - 1) * effectiveRowsPerPage;
  const pagedRows = isServerPagination
    ? visibleRows
    : visibleRows.slice(startIndex, startIndex + effectiveRowsPerPage);
  const currentPageIds = pagedRows.map((row) => row.id);
  const allCurrentPageSelected =
    currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id));

  useEffect(() => {
    if (!isServerPagination) {
      setPage(1);
    }
  }, [isServerPagination, rowsPerPage, rows, sortColumn, sortDirection]);

  useEffect(() => {
    setSelectedIds([]);
    onSelectionChange?.([]);
  }, [rows, onSelectionChange]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpenRowMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleSelection(id: string) {
    setSelectedIds((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      onSelectionChange?.(next);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds((current) => {
      const allSelected = currentPageIds.every((id) => current.includes(id));
      const next = allSelected
        ? current.filter((id) => !currentPageIds.includes(id))
        : [...new Set([...current, ...currentPageIds])];
      onSelectionChange?.(next);
      return next;
    });
  }

  function handleSort(columnId: string) {
    if (sortColumn === columnId) {
      const nextDirection = sortDirection === "asc" ? "desc" : "asc";
      if (onSortChange) {
        onSortChange(columnId, nextDirection);
      } else {
        setInternalSortDirection(nextDirection);
      }
      return;
    }

    if (onSortChange) {
      onSortChange(columnId, "asc");
    } else {
      setInternalSortColumn(columnId);
      setInternalSortDirection("asc");
    }
  }

  return (
    <div ref={containerRef}>
      <div className="overflow-x-auto">
        <table className={`min-w-full text-left ${comfortable ? "text-sm" : "text-[13px]"}`}>
          <thead className="border-b border-surface-line bg-surface-muted">
            <tr>
              <th className={comfortable ? "w-12 px-5 py-3" : "w-11 px-4 py-2.5"}>
                <input
                  type="checkbox"
                  checked={allCurrentPageSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 accent-brand"
                />
              </th>
              {columns.map((column) => (
                <th key={column.id} className={comfortable ? "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-icon" : "px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-icon"}>
                  {column.sortValue ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-left"
                      onClick={() => handleSort(column.id)}
                    >
                      {column.header}
                      {sortColumn === column.id ? <span>{sortDirection === "asc" ? "^" : "v"}</span> : null}
                    </button>
                  ) : (
                    <span>{column.header}</span>
                  )}
                </th>
              ))}
              {rowActions.length > 0 ? (
                <th className={comfortable ? "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-text-icon" : "px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-text-icon"}>Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + rowActions.length + 1} className={comfortable ? "px-5 py-10 text-center text-text-secondary" : "px-4 py-8 text-center text-text-secondary"}>
                  {emptyMessage}
                </td>
              </tr>
            ) : null}
            {pagedRows.map((row) => (
              <tr key={row.id} className="border-b border-surface-line last:border-b-0 hover:bg-surface-muted">
                <td className={comfortable ? "px-5 py-4 align-top" : "px-4 py-3 align-top"}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelection(row.id)}
                    className="h-4 w-4 accent-brand"
                  />
                </td>
                {columns.map((column) => (
                  <td key={column.id} className={`${comfortable ? "px-4 py-4" : "px-3.5 py-3"} align-top ${column.className ?? ""}`}>
                    {column.cell(row)}
                  </td>
                ))}
                {rowActions.length > 0 ? (
                  <td className={comfortable ? "px-4 py-4 align-top" : "px-3.5 py-3 align-top"}>
                    {rowActionDisplay === "menu" ? (
                      <RowActionMenu
                        row={row}
                        actions={rowActions}
                        open={openRowMenuId === row.id}
                        onToggle={() => setOpenRowMenuId((current) => (current === row.id ? null : row.id))}
                        onClose={() => setOpenRowMenuId(null)}
                        onAction={onAction}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {rowActions.map((action) => (
                          <Button
                            key={action.id}
                            variant={action.variant ?? "secondary"}
                            className="min-h-8 px-3 text-xs"
                            onClick={() => {
                              const message =
                                typeof action.message === "function" ? action.message(row) : action.message ?? action.label;
                              onAction?.(message);
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        currentPage={currentPage}
        pageCount={pageCount}
        rowsPerPage={effectiveRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        totalRows={totalVisibleRows}
        startIndex={startIndex}
        pageSize={pagedRows.length}
        onRowsPerPageChange={isServerPagination ? (onRowsPerPageChange ?? (() => undefined)) : setRowsPerPage}
        onPageChange={isServerPagination ? (onPageChange ?? (() => undefined)) : setPage}
      />
    </div>
  );
}
