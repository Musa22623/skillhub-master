'use client';

import React from 'react';

export type DataTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type Id = string | number;

export type DataTableProps<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => Id;
  selectable?: boolean;
  selectedIds?: Set<Id>;
  onToggleRow?: (id: Id) => void;
  onToggleAll?: (checked: boolean) => void;
  allSelected?: boolean;
  someSelected?: boolean;
  rowClassName?: (row: T) => string;
  emptyState?: React.ReactNode;
  tableClassName?: string;
};

export function DataTable<T>({
  data,
  columns,
  getRowId,
  selectable = false,
  selectedIds,
  onToggleRow,
  onToggleAll,
  allSelected = false,
  someSelected = false,
  rowClassName,
  emptyState = (
    <tr>
      <td colSpan={(selectable ? 1 : 0) + columns.length} className="px-4 py-6 text-center text-sm text-gray-500">
        No data available
      </td>
    </tr>
  ),
  tableClassName = '',
}: DataTableProps<T>) {
  const renderCheckbox = (checked: boolean, onClick: () => void, ariaLabel?: string) => (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`grid h-5 w-5 place-items-center rounded border ${
        checked ? 'border-[#458BC1] bg-[#458BC1] text-white' : 'border-gray-300 bg-white text-gray-700'
      }`}
    >
      {checked ? (
        <svg width={12} height={12} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M3 8L6.5 11L13 5" />
        </svg>
      ) : null}
    </button>
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full table-auto border-collapse text-sm text-[var(--primary-text)] ${tableClassName}`}>
        <thead>
          <tr className="border-b border-[var(--button-line)] bg-[var(--secondary-bg)] text-xs font-semibold uppercase tracking-[0.4px] text-[var(--icon-default)]">
            {selectable ? (
              <th className="w-[56px] px-4 py-3 text-left">
                {renderCheckbox(allSelected, () => onToggleAll?.(!allSelected), allSelected ? 'Unselect all' : 'Select all')}
              </th>
            ) : null}
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 text-left ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? emptyState
            : data.map((row) => {
                const id = getRowId(row);
                const checked = selectable ? selectedIds?.has(id) ?? false : false;
                return (
                  <tr
                    key={id}
                    className={`border-b border-[var(--button-line)] transition-colors hover:bg-[var(--secondary-bg)] ${rowClassName ? rowClassName(row) : ''}`}
                  >
                    {selectable ? (
                      <td className="px-4 py-3 align-middle">
                        {renderCheckbox(checked, () => onToggleRow?.(id), checked ? 'Unselect row' : 'Select row')}
                      </td>
                    ) : null}
                    {columns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 align-middle ${col.className ?? ''}`}>
                        {col.render(row)}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
