import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  ApplicationsApiResponse,
  LegacyApplicationDto,
  LegacyContractDto,
  LegacyMemberDto,
  LegacyUserDto,
  LegacyUserStatDto,
  SimpleAdminPageData,
  TeamContactsApiResponse,
  TeamMembersApiResponse,
  UserManagementApiResponse,
  UserManagementPageData,
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

function mapTrendTone(type: string | null | undefined): StatConfig["tone"] {
  const normalized = type?.toLowerCase() ?? "";

  if (normalized.includes("positive")) {
    return "success";
  }
  if (normalized.includes("negative")) {
    return "danger";
  }
  if (normalized.includes("warning")) {
    return "warning";
  }

  return "info";
}

function mapLegacyUserRow(user: LegacyUserDto): AdminRecord {
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

function mapLegacyUserStat(stat: LegacyUserStatDto): StatConfig | null {
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

export function mapUserManagementApiResponse(
  response: UserManagementApiResponse,
): UserManagementPageData {
  return {
    stats: response.stats.map(mapLegacyUserStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapLegacyUserRow),
  };
}

function mapApplicationsStat(stat: LegacyUserStatDto): StatConfig | null {
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

function mapApplicationRow(application: LegacyApplicationDto): AdminRecord {
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

export function mapApplicationsApiResponse(response: ApplicationsApiResponse): SimpleAdminPageData {
  return {
    stats: response.stats.map(mapApplicationsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapApplicationRow),
  };
}

function mapTeamContactsStat(stat: LegacyUserStatDto): StatConfig | null {
  switch (stat.id) {
    case "activeContracts":
      return { id: "contacts-active", label: "Active contracts", value: stat.value, change: stat.trend?.value, tone: "success", icon: "users" };
    case "expiringSoon":
      return { id: "contacts-expiring", label: "Expiring soon", value: stat.value, change: stat.trend?.value, tone: "warning", icon: "calendar" };
    case "seatUtilization":
      return { id: "contacts-utilization", label: "Seat utilization", value: stat.value, change: stat.trend?.value, tone: "success", icon: "chart" };
    case "teamMRR":
      return { id: "contacts-mrr", label: "Team MRR", value: stat.value, change: stat.trend?.value, tone: "info", icon: "money" };
    default:
      return null;
  }
}

function mapContractStatus(status: string) {
  if (status.toLowerCase() === "expiring") {
    return "Expiring";
  }
  return toTitleCase(status);
}

function mapTeamContactRow(contract: LegacyContractDto): AdminRecord {
  return {
    id: String(contract.id),
    name: contract.manager.name,
    subtitle: contract.contractId,
    email: contract.manager.email,
    location: contract.name,
    status: mapContractStatus(contract.status),
    updatedAt: contract.expiry,
  };
}

export function mapTeamContactsApiResponse(response: TeamContactsApiResponse): SimpleAdminPageData {
  return {
    stats: response.stats.map(mapTeamContactsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapTeamContactRow),
  };
}

function mapTeamMembersStat(stat: LegacyUserStatDto): StatConfig | null {
  switch (stat.id) {
    case "totalMembers":
      return { id: "members-total", label: "Total members", value: stat.value, change: stat.trend?.value, tone: "success", icon: "users" };
    case "uniqueManagers":
      return { id: "members-managers", label: "Unique managers", value: stat.value, change: stat.trend?.value, tone: "info", icon: "users" };
    case "seatManagers":
      return { id: "members-seat-managers", label: "Seat managers", value: stat.value, change: stat.trend?.value, tone: "success", icon: "community" };
    case "pendingInvites":
      return { id: "members-pending", label: "Pending invites", value: stat.value, change: stat.trend?.value, tone: "warning", icon: "mail" };
    default:
      return null;
  }
}

function mapMemberStatus(status: string) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "Accepted";
    case "pending":
      return "Pending invite";
    case "removed":
      return "Removed";
    default:
      return toTitleCase(status);
  }
}

function mapTeamMemberRow(member: LegacyMemberDto): AdminRecord {
  return {
    id: String(member.id),
    name: member.name,
    subtitle: member.planName,
    email: member.email,
    plan: member.planName,
    count: toTitleCase(member.role),
    status: mapMemberStatus(member.status),
    updatedAt: member.joinedFull ?? member.joined,
  };
}

export function mapTeamMembersApiResponse(response: TeamMembersApiResponse): SimpleAdminPageData {
  return {
    stats: response.stats.map(mapTeamMembersStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapTeamMemberRow),
  };
}
