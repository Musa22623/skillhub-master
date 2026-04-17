import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  TeamMembersListApiResponse,
  TeamMembersPageData,
  TeamMembersSummaryApiResponse,
  TeamMembersSummaryData,
  TeamMemberDto,
  UserStatDto,
} from "@/app/lib/types/users";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapTeamMembersStat(stat: UserStatDto): StatConfig | null {
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

function mapTeamMemberRow(member: TeamMemberDto): AdminRecord {
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

export function mapTeamMembersListResponse(response: TeamMembersListApiResponse): TeamMembersPageData {
  return {
    stats: response.stats.map(mapTeamMembersStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapTeamMemberRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapTeamMembersSummaryResponse(response: TeamMembersSummaryApiResponse): TeamMembersSummaryData {
  return {
    stats: response.stats.map(mapTeamMembersStat).filter((stat): stat is StatConfig => stat !== null),
  };
}
