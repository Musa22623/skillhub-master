"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/app/components/ui/Input";
import { Icon } from "@/app/components/ui/Icon";
import { TableDropdown } from "@/app/components/table/TableDropdown";
import type {
  BulkTableAction,
  FilterConfig,
  FilterValue,
  SearchFieldOption,
  SortDirection,
  SortOption,
  TableColumn,
} from "@/app/components/types/ui";

type FilterToolbarProps<Row> = {
  filters: FilterConfig[];
  values: Record<string, FilterValue>;
  onChange: (id: string, value: FilterValue) => void;
  columns?: TableColumn<Row>[];
  searchFields?: SearchFieldOption[];
  selectedSearchFields?: string[];
  onSearchFieldsChange?: (ids: string[]) => void;
  sortOptions?: SortOption[];
  activeSortId?: string;
  onSortChange?: (columnId: string, direction: SortDirection, sortId: string) => void;
  bulkActions?: BulkTableAction<Row>[];
  bulkActionLabel?: string;
  selectedCount?: number;
  onBulkAction?: (action: BulkTableAction<Row>) => void;
  filterLayout?: "single" | "split";
};

export function FilterToolbar<Row>({
  filters,
  values,
  onChange,
  searchFields = [],
  selectedSearchFields = [],
  onSearchFieldsChange,
  sortOptions = [],
  activeSortId,
  onSortChange,
  bulkActions = [],
  bulkActionLabel = "Bulk Actions",
  selectedCount = 0,
  onBulkAction,
  filterLayout = "single",
}: FilterToolbarProps<Row>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [draftMultiValues, setDraftMultiValues] = useState<Record<string, string[]>>({});
  const searchFilter = filters.find((filter) => filter.type === "search");
  const selectFilters = filters.filter((filter) => filter.type === "select");
  const activeFilterCount = selectFilters.reduce((count, filter) => {
    const currentValue = values[filter.id];
    if (Array.isArray(currentValue)) {
      return currentValue.length > 0 ? count + 1 : count;
    }
    return currentValue ? count + 1 : count;
  }, 0);
  const activeSortLabel = sortOptions.find((option) => option.id === activeSortId)?.label;

  const selectedSearchLabel = useMemo(() => {
    if (searchFields.length === 0 || selectedSearchFields.length === 0) {
      return "ALL";
    }

    if (selectedSearchFields.length === 1) {
      const current = searchFields.find((field) => field.id === selectedSearchFields[0]);
      return (current?.label ?? "ALL").toUpperCase();
    }

    if (selectedSearchFields.length === 2) {
      return selectedSearchFields
        .map((fieldId) => searchFields.find((field) => field.id === fieldId)?.label?.slice(0, 1).toUpperCase() ?? "")
        .join(", ");
    }

    return `${selectedSearchFields.length} FIELDS`;
  }, [searchFields, selectedSearchFields]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setSearchMenuOpen(false);
        setSortMenuOpen(false);
        setOpenFilterId(null);
        setBulkMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!searchFilter && selectFilters.length === 0 && sortOptions.length === 0 && bulkActions.length === 0) {
    return null;
  }

  function toggleSearchField(id: string) {
    if (!onSearchFieldsChange) {
      return;
    }

    if (selectedSearchFields.includes(id)) {
      if (selectedSearchFields.length === 1) {
        return;
      }
      onSearchFieldsChange(selectedSearchFields.filter((item) => item !== id));
      return;
    }

    onSearchFieldsChange([...selectedSearchFields, id]);
  }

  function isMultiSelect(filter: FilterConfig) {
    return filter.selectionMode === "multiple";
  }

  function readMultiValue(filterId: string) {
    const currentValue = values[filterId];
    return Array.isArray(currentValue) ? currentValue : [];
  }

  function selectedOptionLabel(filter: FilterConfig) {
    const currentValue = values[filter.id];
    if (Array.isArray(currentValue)) {
      if (currentValue.length === 0) {
        return filter.allLabel ?? "All";
      }
      if (currentValue.length === 1) {
        return filter.options?.find((option) => option.value === currentValue[0])?.label ?? currentValue[0];
      }
      return `${currentValue.length} selected`;
    }

    if (!currentValue) {
      return filter.allLabel ?? "All";
    }

    return filter.options?.find((option) => option.value === currentValue)?.label ?? currentValue;
  }

  function ensureDraftValue(filterId: string) {
    setDraftMultiValues((current) => ({
      ...current,
      [filterId]: current[filterId] ?? readMultiValue(filterId),
    }));
  }

  function toggleDraftOption(filterId: string, optionValue: string) {
    setDraftMultiValues((current) => {
      const existing = current[filterId] ?? readMultiValue(filterId);
      const next = existing.includes(optionValue)
        ? existing.filter((item) => item !== optionValue)
        : [...existing, optionValue];

      return {
        ...current,
        [filterId]: next,
      };
    });
  }

  function clearMultiSelect(filterId: string) {
    setDraftMultiValues((current) => ({
      ...current,
      [filterId]: [],
    }));
    onChange(filterId, []);
    setOpenFilterId(null);
  }

  function applyMultiSelect(filterId: string) {
    onChange(filterId, draftMultiValues[filterId] ?? readMultiValue(filterId));
    setOpenFilterId(null);
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {searchFilter ? (
        <div className="relative flex w-full max-w-[420px] overflow-visible rounded-md border border-surface-line bg-white">
          <div className="relative min-w-0 flex-1">
            <Input
              key={searchFilter.id}
              type="search"
              value={typeof values[searchFilter.id] === "string" ? (values[searchFilter.id] as string) : ""}
              placeholder={searchFilter.placeholder ?? searchFilter.label}
              withSearchIcon
              className="border-0 pr-3 shadow-none"
              onChange={(event) => onChange(searchFilter.id, event.target.value)}
            />
          </div>
          {searchFields.length > 0 ? (
            <div className="relative border-l border-surface-line bg-[#FAFAFA]">
              <button
                type="button"
                onClick={() => {
                  setSearchMenuOpen((current) => !current);
                  setSortMenuOpen(false);
                  setOpenFilterId(null);
                  setBulkMenuOpen(false);
                }}
                className="flex h-full min-w-[140px] items-center justify-between gap-2 px-3 text-sm font-medium text-text-icon"
              >
                <span className="flex items-center gap-2 uppercase tracking-[0.04em]">
                  <Icon name="search" className="h-3.5 w-3.5" />
                  {selectedSearchLabel}
                </span>
                <span className="text-xs">v</span>
              </button>
              {searchMenuOpen ? (
                <div className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[220px] rounded-lg border border-surface-line bg-white py-2 shadow-lg">
                  {searchFields.map((field) => {
                    const selected = selectedSearchFields.includes(field.id);
                    return (
                      <button
                        key={field.id}
                        type="button"
                        onClick={() => toggleSearchField(field.id)}
                        className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-text-primary transition hover:bg-surface-muted"
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-[3px] border text-[10px] ${
                            selected ? "border-brand bg-brand text-white" : "border-surface-line bg-white"
                          }`}
                        >
                          {selected ? "v" : ""}
                        </span>
                        {field.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        {sortOptions.length > 0 ? (
          <TableDropdown
            label={activeSortLabel ? `Sort: ${activeSortLabel}` : "Sort"}
            open={sortMenuOpen}
            active={Boolean(activeSortLabel)}
            onToggle={() => {
              setSortMenuOpen((current) => !current);
              setSearchMenuOpen(false);
              setOpenFilterId(null);
              setBulkMenuOpen(false);
            }}
          >
            {sortOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onSortChange?.(option.columnId, option.direction, option.id);
                  setSortMenuOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-surface-muted ${
                  activeSortId === option.id ? "font-semibold text-brand" : "text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </TableDropdown>
        ) : null}

        {selectFilters.length > 0 && filterLayout === "single" ? (
          <TableDropdown
            label={activeFilterCount > 0 ? `Filter (${activeFilterCount})` : "Filter"}
            open={openFilterId === "__all__"}
            active={activeFilterCount > 0}
            onToggle={() => {
              setOpenFilterId((current) => (current === "__all__" ? null : "__all__"));
              setSearchMenuOpen(false);
              setSortMenuOpen(false);
              setBulkMenuOpen(false);
            }}
          >
            {selectFilters.map((filter) => (
              <div key={filter.id} className="border-b border-surface-line/70 px-2 py-1 last:border-b-0">
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
                  {filter.label}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChange(filter.id, "");
                    setOpenFilterId(null);
                  }}
                  className={`block w-full rounded px-2 py-2 text-left text-sm transition hover:bg-surface-muted ${
                    values[filter.id] === "" || values[filter.id] == null ? "font-semibold text-brand" : "text-text-primary"
                  }`}
                >
                  {filter.allLabel ?? "All"}
                </button>
                {filter.options?.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(filter.id, option.value);
                      setOpenFilterId(null);
                    }}
                    className={`block w-full rounded px-2 py-2 text-left text-sm transition hover:bg-surface-muted ${
                      values[filter.id] === option.value ? "font-semibold text-brand" : "text-text-primary"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ))}
          </TableDropdown>
        ) : null}

        {selectFilters.length > 0 && filterLayout === "split"
          ? selectFilters.map((filter) => {
              const currentValue = values[filter.id];
              const isActive = Array.isArray(currentValue) ? currentValue.length > 0 : Boolean(currentValue);

              return (
                <TableDropdown
                  key={filter.id}
                  label={isActive ? `${filter.label}: ${selectedOptionLabel(filter)}` : filter.label}
                  open={openFilterId === filter.id}
                  active={isActive}
                  onToggle={() => {
                    if (isMultiSelect(filter)) {
                      ensureDraftValue(filter.id);
                    }
                    setOpenFilterId((current) => (current === filter.id ? null : filter.id));
                    setSearchMenuOpen(false);
                    setSortMenuOpen(false);
                    setBulkMenuOpen(false);
                  }}
                >
                  {isMultiSelect(filter) ? (
                    <div className="min-w-[240px]">
                      <div className="max-h-[240px] overflow-y-auto px-2 py-2">
                        {filter.options?.map((option) => {
                          const draftValues = draftMultiValues[filter.id] ?? readMultiValue(filter.id);
                          const checked = draftValues.includes(option.value);

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => toggleDraftOption(filter.id, option.value)}
                              className="flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm text-text-primary transition hover:bg-surface-muted"
                            >
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-[3px] border text-[10px] ${
                                  checked ? "border-brand bg-brand text-white" : "border-surface-line bg-white"
                                }`}
                              >
                                {checked ? "v" : ""}
                              </span>
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-end gap-2 border-t border-surface-line px-3 py-3">
                        <button
                          type="button"
                          onClick={() => clearMultiSelect(filter.id)}
                          className="inline-flex min-h-9 items-center rounded-md border border-surface-line bg-[#F5F5F5] px-3 text-sm font-medium text-text-icon transition hover:bg-[#EBEBEB]"
                        >
                          Clear
                        </button>
                        <button
                          type="button"
                          onClick={() => applyMultiSelect(filter.id)}
                          className="inline-flex min-h-9 items-center rounded-md bg-brand px-3 text-sm font-medium text-white transition hover:bg-brand-dark"
                        >
                          {filter.applyLabel ?? "Apply"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          onChange(filter.id, "");
                          setOpenFilterId(null);
                        }}
                        className={`block w-full rounded px-4 py-2 text-left text-sm transition hover:bg-surface-muted ${
                          values[filter.id] === "" || values[filter.id] == null ? "font-semibold text-brand" : "text-text-primary"
                        }`}
                      >
                        {filter.allLabel ?? "All"}
                      </button>
                      {filter.options?.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            onChange(filter.id, option.value);
                            setOpenFilterId(null);
                          }}
                          className={`block w-full rounded px-4 py-2 text-left text-sm transition hover:bg-surface-muted ${
                            values[filter.id] === option.value ? "font-semibold text-brand" : "text-text-primary"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </>
                  )}
                </TableDropdown>
              );
            })
          : null}

        {bulkActions.length > 0 ? (
          <TableDropdown
            label={selectedCount > 0 ? `${bulkActionLabel} (${selectedCount})` : bulkActionLabel}
            open={bulkMenuOpen}
            disabled={selectedCount === 0}
            active={selectedCount > 0}
            onToggle={() => {
              if (selectedCount === 0) {
                return;
              }
              setBulkMenuOpen((current) => !current);
              setSearchMenuOpen(false);
              setSortMenuOpen(false);
              setOpenFilterId(null);
            }}
          >
            {bulkActions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  onBulkAction?.(action);
                  setBulkMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm text-text-primary transition hover:bg-surface-muted"
              >
                {action.label}
              </button>
            ))}
          </TableDropdown>
        ) : null}
      </div>
    </div>
  );
}
