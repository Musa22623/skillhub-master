import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type {
  TeamContactsListApiResponse,
  TeamContactsPageData,
  TeamContactsSummaryApiResponse,
  TeamContactsSummaryData,
  TeamContactDto,
  UserStatDto,
} from "@/app/lib/types/users";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapTeamContactsStat(stat: UserStatDto): StatConfig | null {
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

function mapTeamContactRow(contract: TeamContactDto): AdminRecord {
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

export function mapTeamContactsListResponse(response: TeamContactsListApiResponse): TeamContactsPageData {
  return {
    stats: response.stats.map(mapTeamContactsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapTeamContactRow),
    pagination: response.pagination,
    query: response.query,
  };
}

export function mapTeamContactsSummaryResponse(response: TeamContactsSummaryApiResponse): TeamContactsSummaryData {
  return {
    stats: response.stats.map(mapTeamContactsStat).filter((stat): stat is StatConfig => stat !== null),
  };
}
