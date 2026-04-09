"use client";

type TablePaginationProps = {
  currentPage: number;
  pageCount: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  totalRows: number;
  startIndex: number;
  pageSize: number;
  onRowsPerPageChange: (value: number) => void;
  onPageChange: (page: number) => void;
};

function pageButtons(pageCount: number, currentPage: number) {
  const safePageCount = Math.max(1, pageCount);

  if (safePageCount <= 5) {
    return Array.from({ length: safePageCount }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= safePageCount - 2) {
    return Array.from({ length: 5 }, (_, index) => safePageCount - 4 + index);
  }

  return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
}

export function TablePagination({
  currentPage,
  pageCount,
  rowsPerPage,
  rowsPerPageOptions,
  totalRows,
  startIndex,
  pageSize,
  onRowsPerPageChange,
  onPageChange,
}: TablePaginationProps) {
  const hasMultiplePages = pageCount > 1;
  const visiblePageButtons = pageButtons(pageCount, currentPage);

  return (
    <div className="flex flex-col gap-3 border-t border-surface-line bg-white px-4 py-3 text-[13px] text-text-secondary md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span>
          Showing{" "}
          <span className="font-semibold text-text-primary">
            {totalRows === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, totalRows)}
          </span>{" "}
          of <span className="font-semibold text-text-primary">{totalRows}</span> records
        </span>
        <label className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
            className="rounded-md border border-surface-line bg-white px-2 py-1 text-[13px] text-text-primary"
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={!hasMultiplePages || currentPage === 1}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-surface-line bg-white px-2.5 text-text-primary transition enabled:hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="First page"
          >
            {"<<"}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={!hasMultiplePages || currentPage === 1}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-surface-line bg-white px-2.5 text-text-primary transition enabled:hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous page"
          >
            {"<"}
          </button>
          {visiblePageButtons.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2.5 text-[13px] transition ${
                currentPage === pageNumber
                  ? "border-brand bg-brand text-white"
                  : "border-surface-line bg-white text-text-primary hover:bg-surface-muted"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
            disabled={!hasMultiplePages || currentPage === pageCount}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-surface-line bg-white px-2.5 text-text-primary transition enabled:hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next page"
          >
            {">"}
          </button>
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, pageCount))}
            disabled={!hasMultiplePages || currentPage === pageCount}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-surface-line bg-white px-2.5 text-text-primary transition enabled:hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Last page"
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
