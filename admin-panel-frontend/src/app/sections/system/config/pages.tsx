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
  statusColumn,
  textColumn,
  updatedColumn,
} from "@/app/sections/shared/config/shared";

const systemActions = [
  createRowAction("open", "Open", (row) => `Opened ${row.name}.`),
  createRowAction("retry", "Retry", (row) => `Retried ${row.name}.`, "ghost"),
];

export const systemPages: PageConfig<AdminRecord>[] = [
  createPage({
    id: "checklist-instances",
    path: "system/checklist-instances",
    title: "Checklist Instances",
    section: "System & Operations",
    description: "Track compliance checklist runs for products and profiles.",
    stats: [
      createStat({ id: "check-runs", label: "Runs this week", value: "312", change: "+26", tone: "success", icon: "document" }),
      createStat({ id: "check-pass", label: "Pass rate", value: "94%", change: "+1 pt", tone: "success", icon: "chart" }),
      createStat({ id: "check-blocked", label: "Blocked", value: "12", change: "Needs follow-up", tone: "warning", icon: "system" }),
      createStat({ id: "check-overdue", label: "Overdue", value: "5", change: "Escalate", tone: "danger", icon: "calendar" }),
    ],
    actions: [
      createAction("new-checklist", "Create Checklist", "Checklist builder opened.", "primary", "document"),
      createAction("run-audit", "Run Audit", "Compliance audit started.", "secondary", "refresh"),
    ],
    filters: [
      searchFilter("Search checklist runs or owners"),
      selectFilter("status", "Status", [
        { label: "Completed", value: "completed" },
        { label: "In progress", value: "progress" },
        { label: "Blocked", value: "blocked" },
        { label: "Overdue", value: "overdue" },
      ]),
    ],
    columns: [
      nameColumn("Checklist"),
      textColumn("owner", "Owner"),
      metricColumn("Progress"),
      statusColumn(),
      updatedColumn("Due"),
    ],
    rows: [
      createRecord({ id: "check-1", name: "Product launch compliance", subtitle: "Leadership Accelerator", owner: "Ava Morgan", metric: "100%", status: "Completed", updatedAt: "Today" }),
      createRecord({ id: "check-2", name: "Instructor profile review", subtitle: "Nina Alvarez", owner: "Olivia Hart", metric: "78%", status: "In progress", updatedAt: "Today" }),
      createRecord({ id: "check-3", name: "Team plan tax review", subtitle: "Northwind Analytics", owner: "Sophia Chen", metric: "44%", status: "Blocked", updatedAt: "Tomorrow" }),
      createRecord({ id: "check-4", name: "Legacy bundle cleanup", subtitle: "Growth Bundle", owner: "Jordan Malik", metric: "22%", status: "Overdue", updatedAt: "Yesterday" }),
    ],
    rowActions: systemActions,
  }),
  createPage({
    id: "search-management",
    path: "system/search-management",
    title: "Search Management",
    section: "System & Operations",
    description: "Monitor query performance, indexing health, and content discoverability.",
    actions: [
      createAction("rebuild-index", "Rebuild Index", "Index rebuild started.", "primary", "refresh"),
      createAction("export-queries", "Export Queries", "Search query export queued.", "secondary", "document"),
    ],
    tabs: [
      {
        id: "analytics",
        label: "Analytics",
        stats: [
          createStat({ id: "search-queries", label: "Daily queries", value: "18.2k", change: "+9.1%", tone: "success", icon: "chart" }),
          createStat({ id: "search-click", label: "Click-through", value: "34%", change: "+2 pts", tone: "success", icon: "users" }),
          createStat({ id: "search-zero", label: "Zero-result rate", value: "4.8%", change: "Needs tuning", tone: "warning", icon: "system" }),
          createStat({ id: "search-latency", label: "Avg. latency", value: "182ms", change: "Healthy", tone: "info", icon: "activity" }),
        ],
        filters: [
          searchFilter("Search queries or indexed entities"),
          selectFilter("status", "Status", [
            { label: "Healthy", value: "healthy" },
            { label: "Needs tuning", value: "tuning" },
            { label: "Critical", value: "critical" },
          ]),
        ],
        columns: [
          nameColumn("Query Group"),
          metricColumn("Volume"),
          textColumn("count", "Zero-result"),
          statusColumn(),
          updatedColumn("Updated"),
        ],
        rows: [
          createRecord({ id: "search-1", name: "leadership", subtitle: "Program and collection queries", metric: "4.8k", count: "2.1%", status: "Healthy", updatedAt: "Today" }),
          createRecord({ id: "search-2", name: "team plans", subtitle: "B2B pricing discovery", metric: "2.4k", count: "6.8%", status: "Needs tuning", updatedAt: "Today" }),
          createRecord({ id: "search-3", name: "coaching", subtitle: "Mentor and event results", metric: "1.1k", count: "9.4%", status: "Critical", updatedAt: "Yesterday" }),
        ],
        rowActions: systemActions,
      },
      {
        id: "index",
        label: "Index Health",
        stats: [
          createStat({ id: "index-docs", label: "Indexed documents", value: "184k", change: "+2.2k", tone: "success", icon: "document" }),
          createStat({ id: "index-failures", label: "Failed jobs", value: "7", change: "Recover", tone: "warning", icon: "system" }),
          createStat({ id: "index-backlog", label: "Backlog", value: "418", change: "Normal", tone: "info", icon: "chart" }),
          createStat({ id: "index-age", label: "Freshness", value: "12 min", change: "Healthy", tone: "success", icon: "refresh" }),
        ],
        filters: [
          searchFilter("Search jobs or sources"),
          selectFilter("status", "Status", [
            { label: "Completed", value: "completed" },
            { label: "Queued", value: "queued" },
            { label: "Failed", value: "failed" },
          ]),
        ],
        columns: [
          nameColumn("Job"),
          textColumn("source", "Source"),
          metricColumn("Documents"),
          statusColumn(),
          updatedColumn("Last run"),
        ],
        rows: [
          createRecord({ id: "index-1", name: "catalog-sync", subtitle: "Products and bundles", source: "Product service", metric: "4,280 docs", status: "Completed", updatedAt: "12 minutes ago" }),
          createRecord({ id: "index-2", name: "community-sync", subtitle: "Spaces and posts", source: "Community service", metric: "18,420 docs", status: "Queued", updatedAt: "5 minutes ago" }),
          createRecord({ id: "index-3", name: "school-sync", subtitle: "Partner directories", source: "CRM feed", metric: "620 docs", status: "Failed", updatedAt: "Today" }),
        ],
        rowActions: systemActions,
      },
    ],
  }),
  createPage({
    id: "marketing-emails",
    path: "system/marketing-emails",
    title: "Marketing Emails",
    section: "System & Operations",
    description: "Manage lifecycle campaigns, send health, and audience delivery coverage.",
    stats: [
      createStat({ id: "email-campaigns", label: "Active campaigns", value: "22", change: "+3", tone: "success", icon: "mail" }),
      createStat({ id: "email-open", label: "Open rate", value: "39%", change: "+2 pts", tone: "success", icon: "chart" }),
      createStat({ id: "email-bounce", label: "Bounce rate", value: "1.8%", change: "Healthy", tone: "info", icon: "system" }),
      createStat({ id: "email-paused", label: "Paused flows", value: "4", change: "Monitor", tone: "warning", icon: "calendar" }),
    ],
    actions: [
      createAction("new-campaign", "New Campaign", "Campaign builder opened.", "primary", "mail"),
      createAction("audience-sync", "Sync Audience", "Audience sync started.", "secondary", "refresh"),
    ],
    filters: [
      searchFilter("Search campaigns or audiences"),
      selectFilter("status", "Status", [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
        { label: "Paused", value: "paused" },
      ]),
    ],
    columns: [
      nameColumn("Campaign"),
      textColumn("owner", "Audience"),
      metricColumn("Open rate"),
      statusColumn(),
      updatedColumn("Scheduled"),
    ],
    rows: [
      createRecord({ id: "email-1", name: "New trial welcome", subtitle: "Lifecycle onboarding", owner: "Trial users", metric: "52%", status: "Active", updatedAt: "Daily" }),
      createRecord({ id: "email-2", name: "Leadership launch announcement", subtitle: "Product marketing", owner: "Subscribers", metric: "41%", status: "Draft", updatedAt: "Apr 10" }),
      createRecord({ id: "email-3", name: "Low engagement rescue", subtitle: "Reactivation series", owner: "Dormant learners", metric: "28%", status: "Paused", updatedAt: "Weekly" }),
      createRecord({ id: "email-4", name: "Enterprise renewal reminder", subtitle: "B2B success motion", owner: "Renewals due", metric: "48%", status: "Active", updatedAt: "Apr 12" }),
    ],
    rowActions: systemActions,
  }),
  createPage({
    id: "system-health",
    path: "system/system-health",
    title: "System Health & Logs",
    section: "System & Operations",
    description: "Track service status, operational logs, and admin activity from one place.",
    actions: [
      createAction("refresh-health", "Refresh Status", "System status refreshed.", "primary", "refresh"),
      createAction("download-logs", "Download Logs", "Log export is downloading.", "secondary", "document"),
    ],
    tabs: [
      {
        id: "overview",
        label: "Overview",
        stats: [
          createStat({ id: "health-api", label: "API uptime", value: "99.98%", change: "Healthy", tone: "success", icon: "activity" }),
          createStat({ id: "health-email", label: "Email delivery", value: "99.2%", change: "Stable", tone: "success", icon: "mail" }),
          createStat({ id: "health-errors", label: "Open incidents", value: "3", change: "Needs review", tone: "warning", icon: "system" }),
          createStat({ id: "health-admin", label: "Admin actions today", value: "418", change: "Tracked", tone: "info", icon: "users" }),
        ],
        filters: [
          searchFilter("Search services or incidents"),
          selectFilter("status", "Status", [
            { label: "Healthy", value: "healthy" },
            { label: "Warning", value: "warning" },
            { label: "Critical", value: "critical" },
          ]),
        ],
        columns: [
          nameColumn("Service"),
          metricColumn("Health"),
          textColumn("owner", "Owner"),
          statusColumn(),
          updatedColumn("Updated"),
        ],
        rows: [
          createRecord({ id: "health-1", name: "Public API", subtitle: "Core application traffic", metric: "99.98%", owner: "Platform", status: "Healthy", updatedAt: "2 minutes ago" }),
          createRecord({ id: "health-2", name: "Billing webhooks", subtitle: "Payment provider callbacks", metric: "97.8%", owner: "Financial ops", status: "Warning", updatedAt: "Today" }),
          createRecord({ id: "health-3", name: "Email pipeline", subtitle: "Transactional and lifecycle", metric: "99.2%", owner: "Lifecycle team", status: "Healthy", updatedAt: "Today" }),
        ],
        rowActions: systemActions,
      },
      {
        id: "api-logs",
        label: "API & Webhook Logs",
        filters: [
          searchFilter("Search requests, routes, or ids"),
          selectFilter("status", "Status", [
            { label: "200", value: "200" },
            { label: "202", value: "202" },
            { label: "429", value: "429" },
            { label: "500", value: "500" },
          ]),
        ],
        columns: [
          nameColumn("Request"),
          textColumn("source", "Source"),
          metricColumn("Latency"),
          statusColumn("Code"),
          updatedColumn("Time"),
        ],
        rows: [
          createRecord({ id: "api-1", name: "POST /v1/checkout/session", subtitle: "req_2ds91", source: "Checkout app", metric: "182ms", status: "200", updatedAt: "10:24 AM" }),
          createRecord({ id: "api-2", name: "POST /webhooks/stripe", subtitle: "evt_9a2k", source: "Stripe", metric: "96ms", status: "202", updatedAt: "10:22 AM" }),
          createRecord({ id: "api-3", name: "GET /v1/catalog/search", subtitle: "req_2ds88", source: "Web app", metric: "412ms", status: "429", updatedAt: "10:18 AM" }),
          createRecord({ id: "api-4", name: "POST /v1/team-plans", subtitle: "req_2ds70", source: "Admin app", metric: "1.2s", status: "500", updatedAt: "9:58 AM" }),
        ],
        rowActions: systemActions,
      },
      {
        id: "errors",
        label: "Application Errors",
        filters: [
          searchFilter("Search stack traces or services"),
          selectFilter("status", "Severity", [
            { label: "Critical", value: "critical" },
            { label: "Warning", value: "warning" },
            { label: "Resolved", value: "resolved" },
          ]),
        ],
        columns: [
          nameColumn("Error"),
          textColumn("source", "Service"),
          textColumn("priority", "Severity"),
          statusColumn(),
          updatedColumn("Seen"),
        ],
        rows: [
          createRecord({ id: "err-1", name: "Checkout timeout spike", subtitle: "Trace group checkout-420", source: "Payments API", priority: "Critical", status: "Critical", updatedAt: "5 minutes ago" }),
          createRecord({ id: "err-2", name: "Search reindex failure", subtitle: "Batch index-sync-22", source: "Search worker", priority: "Warning", status: "Warning", updatedAt: "Today" }),
          createRecord({ id: "err-3", name: "Email template key missing", subtitle: "Notification template compile", source: "Email service", priority: "Resolved", status: "Resolved", updatedAt: "Yesterday" }),
        ],
        rowActions: systemActions,
      },
      {
        id: "admin-actions",
        label: "Admin Action Log",
        filters: [searchFilter("Search admins, actions, or resources")],
        columns: [
          nameColumn("Action"),
          textColumn("owner", "Admin"),
          textColumn("source", "Resource"),
          statusColumn("Result"),
          updatedColumn("Time"),
        ],
        rows: [
          createRecord({ id: "admin-1", name: "Updated team plan pricing", subtitle: "Changed Northwind renewal amount", owner: "Sophia Chen", source: "Team Plans", status: "Completed", updatedAt: "10:12 AM" }),
          createRecord({ id: "admin-2", name: "Approved instructor application", subtitle: "Grace Turner", owner: "Olivia Hart", source: "Instructor Applications", status: "Completed", updatedAt: "9:42 AM" }),
          createRecord({ id: "admin-3", name: "Retried failed webhook", subtitle: "evt_9a2k", owner: "Ava Morgan", source: "System Health", status: "Completed", updatedAt: "9:15 AM" }),
        ],
        rowActions: systemActions,
      },
      {
        id: "email-logs",
        label: "Email Log",
        filters: [
          searchFilter("Search emails, recipients, or templates"),
          selectFilter("status", "Status", [
            { label: "Delivered", value: "delivered" },
            { label: "Bounced", value: "bounced" },
            { label: "Deferred", value: "deferred" },
          ]),
        ],
        columns: [
          nameColumn("Email"),
          textColumn("owner", "Recipient"),
          textColumn("source", "Template"),
          statusColumn(),
          updatedColumn("Sent"),
        ],
        rows: [
          createRecord({ id: "elog-1", name: "Trial expiring reminder", subtitle: "msg_9921", owner: "mia@skillhub.com", source: "trial-expiring-v2", status: "Delivered", updatedAt: "10:05 AM" }),
          createRecord({ id: "elog-2", name: "Billing failure alert", subtitle: "msg_9914", owner: "lucas@archlight.co", source: "billing-failure-v1", status: "Deferred", updatedAt: "9:58 AM" }),
          createRecord({ id: "elog-3", name: "Weekly digest", subtitle: "msg_9898", owner: "harper@northwind.io", source: "weekly-digest-v4", status: "Delivered", updatedAt: "8:30 AM" }),
          createRecord({ id: "elog-4", name: "Welcome email", subtitle: "msg_9881", owner: "bad-address@example.com", source: "welcome-v3", status: "Bounced", updatedAt: "Yesterday" }),
        ],
        rowActions: systemActions,
      },
    ],
  }),
];
