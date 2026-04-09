"use client";

import { Card } from "@/app/components/ui/Card";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { PageHeader } from "@/app/components/page/PageHeader";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { useToast } from "@/app/providers/ToastProvider";
import { createStat } from "@/app/sections/shared/config/shared";

const stats = [
  createStat({ id: "dash-mrr", label: "Monthly recurring revenue", value: "$428k", change: "+12.4%", tone: "success", icon: "money" }),
  createStat({ id: "dash-learners", label: "Active learners", value: "19,204", change: "+4.6%", tone: "success", icon: "users" }),
  createStat({ id: "dash-events", label: "Upcoming sessions", value: "46", change: "+5", tone: "info", icon: "calendar" }),
  createStat({ id: "dash-alerts", label: "Open operational alerts", value: "9", change: "Needs attention", tone: "warning", icon: "system" }),
];

const revenueBars = [
  { label: "Mon", value: "$42k", width: "62%" },
  { label: "Tue", value: "$51k", width: "74%" },
  { label: "Wed", value: "$48k", width: "68%" },
  { label: "Thu", value: "$57k", width: "80%" },
  { label: "Fri", value: "$64k", width: "92%" },
  { label: "Sat", value: "$36k", width: "54%" },
  { label: "Sun", value: "$39k", width: "58%" },
];

const activityItems = [
  { id: "activity-1", title: "Northwind Analytics renewed 240 seats", detail: "Team plan updated by Sophia Chen", time: "12 minutes ago", tone: "success" as const },
  { id: "activity-2", title: "Checkout timeout incident created", detail: "Payments API breached latency threshold", time: "27 minutes ago", tone: "warning" as const },
  { id: "activity-3", title: "Leadership Accelerator published new module", detail: "Content release by Nina Alvarez", time: "1 hour ago", tone: "info" as const },
  { id: "activity-4", title: "Trial expiration campaign sent", detail: "620 recipients in lifecycle segment", time: "2 hours ago", tone: "neutral" as const },
];

const progressItems = [
  { id: "progress-1", label: "Leadership Accelerator", value: "74%", width: "74%" },
  { id: "progress-2", label: "Manager Enablement Sprint", value: "68%", width: "68%" },
  { id: "progress-3", label: "Customer Success Lab", value: "81%", width: "81%" },
  { id: "progress-4", label: "Ops Playbook Live", value: "56%", width: "56%" },
];

const healthItems = [
  { id: "health-1", label: "Public API", status: "Healthy", helper: "99.98% uptime", tone: "success" as const },
  { id: "health-2", label: "Billing webhooks", status: "Warning", helper: "Retry queue elevated", tone: "warning" as const },
  { id: "health-3", label: "Email delivery", status: "Healthy", helper: "99.2% delivered", tone: "success" as const },
  { id: "health-4", label: "Search indexing", status: "Healthy", helper: "12 min freshness", tone: "info" as const },
];

export function DashboardPage() {
  const { notify } = useToast();

  return (
    <div className="page-container">
      <PageHeader
        title="Dashboard"
        description="A shared operational view across revenue, learning activity, and system health."
        actions={[
          { id: "export-overview", label: "Export Overview", variant: "secondary", icon: "document", message: "Dashboard export queued." },
          { id: "refresh-dashboard", label: "Refresh", variant: "primary", icon: "refresh", message: "Dashboard refreshed." },
        ]}
        onAction={notify}
      />

      <StatsGrid stats={stats} />

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card title="Revenue Overview">
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-4">
              {revenueBars.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-text-primary">{item.label}</span>
                    <span className="text-text-secondary">{item.value}</span>
                  </div>
                  <div className="h-3 rounded-full bg-surface-muted">
                    <div className="h-3 rounded-full bg-gradient-to-r from-brand to-[#4FBAE9]" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3 rounded-xl bg-surface-muted p-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Revenue mix</div>
                <div className="mt-1 text-2xl font-semibold text-text-primary">68% subscriptions</div>
              </div>
              <div className="rounded-lg border border-surface-line bg-white p-3">
                <div className="text-sm font-medium text-text-primary">Top driver</div>
                <div className="mt-1 text-sm text-text-secondary">Enterprise team renewals contributed $124k this week.</div>
              </div>
              <div className="rounded-lg border border-surface-line bg-white p-3">
                <div className="text-sm font-medium text-text-primary">Watch item</div>
                <div className="mt-1 text-sm text-text-secondary">Past-due subscriptions are up 6 accounts versus yesterday.</div>
              </div>
              <Button variant="secondary" className="w-full" onClick={() => notify("Revenue report opened.")}>View financial report</Button>
            </div>
          </div>
        </Card>

        <Card title="Recent Activity">
          <div className="space-y-4">
            {activityItems.map((item) => (
              <div key={item.id} className="rounded-xl border border-surface-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-medium text-text-primary">{item.title}</div>
                    <div className="mt-1 text-sm text-text-secondary">{item.detail}</div>
                  </div>
                  <Badge tone={item.tone}>{item.time}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card title="Learning Performance">
          <div className="space-y-5">
            {progressItems.map((item) => (
              <div key={item.id}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-text-primary">{item.label}</span>
                  <span className="text-text-secondary">{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-surface-muted">
                  <div className="h-3 rounded-full bg-[#4FA3D9]" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Operational Radar">
          <div className="space-y-4">
            {healthItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl border border-surface-line p-4">
                <div>
                  <div className="font-medium text-text-primary">{item.label}</div>
                  <div className="mt-1 text-sm text-text-secondary">{item.helper}</div>
                </div>
                <Badge tone={item.tone}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
