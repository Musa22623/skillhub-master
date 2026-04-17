import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  ApplicationsListApiResponse,
  ApplicationsPageData,
  ApplicationsSummaryApiResponse,
  ApplicationsSummaryData,
  InstructorApplicationDto,
  UserStatDto,
} from "@/app/lib/types/users";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapApplicationsStat(stat: UserStatDto): StatConfig | null {
  switch (stat.id) {
    case "pendingReview":
      return { id: "app-review", label: "Pending review", value: stat.value, change: stat.trend?.value, tone: "warning", icon: "document" };
    case "approved":
      return { id: "app-approved", label: "Approved", value: stat.value, change: stat.trend?.value, tone: "success", icon: "users" };
    case "rejected":
      return { id: "app-rejected", label: "Rejected", value: stat.value, change: stat.trend?.value, tone: "info", icon: "system" };
    case "avgTime":
      return { id: "app-avg-time", label: "Avg. review time", value: stat.value, change: stat.trend?.value, tone: "success", icon: "activity" };
    default:
      return null;
  }
}

function mapApplicationStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "Pending review";
    case "info":
      return "In review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return toTitleCase(status);
  }
}

function mapApplicationRow(application: InstructorApplicationDto): AdminRecord {
  return {
    id: String(application.id),
    name: application.name,
    subtitle: `${application.appId} · ${application.email}`,
    category: application.category,
    stage: application.experience,
    status: mapApplicationStatus(application.status),
    updatedAt: application.appliedFull ?? application.applied,
  };
}

export function mapApplicationsListResponse(response: ApplicationsListApiResponse): ApplicationsPageData {
  return {
    stats: response.stats.map(mapApplicationsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapApplicationRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapApplicationsSummaryResponse(response: ApplicationsSummaryApiResponse): ApplicationsSummaryData {
  return {
    stats: response.stats.map(mapApplicationsStat).filter((stat): stat is StatConfig => stat !== null),
  };
}
