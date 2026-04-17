import type { SortDirection } from "@/app/components/types/ui";

export function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export function parseSearchFields(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);
}

export function parseSortDirection(value: string | null): SortDirection | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}
