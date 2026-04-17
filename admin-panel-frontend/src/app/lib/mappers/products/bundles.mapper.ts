import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  BundleListApiResponse,
  BundlePageData,
  BundleSummaryApiResponse,
  BundleSummaryData,
  CatalogProductRecordDto,
  ProductStatDto,
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

function mapBundleRow(row: CatalogProductRecordDto): AdminRecord {
  return { ...row };
}

export function mapBundlesListResponse(response: BundleListApiResponse): BundlePageData {
  return {
    stats: response.stats.map(mapProductStat),
    rows: response.rows.map(mapBundleRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapBundlesSummaryResponse(response: BundleSummaryApiResponse): BundleSummaryData {
  return {
    stats: response.stats.map(mapProductStat),
  };
}
