import type { SortDirection } from "@/app/components/types/ui";
import type { ConfiguredPageQueryParams } from "@/app/lib/types/admin-page";
import type {
  BundleListApiResponse,
  BundleQueryParams,
  BundleSummaryApiResponse,
  CatalogProductRecordDto,
  CourseListApiResponse,
  CourseQueryParams,
  CourseSummaryApiResponse,
  EventProductListApiResponse,
  EventProductQueryParams,
  EventProductSummaryApiResponse,
  ProductStatDto,
  SessionInstanceListApiResponse,
  SessionInstanceQueryParams,
  SessionInstanceSummaryApiResponse,
} from "@/app/lib/types/products";

type StaticProductPageDataset = {
  stats: ProductStatDto[];
  rows: CatalogProductRecordDto[];
  defaultSearchFields: string[];
};

const staticProductPages: Record<string, StaticProductPageDataset> = {
  courses: {
    stats: [
      { id: "course-live", title: "Live courses", value: "94", trend: { value: "+6", type: "positive" } },
      { id: "course-review", title: "Needs QA", value: "12", trend: { value: "This week", type: "warning" } },
      { id: "course-complete", title: "Avg. completion", value: "68%", trend: { value: "+3 pts", type: "positive" } },
      { id: "course-nps", title: "Avg. rating", value: "4.7", trend: { value: "Strong", type: "neutral" } },
    ],
    rows: [
      { id: "course-1", name: "Data Storytelling Essentials", subtitle: "Story-first analytics course", owner: "Ava Morgan", plan: "Self-paced", metric: "72%", status: "Active", updatedAt: "Today" },
      { id: "course-2", name: "Manager Enablement Sprint", subtitle: "Leadership operating rhythms", owner: "Noah Bennett", plan: "Cohort", metric: "84%", status: "Active", updatedAt: "Yesterday" },
      { id: "course-3", name: "Creative Systems for Teams", subtitle: "Design ops for scaling teams", owner: "Mia Patel", plan: "Self-paced", metric: "61%", status: "Pending review", updatedAt: "Yesterday" },
      { id: "course-4", name: "Revenue Planning Workshop", subtitle: "Quarterly planning templates", owner: "Sophia Chen", plan: "Live workshop", metric: "55%", status: "Draft", updatedAt: "2 days ago" },
    ],
    defaultSearchFields: ["name", "owner", "plan", "metric", "status"],
  },
  "event-products": {
    stats: [
      { id: "events-upcoming", title: "Upcoming events", value: "28", trend: { value: "+4", type: "positive" } },
      { id: "events-sold", title: "Sold-out", value: "7", trend: { value: "High demand", type: "neutral" } },
      { id: "events-waitlist", title: "Waitlists", value: "13", trend: { value: "Watch closely", type: "warning" } },
      { id: "events-draft", title: "Draft events", value: "5", trend: { value: "Programming", type: "warning" } },
    ],
    rows: [
      { id: "event-1", name: "Q2 Leadership Summit", subtitle: "Virtual executive event", owner: "Olivia Hart", location: "Online", metric: "412 / 500", status: "Active", updatedAt: "Apr 16" },
      { id: "event-2", name: "Design Critique Clinic", subtitle: "Interactive mentor session", owner: "Nina Alvarez", location: "San Francisco", metric: "60 / 60", status: "Sold out", updatedAt: "Apr 18" },
      { id: "event-3", name: "Retention Systems AMA", subtitle: "Subscriber operations panel", owner: "Ethan Rivera", location: "Online", metric: "122 / 150", status: "Active", updatedAt: "Apr 23" },
      { id: "event-4", name: "Growth Ops Roundtable", subtitle: "Closed enterprise cohort", owner: "Jordan Malik", location: "New York", metric: "Draft", status: "Draft", updatedAt: "May 2" },
    ],
    defaultSearchFields: ["name", "owner", "location", "metric", "status"],
  },
  "session-instances": {
    stats: [
      { id: "session-week", title: "Sessions this week", value: "46", trend: { value: "+5", type: "positive" } },
      { id: "session-fill", title: "Avg. fill rate", value: "81%", trend: { value: "+2 pts", type: "positive" } },
      { id: "session-risk", title: "At risk", value: "6", trend: { value: "Low attendance", type: "warning" } },
      { id: "session-hosts", title: "Facilitators", value: "24", trend: { value: "Assigned", type: "neutral" } },
    ],
    rows: [
      { id: "session-1", name: "Leadership Accelerator - Group A", subtitle: "Week 3 live discussion", owner: "Nina Alvarez", location: "Zoom", metric: "92%", status: "Active", updatedAt: "Apr 9" },
      { id: "session-2", name: "Leadership Accelerator - Group B", subtitle: "Week 3 live discussion", owner: "Nina Alvarez", location: "Zoom", metric: "88%", status: "Active", updatedAt: "Apr 10" },
      { id: "session-3", name: "Revenue Planning Workshop", subtitle: "CFO office hours", owner: "Sophia Chen", location: "Online", metric: "61%", status: "Pending review", updatedAt: "Apr 11" },
      { id: "session-4", name: "Ops Playbook Live", subtitle: "Cohort kickoff", owner: "Jordan Malik", location: "New York", metric: "46%", status: "Draft", updatedAt: "Apr 22" },
    ],
    defaultSearchFields: ["name", "owner", "location", "metric", "status"],
  },
  bundles: {
    stats: [
      { id: "bundle-live", title: "Live bundles", value: "16", trend: { value: "+2", type: "positive" } },
      { id: "bundle-attach", title: "Attach rate", value: "21%", trend: { value: "+3 pts", type: "positive" } },
      { id: "bundle-trial", title: "Trial bundles", value: "5", trend: { value: "Testing", type: "neutral" } },
      { id: "bundle-retire", title: "Retire soon", value: "2", trend: { value: "Watch", type: "warning" } },
    ],
    rows: [
      { id: "bundle-1", name: "Leadership + Coaching Bundle", subtitle: "Course plus private sessions", owner: "Olivia Hart", plan: "Upsell", metric: "24%", status: "Active", updatedAt: "Today" },
      { id: "bundle-2", name: "Marketing Sprint Pack", subtitle: "Workshop and templates", owner: "Ethan Rivera", plan: "Launch", metric: "19%", status: "Active", updatedAt: "Yesterday" },
      { id: "bundle-3", name: "Team Success Bundle", subtitle: "Enterprise onboarding collection", owner: "Ava Morgan", plan: "Enterprise", metric: "31%", status: "Pending review", updatedAt: "Yesterday" },
      { id: "bundle-4", name: "Legacy Growth Pack", subtitle: "Retiring offer", owner: "Jordan Malik", plan: "Promo", metric: "9%", status: "Draft", updatedAt: "Last week" },
    ],
    defaultSearchFields: ["name", "owner", "plan", "metric", "status"],
  },
};

function toConfiguredQuery(params: {
  query?: string;
  status?: string;
  sortBy?: string;
  sortDir?: SortDirection;
  page?: number;
  pageSize?: number;
  searchFields?: string[];
}): ConfiguredPageQueryParams {
  return {
    query: params.query ?? "",
    filters: {
      query: params.query ?? "",
      status: params.status ?? "",
    },
    sortBy: params.sortBy,
    sortDir: params.sortDir,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 25,
    searchFields: params.searchFields ?? [],
  };
}

function rowSearchValue(row: CatalogProductRecordDto, fieldId: string) {
  switch (fieldId) {
    case "name":
      return [row.name, row.subtitle].filter(Boolean).join(" ");
    case "owner":
      return row.owner ?? "";
    case "plan":
      return row.plan ?? "";
    case "location":
      return row.location ?? "";
    case "metric":
      return row.metric ?? "";
    case "status":
      return row.status;
    case "updatedAt":
      return row.updatedAt;
    default:
      return [
        row.name,
        row.subtitle ?? "",
        row.owner ?? "",
        row.plan ?? "",
        row.location ?? "",
        row.metric ?? "",
        row.status,
        row.updatedAt,
      ]
        .filter(Boolean)
        .join(" ");
  }
}

function sortRows(rows: CatalogProductRecordDto[], sortBy?: string, sortDir: SortDirection = "asc") {
  if (!sortBy) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    const leftValue =
      sortBy === "name"
        ? left.name
        : sortBy === "owner"
          ? left.owner ?? ""
          : sortBy === "plan"
            ? left.plan ?? ""
            : sortBy === "location"
              ? left.location ?? ""
              : sortBy === "metric"
                ? left.metric ?? ""
                : sortBy === "status"
                  ? left.status
                  : sortBy === "updatedAt"
                    ? left.updatedAt
                    : "";
    const rightValue =
      sortBy === "name"
        ? right.name
        : sortBy === "owner"
          ? right.owner ?? ""
          : sortBy === "plan"
            ? right.plan ?? ""
            : sortBy === "location"
              ? right.location ?? ""
              : sortBy === "metric"
                ? right.metric ?? ""
                : sortBy === "status"
                  ? right.status
                  : sortBy === "updatedAt"
                    ? right.updatedAt
                    : "";

    if (leftValue < rightValue) {
      return sortDir === "asc" ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return sortDir === "asc" ? 1 : -1;
    }

    return 0;
  });
}

function getStaticProductPageDataset(pageId: keyof typeof staticProductPages) {
  return staticProductPages[pageId];
}

function buildListResponse(
  pageId: keyof typeof staticProductPages,
  params: {
    query?: string;
    status?: string;
    sortBy?: string;
    sortDir?: SortDirection;
    page?: number;
    pageSize?: number;
    searchFields?: string[];
  },
) {
  const dataset = getStaticProductPageDataset(pageId);
  const query = params.query ?? "";
  const status = params.status ?? "";
  const sortBy = params.sortBy;
  const sortDir = params.sortDir ?? "asc";
  const pageNumber = params.page ?? 1;
  const pageSize = params.pageSize ?? 25;
  const searchFields = params.searchFields ?? [];
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedStatus = status.trim().toLowerCase();
  const searchableFields = searchFields.length > 0 ? searchFields : dataset.defaultSearchFields;

  const filteredRows = dataset.rows.filter((row) => {
    if (normalizedStatus && row.status.toLowerCase() !== normalizedStatus) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return searchableFields.some((fieldId) => rowSearchValue(row, fieldId).toLowerCase().includes(normalizedQuery));
  });

  const sortedRows = sortRows(filteredRows, sortBy, sortDir);
  const totalRows = sortedRows.length;
  const safePage = Math.max(1, pageNumber);
  const safePageSize = Math.max(1, pageSize);
  const startIndex = (safePage - 1) * safePageSize;
  const pagedRows = sortedRows.slice(startIndex, startIndex + safePageSize);

  return {
    stats: dataset.stats,
    items: pagedRows,
    rows: pagedRows,
    pagination: {
      page: safePage,
      pageSize: safePageSize,
      totalRows,
    },
    query: toConfiguredQuery({
      query,
      status,
      sortBy,
      sortDir,
      page: safePage,
      pageSize: safePageSize,
      searchFields,
    }),
  };
}

function buildSummaryResponse(
  pageId: keyof typeof staticProductPages,
) {
  const dataset = getStaticProductPageDataset(pageId);
  return { stats: dataset.stats };
}

export async function fetchMockCoursesListPage(params: CourseQueryParams = {}): Promise<CourseListApiResponse> {
  return buildListResponse("courses", params);
}

export async function fetchMockCoursesSummary(): Promise<CourseSummaryApiResponse> {
  return buildSummaryResponse("courses");
}

export async function fetchMockEventProductsListPage(params: EventProductQueryParams = {}): Promise<EventProductListApiResponse> {
  return buildListResponse("event-products", params);
}

export async function fetchMockEventProductsSummary(): Promise<EventProductSummaryApiResponse> {
  return buildSummaryResponse("event-products");
}

export async function fetchMockSessionInstancesListPage(params: SessionInstanceQueryParams = {}): Promise<SessionInstanceListApiResponse> {
  return buildListResponse("session-instances", params);
}

export async function fetchMockSessionInstancesSummary(): Promise<SessionInstanceSummaryApiResponse> {
  return buildSummaryResponse("session-instances");
}

export async function fetchMockBundlesListPage(params: BundleQueryParams = {}): Promise<BundleListApiResponse> {
  return buildListResponse("bundles", params);
}

export async function fetchMockBundlesSummary(): Promise<BundleSummaryApiResponse> {
  return buildSummaryResponse("bundles");
}
