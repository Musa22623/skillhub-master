import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  CatalogProductRecordDto,
  ProductStatDto,
  SessionInstanceListApiResponse,
  SessionInstancePageData,
  SessionInstanceSummaryApiResponse,
  SessionInstanceSummaryData,
} from "@/app/lib/types/products";

function mapStatTone(type: string | null | undefined): StatConfig["tone"] {
  const normalized = type?.toLowerCase() ?? "";
  if (normalized.includes("positive")) return "success";
  if (normalized.includes("warning")) return "warning";
  if (normalized.includes("negative")) return "danger";
  return "info";
}

function mapProductStat(stat: ProductStatDto): StatConfig {
  return {
    id: stat.id,
    label: stat.title,
    value: stat.value,
    change: stat.trend?.value,
    tone: mapStatTone(stat.trend?.type),
    icon: stat.icon ?? "products",
  };
}

function mapSessionInstanceRow(row: CatalogProductRecordDto): AdminRecord {
  return { ...row };
}

export function mapSessionInstancesListResponse(response: SessionInstanceListApiResponse): SessionInstancePageData {
  return {
    stats: response.stats.map(mapProductStat),
    rows: response.rows.map(mapSessionInstanceRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapSessionInstancesSummaryResponse(response: SessionInstanceSummaryApiResponse): SessionInstanceSummaryData {
  return {
    stats: response.stats.map(mapProductStat),
  };
}
