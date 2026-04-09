import type { PageConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import {
  createAction,
  createPage,
  createRecord,
  createRowAction,
  createStat,
  metricColumn,
  nameColumn,
  searchFilter,
  selectFilter,
  standardStatusOptions,
  statusColumn,
  textColumn,
  updatedColumn,
} from "@/app/sections/shared/config/shared";

const communityActions = [
  createRowAction("open", "Open", (row) => `Opened ${row.name}.`),
  createRowAction("moderate", "Moderate", (row) => `Moderation tools opened for ${row.name}.`, "ghost"),
];

export const collectionsCommunityPage: PageConfig<AdminRecord> = createPage({
  id: "collections",
  path: "community/collections",
  title: "Collections",
  section: "Community & Engagement",
  description: "Curate featured community collections and track engagement health.",
  stats: [
    createStat({ id: "coll-live", label: "Live collections", value: "46", change: "+3", tone: "success", icon: "community" }),
    createStat({ id: "coll-followers", label: "Followers", value: "18.2k", change: "+5.8%", tone: "success", icon: "users" }),
    createStat({ id: "coll-featured", label: "Featured now", value: "8", change: "Homepage", tone: "info", icon: "products" }),
    createStat({ id: "coll-review", label: "Needs review", value: "4", change: "Moderation", tone: "warning", icon: "system" }),
  ],
  actions: [
    createAction("new-collection", "New Collection", "Collection editor opened.", "primary", "community"),
    createAction("refresh-ranking", "Refresh Ranking", "Collection ranking refreshed.", "secondary", "refresh"),
  ],
  filters: [
    searchFilter("Search collections or curators"),
    selectFilter("status", "Status", standardStatusOptions()),
  ],
  sortOptions: [
    { id: "title-asc", label: "Title (A-Z)", columnId: "col_0", direction: "asc" },
    { id: "title-desc", label: "Title (Z-A)", columnId: "col_0", direction: "desc" },
    { id: "count-desc", label: "Count (DESC)", columnId: "col_2", direction: "desc" },
    { id: "count-asc", label: "Count (ASC)", columnId: "col_2", direction: "asc" },
  ],
  bulkActions: [
    { id: "delete", label: "Delete Selected", message: (rows) => `Delete would run for ${rows.length} selected collections.` },
    { id: "feature", label: "Feature / Unfeature", message: (rows) => `Featuring would update ${rows.length} selected collections.` },
    { id: "export", label: "Export Selected", message: (rows) => `Export queued for ${rows.length} selected collections.` },
  ],
  columns: [
    nameColumn("Collection"),
    textColumn("owner", "Curator"),
    metricColumn("Followers"),
    statusColumn(),
    updatedColumn(),
  ],
  rows: [
    createRecord({ id: "coll-1", name: "Leadership Picks", subtitle: "Executive team favorites", owner: "Ava Morgan", metric: "4.2k", status: "Active", updatedAt: "Today" }),
    createRecord({ id: "coll-2", name: "Operator Essentials", subtitle: "Operations starter path", owner: "Jordan Malik", metric: "3.1k", status: "Active", updatedAt: "Yesterday" }),
    createRecord({ id: "coll-3", name: "Creator Spotlight", subtitle: "Weekly featured experts", owner: "Mia Patel", metric: "1.9k", status: "Pending review", updatedAt: "Yesterday" }),
    createRecord({ id: "coll-4", name: "New Manager Setup", subtitle: "First 30 days toolkit", owner: "Olivia Hart", metric: "2.3k", status: "Draft", updatedAt: "Last week" }),
  ],
  rowActions: communityActions,
});

export const postsCommunityPage: PageConfig<AdminRecord> = createPage({
  id: "posts",
  path: "community/posts",
  title: "Community Posts",
  section: "Community & Engagement",
  description: "Moderate user posts, track reach, and manage escalation.",
  stats: [
    createStat({ id: "posts-today", label: "Posted today", value: "284", change: "+14%", tone: "success", icon: "community" }),
    createStat({ id: "posts-reported", label: "Reported", value: "9", change: "Low", tone: "success", icon: "system" }),
    createStat({ id: "posts-pinned", label: "Pinned", value: "16", change: "Editorial", tone: "info", icon: "document" }),
    createStat({ id: "posts-engagement", label: "Avg. engagement", value: "7.8%", change: "+0.9 pts", tone: "success", icon: "chart" }),
  ],
  actions: [
    createAction("schedule-post", "Schedule Post", "Post scheduler opened.", "primary", "calendar"),
    createAction("moderation-queue", "Queue", "Moderation queue opened.", "secondary", "system"),
  ],
  filters: [
    searchFilter("Search posts or authors"),
    selectFilter("space", "Space", [
      { label: "Announcements", value: "announcements" },
      { label: "General", value: "general" },
      { label: "Random", value: "random" },
    ], { columnId: "category" }),
    selectFilter("author", "Author", [
      { label: "Brooke Hayes", value: "brooke" },
      { label: "Grace Turner", value: "grace" },
      { label: "Noah Bennett", value: "noah" },
      { label: "Mia Patel", value: "mia" },
    ], { columnId: "owner" }),
    selectFilter("status", "Status", [
      { label: "Pinned", value: "pinned" },
      { label: "Published", value: "published" },
      { label: "Archived", value: "archived" },
      { label: "Pending Review", value: "pending review" },
    ], { columnId: "status" }),
    selectFilter("date-range", "Date Range", [
      { label: "Today", value: "today" },
      { label: "This Week", value: "week" },
      { label: "Recent Hours", value: "hours ago" },
    ], { columnId: "updatedAt" }),
  ],
  filterLayout: "single",
  sortOptions: [
    { id: "date-desc", label: "Date (Newest)", columnId: "updatedAt", direction: "desc" },
    { id: "date-asc", label: "Date (Oldest)", columnId: "updatedAt", direction: "asc" },
    { id: "space-asc", label: "Space (A-Z)", columnId: "category", direction: "asc" },
    { id: "space-desc", label: "Space (Z-A)", columnId: "category", direction: "desc" },
    { id: "engagement-desc", label: "Most Engagement", columnId: "metric", direction: "desc" },
  ],
  bulkActions: [
    { id: "hide", label: "Hide Selected", message: (rows) => `${rows.length} selected posts would be hidden.` },
    { id: "delete", label: "Delete Selected", message: (rows) => `Delete would run for ${rows.length} selected posts.` },
  ],
  columns: [
    nameColumn("Post"),
    textColumn("category", "Space"),
    textColumn("owner", "Author"),
    metricColumn("Engagement"),
    statusColumn(),
    updatedColumn("Published"),
  ],
  rows: [
    createRecord({ id: "post-1", name: "How we scaled async onboarding", subtitle: "Discussion thread", category: "Announcements", owner: "Brooke Hayes", metric: "1.2k views", status: "Published", updatedAt: "2 hours ago" }),
    createRecord({ id: "post-2", name: "Favorite leadership rituals", subtitle: "Prompt post", category: "General", owner: "Grace Turner", metric: "486 reactions", status: "Pinned", updatedAt: "Today" }),
    createRecord({ id: "post-3", name: "Office hours recap", subtitle: "Resource share", category: "General", owner: "Noah Bennett", metric: "311 views", status: "Pending review", updatedAt: "Today" }),
    createRecord({ id: "post-4", name: "Quarterly wins thread", subtitle: "Celebration post", category: "Random", owner: "Mia Patel", metric: "128 reactions", status: "Archived", updatedAt: "Last week" }),
  ],
  rowActions: communityActions,
});

export const spacesCommunityPage: PageConfig<AdminRecord> = createPage({
  id: "spaces",
  path: "community/spaces",
  title: "Spaces",
  section: "Community & Engagement",
  description: "Manage community spaces, hosts, and participation trends.",
  stats: [
    createStat({ id: "spaces-active", label: "Active spaces", value: "28", change: "+1", tone: "success", icon: "community" }),
    createStat({ id: "spaces-members", label: "Members", value: "12.4k", change: "+6.3%", tone: "success", icon: "users" }),
    createStat({ id: "spaces-private", label: "Private spaces", value: "9", change: "Enterprise", tone: "info", icon: "system" }),
    createStat({ id: "spaces-risk", label: "Needs host", value: "3", change: "Coverage", tone: "warning", icon: "calendar" }),
  ],
  actions: [
    createAction("new-space", "Create Space", "Space creation flow opened.", "primary", "community"),
    createAction("invite-hosts", "Invite Hosts", "Host invitations queued.", "secondary", "users"),
  ],
  filters: [
    searchFilter("Search spaces or hosts"),
    selectFilter("collection", "By Collection", [
      { label: "General Info", value: "general info" },
      { label: "Student Hub", value: "student hub" },
      { label: "System", value: "system" },
    ], { columnId: "category" }),
    selectFilter("access", "By Access Type", [
      { label: "Public", value: "public" },
      { label: "Private", value: "private" },
      { label: "Standalone", value: "standalone" },
    ], { columnId: "plan" }),
    selectFilter("owner", "By Owner", [
      { label: "Olivia Hart", value: "olivia" },
      { label: "Ethan Rivera", value: "ethan" },
      { label: "Ava Morgan", value: "ava" },
      { label: "Harper Quinn", value: "harper" },
    ], { columnId: "owner" }),
  ],
  filterLayout: "single",
  sortOptions: [
    { id: "created-desc", label: "Created Date", columnId: "updatedAt", direction: "desc" },
    { id: "title-asc", label: "Title (A-Z)", columnId: "name", direction: "asc" },
    { id: "members-desc", label: "Member Count", columnId: "metric", direction: "desc" },
    { id: "collection-asc", label: "Collection (A-Z)", columnId: "category", direction: "asc" },
  ],
  bulkActions: [
    { id: "archive", label: "Archive Selected", message: (rows) => `${rows.length} selected spaces would be archived.` },
    { id: "delete", label: "Delete Selected", message: (rows) => `Delete would run for ${rows.length} selected spaces.` },
  ],
  columns: [
    nameColumn("Space"),
    textColumn("category", "Collection"),
    textColumn("plan", "Access"),
    textColumn("owner", "Host"),
    metricColumn("Members"),
    statusColumn(),
    updatedColumn(),
  ],
  rows: [
    createRecord({ id: "space-1", name: "Leadership Circle", subtitle: "Exec peer learning space", category: "General Info", plan: "Private", owner: "Olivia Hart", metric: "2,140 members", status: "Active", updatedAt: "Today" }),
    createRecord({ id: "space-2", name: "Growth Operators", subtitle: "Tactical operator forum", category: "Student Hub", plan: "Public", owner: "Ethan Rivera", metric: "1,680 members", status: "Active", updatedAt: "Today" }),
    createRecord({ id: "space-3", name: "New Managers Cohort", subtitle: "Private support group", category: "Student Hub", plan: "Private", owner: "Ava Morgan", metric: "426 members", status: "Pending review", updatedAt: "Yesterday" }),
    createRecord({ id: "space-4", name: "Customer Success Roundtable", subtitle: "Invite-only leaders space", category: "System", plan: "Standalone", owner: "Harper Quinn", metric: "188 members", status: "Draft", updatedAt: "Last week" }),
  ],
  rowActions: communityActions,
});

export const communityTabPages: PageConfig<AdminRecord>[] = [
  collectionsCommunityPage,
  postsCommunityPage,
  spacesCommunityPage,
];
