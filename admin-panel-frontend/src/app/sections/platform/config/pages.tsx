import type { PageConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import { PlatformSettingsPage } from "@/app/sections/platform/pages/PlatformSettingsPage";
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

const platformActions = [
  createRowAction("open", "Open", (row) => `Opened ${row.name}.`),
  createRowAction("review", "Review", (row) => `Reviewing ${row.name}.`, "ghost"),
];

export const platformPages: PageConfig<AdminRecord>[] = [
  createPage({
    id: "platform-settings",
    path: "platform/settings",
    title: "Platform Settings",
    section: "Platform",
    description: "Configure global settings, checkout behavior, and team controls.",
    component: PlatformSettingsPage,
  }),
  createPage({
    id: "form-submissions",
    path: "platform/form-submissions",
    title: "Form Submissions",
    section: "Platform",
    description: "Review inbound forms, triage requests, and track resolution state.",
    actions: [
      createAction("new-workflow", "New Workflow", "Submission workflow builder opened.", "primary", "document"),
      createAction("export-submissions", "Export", "Submission export generated.", "secondary", "document"),
    ],
    tabs: [
      {
        id: "intake",
        label: "Intake Forms",
        stats: [
          createStat({ id: "forms-new", label: "New today", value: "42", change: "+8", tone: "success", icon: "mail" }),
          createStat({ id: "forms-sla", label: "Inside SLA", value: "91%", change: "+3 pts", tone: "success", icon: "chart" }),
          createStat({ id: "forms-urgent", label: "Urgent", value: "6", change: "Watch", tone: "warning", icon: "system" }),
          createStat({ id: "forms-resolved", label: "Resolved this week", value: "134", change: "Healthy", tone: "info", icon: "document" }),
        ],
        filters: [
          searchFilter("Search submissions or requesters"),
          selectFilter("type", "Type", [
            { label: "Support", value: "support" },
            { label: "Instructor App", value: "instructor" },
            { label: "Refund", value: "refund" },
            { label: "Report", value: "report" },
          ], { columnId: "col_2" }),
          selectFilter("status", "Status", [
            { label: "New", value: "new" },
            { label: "In review", value: "review" },
            { label: "Resolved", value: "resolved" },
          ], { columnId: "col_4" }),
        ],
        filterLayout: "split",
        bulkActions: [],
        sortOptions: [
          { id: "date-desc", label: "Date (Newest)", columnId: "col_3", direction: "desc" },
          { id: "date-asc", label: "Date (Oldest)", columnId: "col_3", direction: "asc" },
          { id: "status-priority", label: "Status Priority", columnId: "col_4", direction: "asc" },
        ],
        columns: [
          nameColumn("Submission"),
          textColumn("owner", "Requester"),
          textColumn("category", "Form Type"),
          statusColumn(),
          updatedColumn("Received"),
        ],
        rows: [
          createRecord({ id: "form-1", name: "Enterprise onboarding request", subtitle: "14-seat rollout", owner: "Brooke Hayes", category: "Sales intake", status: "New", updatedAt: "10 minutes ago" }),
          createRecord({ id: "form-2", name: "Instructor reimbursement form", subtitle: "Workshop expenses", owner: "Nina Alvarez", category: "Finance", status: "In review", updatedAt: "Today" }),
          createRecord({ id: "form-3", name: "School partnership inquiry", subtitle: "Regional program inquiry", owner: "Signal Path Institute", category: "Partnership", status: "Resolved", updatedAt: "Yesterday" }),
        ],
        rowActions: platformActions,
      },
      {
        id: "approvals",
        label: "Approval Queue",
        stats: [
          createStat({ id: "approval-pending", label: "Pending approval", value: "18", change: "Queue", tone: "warning", icon: "document" }),
          createStat({ id: "approval-today", label: "Approved today", value: "11", change: "+4", tone: "success", icon: "users" }),
          createStat({ id: "approval-breached", label: "Breached SLA", value: "2", change: "Escalate", tone: "danger", icon: "system" }),
          createStat({ id: "approval-owners", label: "Review owners", value: "6", change: "Assigned", tone: "info", icon: "users" }),
        ],
        filters: [
          searchFilter("Search approval requests"),
          selectFilter("type", "Type", [
            { label: "Coupon Campaign", value: "coupon" },
            { label: "Contract Update", value: "contract" },
            { label: "Seat Exception", value: "exception" },
          ], { columnId: "col_2" }),
          selectFilter("status", "Status", [
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ], { columnId: "col_4" }),
        ],
        filterLayout: "split",
        bulkActions: [],
        sortOptions: [
          { id: "submitted-desc", label: "Date (Newest)", columnId: "col_4", direction: "desc" },
          { id: "submitted-asc", label: "Date (Oldest)", columnId: "col_4", direction: "asc" },
          { id: "priority-asc", label: "Status Priority", columnId: "col_2", direction: "asc" },
        ],
        columns: [
          nameColumn("Request"),
          textColumn("owner", "Owner"),
          textColumn("priority", "Priority"),
          statusColumn(),
          updatedColumn("Submitted"),
        ],
        rows: [
          createRecord({ id: "approval-1", name: "Coupon campaign approval", subtitle: "Q2 launch campaign", owner: "Sophia Chen", priority: "High", status: "Pending", updatedAt: "Today" }),
          createRecord({ id: "approval-2", name: "Instructor contract update", subtitle: "Rate change request", owner: "Jordan Malik", priority: "Medium", status: "Approved", updatedAt: "Today" }),
          createRecord({ id: "approval-3", name: "Enterprise seat exception", subtitle: "Temporary overage", owner: "Ava Morgan", priority: "High", status: "Rejected", updatedAt: "Yesterday" }),
        ],
        rowActions: platformActions,
      },
    ],
  }),
  createPage({
    id: "team-plans",
    path: "platform/team-plans",
    title: "Team Plans",
    section: "Platform",
    description: "Manage fixed seats, credit plans, and subscription lifecycle for team accounts.",
    actions: [
      createAction("create-team-plan", "Create Plan", "Team plan builder opened.", "primary", "money"),
      createAction("sync-usage", "Sync Usage", "Team usage sync started.", "secondary", "refresh"),
    ],
    tabs: [
      {
        id: "manager-selected",
        label: "Manager-Selected (Fixed)",
        stats: [
          createStat({ id: "fixed-accounts", label: "Accounts", value: "126", change: "+7", tone: "success", icon: "users" }),
          createStat({ id: "fixed-seats", label: "Allocated seats", value: "2,840", change: "+4.3%", tone: "success", icon: "chart" }),
          createStat({ id: "fixed-unused", label: "Unused seats", value: "214", change: "Optimize", tone: "warning", icon: "system" }),
          createStat({ id: "fixed-renew", label: "Renewing soon", value: "22", change: "30 days", tone: "info", icon: "calendar" }),
        ],
        filters: [
          searchFilter("Search accounts or managers"),
          selectFilter("status", "Status", [
            { label: "Active", value: "active" },
            { label: "Renewal", value: "renew" },
            { label: "At risk", value: "risk" },
          ], { columnId: "col_6" }),
          selectFilter("purchased-date", "Purchased Date", [
            { label: "This Month", value: "2025" },
            { label: "Last 90 Days", value: "jan" },
            { label: "Older", value: "2024" },
          ], { columnId: "col_5" }),
        ],
        filterLayout: "single",
        sortOptions: [],
        bulkActions: [],
        columns: [
          nameColumn("Account"),
          textColumn("owner", "Manager"),
          textColumn("seats", "Seats"),
          statusColumn(),
          updatedColumn("Renewal"),
        ],
        rows: [
          createRecord({ id: "teamfixed-1", name: "Northwind Analytics", subtitle: "Leadership enablement rollout", owner: "Brooke Hayes", seats: "240 seats", status: "Active", updatedAt: "Jun 12" }),
          createRecord({ id: "teamfixed-2", name: "Kindred Labs", subtitle: "Manager academy", owner: "Emma Cross", seats: "120 seats", status: "Renewal", updatedAt: "Apr 26" }),
          createRecord({ id: "teamfixed-3", name: "Signal Path", subtitle: "Regional team enablement", owner: "Mason Price", seats: "84 seats", status: "At risk", updatedAt: "May 4" }),
        ],
        rowActions: platformActions,
      },
      {
        id: "member-selected",
        label: "Member-Selected (Credits)",
        stats: [
          createStat({ id: "credit-accounts", label: "Accounts", value: "84", change: "+5", tone: "success", icon: "users" }),
          createStat({ id: "credit-balance", label: "Credits available", value: "18,420", change: "Current", tone: "info", icon: "money" }),
          createStat({ id: "credit-burn", label: "Avg. monthly burn", value: "6,240", change: "+8%", tone: "success", icon: "chart" }),
          createStat({ id: "credit-alerts", label: "Low balance alerts", value: "11", change: "Action needed", tone: "warning", icon: "mail" }),
        ],
        filters: [
          searchFilter("Search credit accounts"),
          selectFilter("status", "Status", [
            { label: "Active", value: "active" },
            { label: "Low balance", value: "low" },
            { label: "Paused", value: "paused" },
          ], { columnId: "col_6" }),
          selectFilter("purchased-date", "Purchased Date", [
            { label: "This Month", value: "2025" },
            { label: "Last 90 Days", value: "feb" },
            { label: "Older", value: "2024" },
          ], { columnId: "col_5" }),
        ],
        filterLayout: "single",
        sortOptions: [],
        bulkActions: [],
        columns: [
          nameColumn("Account"),
          textColumn("owner", "Admin"),
          metricColumn("Credits"),
          statusColumn(),
          updatedColumn("Updated"),
        ],
        rows: [
          createRecord({ id: "teamcredit-1", name: "Maple Street Learning", subtitle: "Flexible seat access", owner: "Avery Scott", metric: "4,800 credits", status: "Active", updatedAt: "Today" }),
          createRecord({ id: "teamcredit-2", name: "Harbor Skills Hub", subtitle: "Regional upskilling", owner: "Liam Walker", metric: "620 credits", status: "Low balance", updatedAt: "Today" }),
          createRecord({ id: "teamcredit-3", name: "Cedarlane Group", subtitle: "Ops academy", owner: "Sophia Chen", metric: "2,100 credits", status: "Paused", updatedAt: "Yesterday" }),
        ],
        rowActions: platformActions,
      },
      {
        id: "team-subscriptions",
        label: "Team Subscriptions",
        stats: [
          createStat({ id: "team-subs", label: "Team subscriptions", value: "210", change: "+9", tone: "success", icon: "money" }),
          createStat({ id: "team-arr", label: "Annualized revenue", value: "$1.9M", change: "+14%", tone: "success", icon: "chart" }),
          createStat({ id: "team-renewals", label: "Renewing in 60 days", value: "28", change: "Pipeline", tone: "info", icon: "calendar" }),
          createStat({ id: "team-delinquent", label: "Past due", value: "6", change: "Watch", tone: "warning", icon: "system" }),
        ],
        filters: [
          searchFilter("Search subscriptions or companies"),
          selectFilter("status", "Status", [
            { label: "Active", value: "active" },
            { label: "Past due", value: "due" },
            { label: "Canceled", value: "canceled" },
          ], { columnId: "col_6" }),
          selectFilter("purchased-date", "Purchased Date", [
            { label: "This Month", value: "2025" },
            { label: "Last 90 Days", value: "may" },
            { label: "Older", value: "2024" },
          ], { columnId: "col_5" }),
        ],
        filterLayout: "single",
        sortOptions: [],
        bulkActions: [],
        columns: [
          nameColumn("Subscription"),
          textColumn("plan", "Plan"),
          textColumn("amount", "Billing"),
          statusColumn(),
          updatedColumn("Renewal"),
        ],
        rows: [
          createRecord({ id: "teamsub-1", name: "Northwind Enterprise", subtitle: "Manager-selected plan", plan: "Annual fixed", amount: "$48,000 / year", status: "Active", updatedAt: "Jul 1" }),
          createRecord({ id: "teamsub-2", name: "Maple Street Growth", subtitle: "Credit plan", plan: "Quarterly credits", amount: "$12,000 / quarter", status: "Active", updatedAt: "May 12" }),
          createRecord({ id: "teamsub-3", name: "Signal Path Team", subtitle: "Renewal under review", plan: "Annual fixed", amount: "$18,000 / year", status: "Past due", updatedAt: "Apr 10" }),
        ],
        rowActions: platformActions,
      },
    ],
  }),
  createPage({
    id: "notifications",
    path: "platform/notifications",
    title: "Notifications",
    section: "Platform",
    dataMode: "server",
    density: "comfortable",
    defaultPageSize: 25,
    rowsPerPageOptions: [10, 25, 50, 100],
    defaultSortColumn: "updatedAt",
    description: "Control delivery status, campaign timing, and operational notification health.",
    stats: [
      createStat({ id: "notif-sent", label: "Sent today", value: "18,420", change: "+12%", tone: "success", icon: "bell" }),
      createStat({ id: "notif-open", label: "Open rate", value: "42%", change: "+3 pts", tone: "success", icon: "chart" }),
      createStat({ id: "notif-failed", label: "Failed sends", value: "61", change: "Watch", tone: "warning", icon: "system" }),
      createStat({ id: "notif-scheduled", label: "Scheduled", value: "14", change: "Queue", tone: "info", icon: "calendar" }),
    ],
    actions: [
      createAction("compose-notification", "Compose", "Notification composer opened.", "primary", "bell"),
      createAction("test-send", "Send Test", "Test notification sent.", "secondary", "mail"),
    ],
    filters: [
      searchFilter("Search notifications or audiences"),
      selectFilter("type", "Type", [
        { label: "SYSTEM", value: "system" },
        { label: "STUDENT_ENROLLMENT", value: "student" },
        { label: "BADGE_AWARDED", value: "badge" },
        { label: "NEW_COMMENT", value: "comment" },
        { label: "CHECKLIST_ISSUE", value: "checklist" },
      ], { columnId: "col_2" }),
      selectFilter("status", "Status", [
        { label: "Delivered", value: "delivered" },
        { label: "Scheduled", value: "scheduled" },
        { label: "Draft", value: "draft" },
        { label: "Failed", value: "failed" },
      ], { columnId: "col_4" }),
      selectFilter("date", "Date", [
        { label: "Today", value: "today" },
        { label: "This Week", value: "oct" },
        { label: "This Month", value: "2024" },
      ], { columnId: "col_5" }),
    ],
    filterLayout: "split",
    sortOptions: [
      { id: "sent-desc", label: "Sent At (Newest)", columnId: "col_5", direction: "desc" },
      { id: "sent-asc", label: "Sent At (Oldest)", columnId: "col_5", direction: "asc" },
      { id: "recipient-asc", label: "Recipient (A-Z)", columnId: "col_1", direction: "asc" },
      { id: "recipient-desc", label: "Recipient (Z-A)", columnId: "col_1", direction: "desc" },
      { id: "type-asc", label: "Type (A-Z)", columnId: "col_2", direction: "asc" },
      { id: "type-desc", label: "Type (Z-A)", columnId: "col_2", direction: "desc" },
    ],
    bulkActions: [
      { id: "mark-read", label: "Mark as Read", message: (rows) => `${rows.length} selected notifications would be marked as read.` },
      { id: "delete", label: "Delete", message: (rows) => `Delete would run for ${rows.length} selected notifications.` },
    ],
    columns: [
      nameColumn("Notification"),
      textColumn("owner", "Audience"),
      metricColumn("Reach"),
      statusColumn(),
      updatedColumn("Scheduled"),
    ],
    rows: [
      createRecord({ id: "notif-1", name: "Weekly learner digest", subtitle: "Usage recap email", owner: "All subscribers", metric: "12.4k recipients", status: "Delivered", updatedAt: "Today" }),
      createRecord({ id: "notif-2", name: "Trial expiring reminder", subtitle: "Lifecycle email", owner: "Trials ending in 3 days", metric: "620 recipients", status: "Scheduled", updatedAt: "Apr 8" }),
      createRecord({ id: "notif-3", name: "New event announcement", subtitle: "Community launch push", owner: "Leadership Circle", metric: "4.8k recipients", status: "Draft", updatedAt: "Apr 10" }),
      createRecord({ id: "notif-4", name: "Billing failure alert", subtitle: "Payment recovery flow", owner: "Past due subscribers", metric: "97 recipients", status: "Failed", updatedAt: "Today" }),
    ],
    rowActions: platformActions,
  }),
];
