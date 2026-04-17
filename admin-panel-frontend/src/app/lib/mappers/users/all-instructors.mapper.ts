import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  AllInstructorsListApiResponse,
  AllInstructorsPageData,
  AllInstructorsSummaryApiResponse,
  AllInstructorsSummaryData,
  InstructorListItemDto,
  UserStatDto,
} from "@/app/lib/types/users";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapAllInstructorsStat(stat: UserStatDto): StatConfig | null {
  switch (stat.id) {
    case "instructors":
      return { id: "inst-total", label: "Approved instructors", value: stat.value, change: stat.trend?.value, tone: "success", icon: "users" };
    case "products":
      return { id: "inst-products", label: "Active products", value: stat.value, change: stat.trend?.value, tone: "success", icon: "products" };
    case "revenue":
      return { id: "inst-revenue", label: "Total revenue", value: stat.value, change: stat.trend?.value, tone: "info", icon: "money" };
    case "pending":
      return { id: "inst-pending", label: "Pending payouts", value: stat.value, change: stat.trend?.value, tone: "warning", icon: "document" };
    default:
      return null;
  }
}

function mapInstructorPayoutStatus(status: string) {
  switch (status.toLowerCase()) {
    case "eligible":
      return "Eligible";
    case "setup":
      return "Setup required";
    case "processing":
      return "Processing";
    case "hold":
      return "On hold";
    default:
      return toTitleCase(status);
  }
}

function mapAllInstructorsRow(instructor: InstructorListItemDto): AdminRecord {
  return {
    id: String(instructor.id),
    name: instructor.name,
    subtitle: instructor.internalId,
    email: instructor.email,
    metric: `${instructor.products.total} products`,
    status: mapInstructorPayoutStatus(instructor.payoutStatus),
    updatedAt: instructor.approvedDate,
  };
}

export function mapAllInstructorsListResponse(response: AllInstructorsListApiResponse): AllInstructorsPageData {
  return {
    stats: response.stats.map(mapAllInstructorsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapAllInstructorsRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapAllInstructorsSummaryResponse(response: AllInstructorsSummaryApiResponse): AllInstructorsSummaryData {
  return {
    stats: response.stats.map(mapAllInstructorsStat).filter((stat): stat is StatConfig => stat !== null),
  };
}
