import { legacyData } from "@/app/features/legacy/legacyData";
import type {
  AllInstructorsApiResponse,
  ApplicationsApiResponse,
  LegacyApplicationDto,
  LegacyContractDto,
  LegacyInstructorDto,
  LegacyMemberDto,
  LegacyUserDto,
  LegacyUserStatDto,
  TeamContactsApiResponse,
  TeamMembersApiResponse,
  UserManagementApiResponse,
} from "@/app/lib/types/users";

type LegacyUserManagementPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    usersData?: LegacyUserDto[];
  };
};

type LegacyApplicationsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    applicationsData?: LegacyApplicationDto[];
  };
};

type LegacyAllInstructorsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    instructorsData?: LegacyInstructorDto[];
  };
};

type LegacyTeamContactsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    contractsData?: LegacyContractDto[];
  };
};

type LegacyTeamMembersPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    membersData?: LegacyMemberDto[];
  };
};

export async function fetchUserManagementPage(): Promise<UserManagementApiResponse> {
  const page = legacyData["user-management"] as unknown as LegacyUserManagementPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.usersData ?? [],
  };
}

export async function fetchApplicationsPage(): Promise<ApplicationsApiResponse> {
  const page = legacyData.applications as unknown as LegacyApplicationsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.applicationsData ?? [],
  };
}

export async function fetchAllInstructorsPage(): Promise<AllInstructorsApiResponse> {
  const page = legacyData["all-instructors"] as unknown as LegacyAllInstructorsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.instructorsData ?? [],
  };
}

export async function fetchTeamContactsPage(): Promise<TeamContactsApiResponse> {
  const page = legacyData["team-contacts"] as unknown as LegacyTeamContactsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.contractsData ?? [],
  };
}

export async function fetchTeamMembersPage(): Promise<TeamMembersApiResponse> {
  const page = legacyData["team-members"] as unknown as LegacyTeamMembersPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.membersData ?? [],
  };
}
