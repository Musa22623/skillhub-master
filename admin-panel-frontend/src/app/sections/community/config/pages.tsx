import type { PageConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import { CommunitiesPage } from "@/app/sections/community/pages/CommunitiesPage";
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
  statusColumn,
  textColumn,
  updatedColumn,
} from "@/app/sections/shared/config/shared";

const reviewRowActions = [
  createRowAction("edit", "Edit Review", (row) => `Editing review for ${row.name}.`),
  createRowAction("approve", "Approve", (row) => `Approved review for ${row.name}.`),
  createRowAction("reject", "Reject", (row) => `Rejected review for ${row.name}.`),
  createRowAction("delete", "Delete", (row) => `Delete requested for ${row.name}.`, "ghost"),
];

const communityActions = [
  createRowAction("open", "Open", (row) => `Opened ${row.name}.`),
  createRowAction("moderate", "Moderate", (row) => `Moderation tools opened for ${row.name}.`, "ghost"),
];

export const communityPages: PageConfig<AdminRecord>[] = [
  createPage({
    id: "communities",
    path: "community/communities",
    title: "Communities",
    section: "Community & Engagement",
    description: "Manage collections, posts, and spaces from one page with tabbed views.",
    component: CommunitiesPage,
  }),
  createPage({
    id: "reviews",
    path: "community/reviews",
    title: "Reviews & Ratings",
    section: "Community & Engagement",
    description: "Review learner feedback, rating drift, and follow-up opportunities.",
    stats: [
      createStat({ id: "reviews-average", label: "Average rating", value: "4.7", change: "+0.1", tone: "success", icon: "community" }),
      createStat({ id: "reviews-new", label: "New reviews", value: "126", change: "+18", tone: "success", icon: "users" }),
      createStat({ id: "reviews-low", label: "Below 4.0", value: "7", change: "Needs action", tone: "warning", icon: "system" }),
      createStat({ id: "reviews-public", label: "Published", value: "94%", change: "Healthy", tone: "info", icon: "document" }),
    ],
    actions: [
      createAction("request-reviews", "Request Reviews", "Review request campaign queued.", "primary", "mail"),
      createAction("export-feedback", "Export Feedback", "Feedback export generated.", "secondary", "document"),
    ],
    filters: [
      searchFilter("Search products or reviewers"),
      selectFilter("rating", "Rating", [
        { label: "5 Stars", value: "5" },
        { label: "4 Stars", value: "4" },
        { label: "3 Stars", value: "3" },
        { label: "2 Stars", value: "2" },
        { label: "1 Star", value: "1" },
      ], { columnId: "col_2" }),
      selectFilter("date", "Date", [
        { label: "Last 7 Days", value: "today" },
        { label: "Last 30 Days", value: "yesterday" },
        { label: "This Quarter", value: "last week" },
      ], { columnId: "col_6" }),
      selectFilter("content-type", "Content Type", [
        { label: "Books", value: "books" },
        { label: "Podcasts", value: "podcasts" },
        { label: "Wikipedia", value: "wikipedia" },
      ], { columnId: "col_7", selectionMode: "multiple", applyLabel: "Apply", allLabel: "All Types" }),
      selectFilter("status", "Status", [
        { label: "Published", value: "published" },
        { label: "Rejected", value: "rejected" },
        { label: "Pending", value: "pending" },
      ], { columnId: "col_8" }),
    ],
    filterLayout: "split",
    bulkActionLabel: "Bulk",
    sortOptions: [
      { id: "newest", label: "Newest", columnId: "col_4", direction: "desc" },
      { id: "oldest", label: "Oldest", columnId: "col_4", direction: "asc" },
      { id: "item-asc", label: "Item Title (A-Z)", columnId: "col_0", direction: "asc" },
      { id: "item-desc", label: "Item Title (Z-A)", columnId: "col_0", direction: "desc" },
      { id: "rating-high", label: "Top Rated", columnId: "col_2", direction: "desc" },
      { id: "rating-low", label: "Lowest Rated", columnId: "col_2", direction: "asc" },
    ],
    bulkActions: [
      { id: "approve", label: "Approve", message: (rows) => `Approved ${rows.length} selected reviews.` },
      { id: "reject", label: "Reject", message: (rows) => `Rejected ${rows.length} selected reviews.` },
      { id: "export", label: "Export", message: (rows) => `Export queued for ${rows.length} selected reviews.` },
      { id: "delete", label: "Delete", message: (rows) => `Delete requested for ${rows.length} selected reviews.` },
    ],
    columns: [
      nameColumn("Review"),
      textColumn("owner", "Reviewer"),
      metricColumn("Rating"),
      statusColumn(),
      updatedColumn(),
    ],
    rows: [
      createRecord({ id: "review-1", name: "Leadership Accelerator", subtitle: "Excellent pacing and practical tools.", owner: "Avery Scott", metric: "5.0", status: "Published", updatedAt: "Today" }),
      createRecord({ id: "review-2", name: "Ops Playbook Live", subtitle: "Wanted more templates in week two.", owner: "Elijah Flores", metric: "4.0", status: "Published", updatedAt: "Today" }),
      createRecord({ id: "review-3", name: "Customer Success Lab", subtitle: "Comment mentions another learner.", owner: "Harper Quinn", metric: "3.0", status: "Flagged", updatedAt: "Yesterday" }),
      createRecord({ id: "review-4", name: "Revenue Planning Workshop", subtitle: "Short but useful session.", owner: "Jack Foster", metric: "4.0", status: "Hidden", updatedAt: "Last week" }),
    ],
    rowActions: reviewRowActions,
  }),
  createPage({
    id: "schools",
    path: "community/schools",
    title: "Schools",
    section: "Community & Engagement",
    description: "Manage school directories, partner visibility, and program status.",
    stats: [
      createStat({ id: "schools-total", label: "Schools", value: "62", change: "+4", tone: "success", icon: "community" }),
      createStat({ id: "schools-live", label: "Live partner schools", value: "48", change: "Current", tone: "info", icon: "users" }),
      createStat({ id: "schools-pipeline", label: "In onboarding", value: "9", change: "Growing", tone: "success", icon: "chart" }),
      createStat({ id: "schools-risk", label: "Needs renewal", value: "5", change: "This month", tone: "warning", icon: "mail" }),
    ],
    actions: [
      createAction("add-school", "Add School", "School onboarding flow opened.", "primary", "users"),
      createAction("sync-directory", "Sync Directory", "School directory sync started.", "secondary", "refresh"),
    ],
    filters: [
      searchFilter("Search schools or owners"),
      selectFilter("owner", "Owner", [
        { label: "Sarah J.", value: "sarah" },
        { label: "David L.", value: "david" },
        { label: "Emily R.", value: "emily" },
      ], { columnId: "col_2" }),
      selectFilter("status", "Status", [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Pending", value: "pending" },
      ], { columnId: "col_6" }),
    ],
    filterLayout: "single",
    sortOptions: [
      { id: "name-asc", label: "Name (A-Z)", columnId: "col_0", direction: "asc" },
      { id: "name-desc", label: "Name (Z-A)", columnId: "col_0", direction: "desc" },
      { id: "members-desc", label: "Members (High-Low)", columnId: "col_4", direction: "desc" },
      { id: "products-desc", label: "Products (High-Low)", columnId: "col_3", direction: "desc" },
      { id: "created-desc", label: "Created (Newest)", columnId: "col_7", direction: "desc" },
    ],
    columns: [
      nameColumn("School"),
      textColumn("location", "Region"),
      textColumn("owner", "Owner"),
      statusColumn(),
      updatedColumn(),
    ],
    rows: [
      createRecord({ id: "school-1", name: "Northwind Academy", subtitle: "Enterprise partner school", location: "North America", owner: "Ava Morgan", status: "Active", updatedAt: "Today" }),
      createRecord({ id: "school-2", name: "Maple Street Learning", subtitle: "Regional workforce program", location: "North America", owner: "Olivia Hart", status: "Active", updatedAt: "Yesterday" }),
      createRecord({ id: "school-3", name: "Harbor Skills Hub", subtitle: "Partner launch in progress", location: "Europe", owner: "Jordan Malik", status: "Pending review", updatedAt: "Yesterday" }),
      createRecord({ id: "school-4", name: "Signal Path Institute", subtitle: "Renewal under review", location: "APAC", owner: "Sophia Chen", status: "Draft", updatedAt: "Last week" }),
    ],
    rowActions: communityActions,
  }),
];
