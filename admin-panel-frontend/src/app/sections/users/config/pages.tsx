import type { PageConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import {
  createAction,
  createPage,
  createRowAction,
  nameColumn,
  searchFilter,
  selectFilter,
  standardStatusOptions,
  statusColumn,
  tagsColumn,
  textColumn,
  updatedColumn,
  userLinksColumn,
} from "@/app/sections/shared/config/shared";

const userColumns = [
  nameColumn("User"),
  textColumn("email", "Email"),
  textColumn("plan", "Role"),
  tagsColumn(),
  userLinksColumn("viewLinks", "View"),
  userLinksColumn("linkedTo", "Linked To"),
  statusColumn(),
  updatedColumn("Last Active"),
];

const instructorColumns = [
  nameColumn("Instructor"),
  textColumn("email", "Email"),
  textColumn("metric", "Courses"),
  statusColumn("Payout Status"),
  updatedColumn("Approved"),
];

const contactColumns = [
  nameColumn("Contact"),
  textColumn("email", "Email"),
  textColumn("location", "Company"),
  statusColumn("Status"),
  updatedColumn("Updated"),
];

const memberColumns = [
  nameColumn("Member"),
  textColumn("email", "Email"),
  textColumn("plan", "Seat Type"),
  textColumn("count", "Teams"),
  statusColumn(),
];

const reviewActions = [
  createRowAction("view", "View", (row) => `Opened ${row.name}.`),
  createRowAction("edit", "Edit", (row) => `Editing ${row.name}.`, "ghost"),
];

const userManagementRowActions = [
  createRowAction("suspend", "Suspend", (row) => `Updated account state for ${row.name}.`),
  createRowAction("resend-verification", "Resend Verification Email", (row) => `Resent verification email to ${row.name}.`),
  createRowAction("change-role", "Change Role", (row) => `Opened role editor for ${row.name}.`),
  createRowAction("enroll-products", "Enroll in Product(s)", (row) => `Opened enrollment picker for ${row.name}.`),
  createRowAction("invite-spaces", "Invite to Space(s)", (row) => `Opened space invite flow for ${row.name}.`),
  createRowAction("tags", "Add/Remove Tags", (row) => `Opened tag manager for ${row.name}.`),
];

const userManagementBulkActions = [
  {
    id: "suspend",
    label: "Suspend",
    message: (rows: AdminRecord[]) => `Suspend would be applied to ${rows.length} selected users.`,
  },
  {
    id: "unsuspend",
    label: "Unsuspend",
    message: (rows: AdminRecord[]) => `Unsuspend would be applied to ${rows.length} selected users.`,
  },
  {
    id: "resend-verification",
    label: "Resend Verification Email",
    message: (rows: AdminRecord[]) => `Verification email would be resent to ${rows.length} selected users.`,
  },
  {
    id: "change-role",
    label: "Change Role",
    message: (rows: AdminRecord[]) => `Role change would open for ${rows.length} selected users.`,
  },
  {
    id: "enroll-products",
    label: "Enroll in Product(s)",
    message: (rows: AdminRecord[]) => `Enrollment flow would open for ${rows.length} selected users.`,
  },
  {
    id: "invite-spaces",
    label: "Invite to Space(s)",
    message: (rows: AdminRecord[]) => `Space invite would open for ${rows.length} selected users.`,
  },
  {
    id: "tags",
    label: "Add/Remove Tags",
    message: (rows: AdminRecord[]) => `Tag management would open for ${rows.length} selected users.`,
  },
];

const applicationActions = [
  createRowAction("approve", "Approve", (row) => `Approved ${row.name}.`),
  createRowAction("review", "Review", (row) => `Opened review for ${row.name}.`, "ghost"),
];

export const userPages: PageConfig<AdminRecord>[] = [
  createPage({
    id: "user-management",
    path: "users/user-management",
    title: "User Management",
    section: "User & Access Management",
    dataMode: "server",
    useLegacyData: false,
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Manage account state, roles, and member lifecycle across the platform.",
    actions: [
      createAction("invite-user", "Invite User", "Invite modal opened.", "primary", "users"),
      createAction("export-users", "Export", "User export queued.", "secondary", "document"),
    ],
    filters: [
      searchFilter("Search users, emails, or roles"),
      selectFilter("status", "Status", standardStatusOptions(), { columnId: "status" }),
      selectFilter("role", "Role", [
        { label: "Admin", value: "admin" },
        { label: "Manager", value: "manager" },
        { label: "Moderator", value: "moderator" },
        { label: "Learner", value: "learner" },
        { label: "Instructor", value: "instructor" },
        { label: "Student", value: "student" },
        { label: "Finance Admin", value: "finance admin" },
        { label: "Support", value: "support" },
      ], { columnId: "plan" }),
    ],
    enableSearchFieldSelector: true,
    searchFields: [
      { id: "name", label: "User" },
      { id: "email", label: "Email" },
      { id: "plan", label: "Role" },
      { id: "tags", label: "Tags" },
      { id: "status", label: "Status" },
    ],
    columns: userColumns,
    rowActionDisplay: "menu",
    rowActions: userManagementRowActions,
    bulkActions: userManagementBulkActions,
  }),
  createPage({
    id: "all-instructors",
    path: "users/all-instructors",
    title: "All Instructors",
    section: "User & Access Management",
    dataMode: "server",
    useLegacyData: false,
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Track instructor readiness, publishing volume, and payout eligibility.",
    actions: [
      createAction("add-instructor", "Add Instructor", "Instructor creation flow opened.", "primary", "users"),
      createAction("sync-profiles", "Sync Profiles", "Instructor sync started.", "secondary", "refresh"),
    ],
    filters: [
      searchFilter("Search instructors or specialties"),
      selectFilter("status", "Payout Status", [
        { label: "Eligible", value: "eligible" },
        { label: "Setup required", value: "setup required" },
        { label: "Processing", value: "processing" },
        { label: "On hold", value: "on hold" },
      ], { columnId: "status" }),
    ],
    enableSearchFieldSelector: true,
    searchFields: [
      { id: "name", label: "Instructor" },
      { id: "email", label: "Email" },
      { id: "metric", label: "Products" },
      { id: "status", label: "Payout Status" },
      { id: "updatedAt", label: "Approved Date" },
    ],
    columns: instructorColumns,
    rowActions: reviewActions,
  }),
  createPage({
    id: "applications",
    path: "users/applications",
    title: "Instructor Applications",
    section: "User & Access Management",
    dataMode: "server",
    useLegacyData: false,
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Review application intake, credentials, and onboarding readiness.",
    actions: [
      createAction("assign-reviewers", "Assign Reviewers", "Reviewer assignment panel opened.", "primary", "users"),
      createAction("download-pdfs", "Download Docs", "Application documents are downloading.", "secondary", "document"),
    ],
    filters: [
      searchFilter("Search applicants or topics"),
      selectFilter("status", "Stage", [
        { label: "Pending review", value: "pending review" },
        { label: "In review", value: "in review" },
        { label: "Interview", value: "interview" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ], { columnId: "status" }),
    ],
    enableSearchFieldSelector: true,
    searchFields: [
      { id: "name", label: "Applicant" },
      { id: "category", label: "Topic" },
      { id: "stage", label: "Stage" },
      { id: "status", label: "Status" },
    ],
    columns: [
      nameColumn("Applicant"),
      textColumn("category", "Topic"),
      textColumn("stage", "Stage"),
      statusColumn("Decision"),
      updatedColumn("Submitted"),
    ],
    rowActions: applicationActions,
  }),
  createPage({
    id: "team-contacts",
    path: "users/team-contacts",
    title: "Team Contacts",
    section: "User & Access Management",
    dataMode: "server",
    useLegacyData: false,
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Manage enterprise account contacts, approval owners, and renewal stakeholders.",
    actions: [
      createAction("new-contact", "Add Contact", "Contact form opened.", "primary", "users"),
      createAction("send-reminder", "Send Reminder", "Renewal reminders queued.", "secondary", "mail"),
    ],
    filters: [
      searchFilter("Search contacts or companies"),
      selectFilter("status", "Status", [
        { label: "Active", value: "active" },
        { label: "Expiring", value: "expiring" },
        { label: "Expired", value: "expired" },
      ], { columnId: "status" }),
    ],
    enableSearchFieldSelector: true,
    searchFields: [
      { id: "name", label: "Contact" },
      { id: "email", label: "Email" },
      { id: "location", label: "Company" },
      { id: "status", label: "Status" },
    ],
    columns: contactColumns,
    rowActions: reviewActions,
  }),
  createPage({
    id: "team-members",
    path: "users/team-members",
    title: "Team Members",
    section: "User & Access Management",
    dataMode: "server",
    useLegacyData: false,
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Review seat assignment, workspace membership, and access health.",
    actions: [
      createAction("assign-seats", "Assign Seats", "Seat assignment workflow opened.", "primary", "users"),
      createAction("audit-access", "Audit Access", "Access audit started.", "secondary", "refresh"),
    ],
    filters: [
      searchFilter("Search team members or seats"),
      selectFilter("status", "Status", [
        { label: "Accepted", value: "accepted" },
        { label: "Pending Invite", value: "pending invite" },
        { label: "Removed", value: "removed" },
      ], { columnId: "status" }),
    ],
    enableSearchFieldSelector: true,
    searchFields: [
      { id: "name", label: "Member" },
      { id: "email", label: "Email" },
      { id: "plan", label: "Plan" },
      { id: "count", label: "Role" },
      { id: "status", label: "Status" },
    ],
    columns: memberColumns,
    rowActions: reviewActions,
  }),
];
