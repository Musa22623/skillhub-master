import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  CourseListApiResponse,
  CoursePageData,
  CourseSummaryApiResponse,
  CourseSummaryData,
  ProductStatDto,
  CatalogProductRecordDto,
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

function mapCourseRow(row: CatalogProductRecordDto): AdminRecord {
  return { ...row };
}

export function mapCoursesListResponse(response: CourseListApiResponse): CoursePageData {
  return {
    stats: response.stats.map(mapProductStat),
    rows: response.rows.map(mapCourseRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapCoursesSummaryResponse(response: CourseSummaryApiResponse): CourseSummaryData {
  return {
    stats: response.stats.map(mapProductStat),
  };
}
