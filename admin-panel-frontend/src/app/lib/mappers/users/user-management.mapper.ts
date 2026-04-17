import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  UserManagementApiResponse,
  UserManagementItemDto,
  UserManagementPageData,
  UserManagementSummaryApiResponse,
  UserManagementSummaryData,
  UserStatDto,
} from "@/app/lib/types/users";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapUserStatus(status: string) {
  const normalized = status.toLowerCase();

  if (normalized === "pending") {
    return "Pending";
  }

  return toTitleCase(status);
}

function mapUserRole(role: string) {
  return toTitleCase(role);
}

function mapUserManagementRow(user: UserManagementItemDto): AdminRecord {
  return {
    id: String(user.id),
    name: user.name,
    avatar: user.avatar,
    subtitle: user.internalId,
    email: user.email,
    plan: mapUserRole(user.role),
    tags: user.tags ?? [],
    viewLinks: user.viewLinks ?? [],
    linkedTo: user.linkedTo ?? [],
    status: mapUserStatus(user.status),
    updatedAt: user.lastLogin ?? user.joined,
  };
}

function mapUserStat(stat: UserStatDto): StatConfig | null {
  switch (stat.id) {
    case "totalUsers":
      return {
        id: "users-total",
        label: "Total users",
        value: stat.value,
        change: stat.trend?.value,
        tone: "success",
        icon: "users",
      };
    case "activeUsers":
      return {
        id: "users-active",
        label: "Active this week",
        value: stat.value,
        change: stat.trend?.value,
        tone: "success",
        icon: "activity",
      };
    case "pending":
      return {
        id: "users-pending",
        label: "Pending verification",
        value: stat.value,
        change: stat.trend?.value,
        tone: "warning",
        icon: "mail",
      };
    case "suspended":
      return {
        id: "users-suspended",
        label: "Suspended users",
        value: stat.value,
        change: stat.trend?.value,
        tone: "info",
        icon: "system",
      };
    default:
      return null;
  }
}

export function mapUserManagementListResponse(
  response: UserManagementApiResponse,
): UserManagementPageData {
  return {
    stats: response.stats.map(mapUserStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapUserManagementRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapUserManagementSummaryResponse(
  response: UserManagementSummaryApiResponse,
): UserManagementSummaryData {
  return {
    stats: response.stats.map(mapUserStat).filter((stat): stat is StatConfig => stat !== null),
  };
}
