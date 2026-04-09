import { Fragment, useMemo, useState } from "react";
import { useToast } from "@/app/providers/ToastProvider";
import { StatsGrid } from "@/app/components/page/StatsGrid";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { TableActionMenu, type TableActionMenuItem } from "@/app/components/ui/TableActionMenu";
import { TableExpandButton } from "@/app/components/ui/TableExpandButton";
import { renderTableGlyph } from "@/app/components/ui/TableGlyphs";
import { TableIconButton } from "@/app/components/ui/TableIconButton";

type CouponItem = {
  id: string;
  code: string;
  type: "Percentage" | "Fixed Amt";
  value: string;
  used: number;
  limit: number;
  appliesTo: string;
  appliesTooltip: string;
  status: "Active" | "Expired" | "Upcoming" | "Inactive";
  expires: string;
  view: Array<{ id: string; label: string; glyph: "details" | "document" }>;
  linkedTo: Array<{ id: string; label: string; glyph: "money" | "products" }>;
  actions: TableActionMenuItem[];
};

type PromotionItem = {
  id: string;
  name: string;
  internalId: string;
  lwId: string;
  couponCount: number;
  redemptions: number;
  created: string;
  actions: TableActionMenuItem[];
  coupons: CouponItem[];
};

const promotions: PromotionItem[] = [
  {
    id: "promo-1",
    name: "Summer Sale 2025",
    internalId: "PRM-832",
    lwId: "promo_summer_25",
    couponCount: 3,
    redemptions: 1245,
    created: "Jan 15, 2025",
    actions: [
      { id: "edit-promotion", label: "Edit Promotion", icon: renderTableGlyph("edit") },
      { id: "new-coupon", label: "New Coupon", icon: renderTableGlyph("add") },
      { id: "delete-promotion", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
    ],
    coupons: [
      {
        id: "coupon-1",
        code: "SUMMER25",
        type: "Percentage",
        value: "25%",
        used: 450,
        limit: 1000,
        appliesTo: "All Products",
        appliesTooltip: "Includes all Courses & Events",
        status: "Active",
        expires: "Jun 30, 2025",
        view: [
          { id: "details", label: "Details", glyph: "details" },
          { id: "redemptions", label: "Redemptions", glyph: "document" },
        ],
        linkedTo: [
          { id: "transactions", label: "Transactions", glyph: "money" },
          { id: "products", label: "Products", glyph: "products" },
        ],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "deactivate", label: "Deactivate", icon: renderTableGlyph("sync") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "coupon-2",
        code: "SUMMER10",
        type: "Fixed Amt",
        value: "$10.00",
        used: 500,
        limit: 500,
        appliesTo: "Specific Products",
        appliesTooltip: "UX Design, Python Masterclass",
        status: "Expired",
        expires: "Feb 15, 2025",
        view: [{ id: "details", label: "Details", glyph: "details" }],
        linkedTo: [{ id: "transactions", label: "Transactions", glyph: "money" }],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "coupon-3",
        code: "SUMMERVIP",
        type: "Percentage",
        value: "40%",
        used: 98,
        limit: 200,
        appliesTo: "VIP Cohorts",
        appliesTooltip: "Leadership Accelerator VIP only",
        status: "Upcoming",
        expires: "Jul 15, 2025",
        view: [{ id: "details", label: "Details", glyph: "details" }],
        linkedTo: [{ id: "products", label: "Products", glyph: "products" }],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "deactivate", label: "Deactivate", icon: renderTableGlyph("sync") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
  {
    id: "promo-2",
    name: "Black Friday 2024",
    internalId: "PRM-551",
    lwId: "bf_2024",
    couponCount: 12,
    redemptions: 5302,
    created: "Nov 01, 2024",
    actions: [
      { id: "edit-promotion", label: "Edit Promotion", icon: renderTableGlyph("edit") },
      { id: "new-coupon", label: "New Coupon", icon: renderTableGlyph("add") },
    ],
    coupons: [
      {
        id: "coupon-4",
        code: "BLACK50",
        type: "Percentage",
        value: "50%",
        used: 930,
        limit: 1200,
        appliesTo: "All Courses",
        appliesTooltip: "Courses only, excludes bundles",
        status: "Expired",
        expires: "Nov 30, 2024",
        view: [
          { id: "details", label: "Details", glyph: "details" },
          { id: "redemptions", label: "Redemptions", glyph: "document" },
        ],
        linkedTo: [
          { id: "transactions", label: "Transactions", glyph: "money" },
          { id: "products", label: "Products", glyph: "products" },
        ],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
      {
        id: "coupon-5",
        code: "BFCYBER25",
        type: "Fixed Amt",
        value: "$25.00",
        used: 612,
        limit: 800,
        appliesTo: "Event Products",
        appliesTooltip: "Advanced UX Workshops, Growth Ops Roundtable",
        status: "Expired",
        expires: "Dec 02, 2024",
        view: [{ id: "details", label: "Details", glyph: "details" }],
        linkedTo: [{ id: "transactions", label: "Transactions", glyph: "money" }],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
  {
    id: "promo-3",
    name: "Early Bird Specials",
    internalId: "PRM-991",
    lwId: "early_bird",
    couponCount: 1,
    redemptions: 12,
    created: "Mar 10, 2025",
    actions: [
      { id: "edit-promotion", label: "Edit Promotion", icon: renderTableGlyph("edit") },
      { id: "new-coupon", label: "New Coupon", icon: renderTableGlyph("add") },
    ],
    coupons: [
      {
        id: "coupon-6",
        code: "EARLY15",
        type: "Percentage",
        value: "15%",
        used: 12,
        limit: 100,
        appliesTo: "Selected Cohorts",
        appliesTooltip: "Leadership Accelerator, Manager Sprint",
        status: "Active",
        expires: "May 01, 2025",
        view: [{ id: "details", label: "Details", glyph: "details" }],
        linkedTo: [{ id: "products", label: "Products", glyph: "products" }],
        actions: [
          { id: "edit", label: "Edit", icon: renderTableGlyph("edit") },
          { id: "deactivate", label: "Deactivate", icon: renderTableGlyph("sync") },
          { id: "delete", label: "Delete", icon: renderTableGlyph("delete"), tone: "danger" },
        ],
      },
    ],
  },
];

function promotionStats() {
  const totalCoupons = promotions.reduce((count, promotion) => count + promotion.coupons.length, 0);
  const totalRedemptions = promotions.reduce((count, promotion) => count + promotion.redemptions, 0);
  const activeCoupons = promotions.flatMap((promotion) => promotion.coupons).filter((coupon) => coupon.status === "Active").length;
  const expiringSoon = promotions.flatMap((promotion) => promotion.coupons).filter((coupon) => coupon.expires.includes("2025")).length;

  return [
    { id: "total-coupons", label: "Total Coupons", value: String(totalCoupons), change: "+12%", tone: "success" as const, icon: "money" as const },
    { id: "active-coupons", label: "Active Coupons", value: String(activeCoupons), icon: "chart" as const },
    { id: "redemptions", label: "Total Redemptions", value: totalRedemptions.toLocaleString(), change: "+8.5%", tone: "success" as const, icon: "money" as const },
    { id: "expiring", label: "Expiring (7d)", value: String(expiringSoon), icon: "calendar" as const },
    { id: "most-used", label: "Most Used", value: "WELCOME20", icon: "activity" as const },
  ];
}

function typePillClass(type: CouponItem["type"]) {
  return type === "Percentage" ? "bg-[#E6F7FF] text-[#1890FF]" : "bg-[#F9F0FF] text-[#722ED1]";
}

function statusPillClass(status: CouponItem["status"]) {
  switch (status) {
    case "Active":
      return "bg-[rgba(82,196,26,0.1)] text-[#52C41A]";
    case "Expired":
      return "bg-[rgba(140,140,140,0.1)] text-[#8C8C8C]";
    case "Upcoming":
      return "bg-[rgba(24,144,255,0.1)] text-[#1890FF]";
    case "Inactive":
      return "bg-[#F5F5F5] text-[#595959]";
  }
}

function usagePercent(used: number, limit: number) {
  if (!limit) {
    return 0;
  }
  return Math.max(0, Math.min(100, (used / limit) * 100));
}

export function CouponsPromotionsPage() {
  const { notify } = useToast();
  const [expandedPromotionIds, setExpandedPromotionIds] = useState<string[]>(() => [promotions[0]?.id ?? ""]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const stats = useMemo(() => promotionStats(), []);

  const togglePromotion = (promotionId: string) => {
    setExpandedPromotionIds((current) =>
      current.includes(promotionId) ? current.filter((id) => id !== promotionId) : [...current, promotionId],
    );
  };

  const runAction = (scope: string, action: TableActionMenuItem) => {
    setOpenMenuId(null);
    notify(`${scope}: ${action.label}`);
  };

  return (
    <div className="page-container max-w-content">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-tight text-text-primary">Coupons & Promotions</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="refresh">Sync</Button>
          <Button icon="money">New Promotion</Button>
        </div>
      </div>

      <StatsGrid stats={stats} />

      <Card bodyClassName="p-0" className="overflow-visible">
        <div className="flex flex-col gap-3 border-b border-surface-line px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-[320px]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              readOnly
              value="Search promotions..."
              className="min-h-10 w-full rounded-md border border-surface-line bg-white pl-10 pr-4 text-[14px] text-[#666666]"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Status</Button>
            <Button variant="secondary">Newest</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-[44px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]" />
                <th className="border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  Promotion
                </th>
                <th className="border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  LW ID
                </th>
                <th className="border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  Coupons
                </th>
                <th className="border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  Redemptions
                </th>
                <th className="border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  Created
                </th>
                <th className="w-[72px] border-b border-surface-line bg-[#F4F9FC] px-4 py-3 text-left text-[12px] font-semibold uppercase tracking-[0.5px] text-[#03314B]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => {
                const expanded = expandedPromotionIds.includes(promotion.id);

                return (
                  <Fragment key={promotion.id}>
                    <tr>
                      <td className="border-b border-surface-line bg-white px-3 py-3">
                        <TableExpandButton expanded={expanded} onToggle={() => togglePromotion(promotion.id)} />
                      </td>
                      <td className="border-b border-surface-line bg-white px-4 py-3">
                        <div className="text-[14px] font-semibold text-text-primary">{promotion.name}</div>
                        <span className="cursor-help border-b border-dotted border-[#999999] text-[12px] text-[#666666]" title={`Internal ID: ${promotion.internalId}`}>
                          {promotion.internalId}
                        </span>
                      </td>
                      <td className="border-b border-surface-line bg-white px-4 py-3">
                        <span className="cursor-help border-b border-dotted border-[#999999] text-[14px] text-text-primary" title="LearnWorlds Promotion ID">
                          {promotion.lwId}
                        </span>
                      </td>
                      <td className="border-b border-surface-line bg-white px-4 py-3 text-[14px] text-text-primary">{promotion.couponCount}</td>
                      <td className="border-b border-surface-line bg-white px-4 py-3 text-[14px] text-text-primary">{promotion.redemptions.toLocaleString()}</td>
                      <td className="border-b border-surface-line bg-white px-4 py-3 text-[14px] text-text-primary">{promotion.created}</td>
                      <td className="border-b border-surface-line bg-white px-4 py-3">
                        <TableActionMenu
                          items={promotion.actions}
                          open={openMenuId === promotion.id}
                          onToggle={() => setOpenMenuId((current) => (current === promotion.id ? null : promotion.id))}
                          onAction={(item) => runAction(promotion.name, item)}
                        />
                      </td>
                    </tr>
                    {expanded ? (
                      <tr>
                        <td colSpan={7} className="border-b border-surface-line bg-[#F8F9FA] p-0 shadow-[inset_0_3px_6px_-6px_rgba(0,0,0,0.2)]">
                          <div className="border-l-[3px] border-l-brand px-5 py-5 pl-[50px]">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Code</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Type</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Value</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Usage</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Applies To</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Status</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Expires</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">View</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]">Linked</th>
                                  <th className="border-b border-[#E0E0E0] px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.5px] text-[#666666]" />
                                </tr>
                              </thead>
                              <tbody>
                                {promotion.coupons.map((coupon) => {
                                  const percent = usagePercent(coupon.used, coupon.limit);

                                  return (
                                    <tr key={coupon.id}>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <span className="inline-block rounded-[4px] border border-[#DDDDDD] bg-[#F0F0F0] px-2 py-1 font-mono text-[13px] font-bold text-[#002847]">
                                          {coupon.code}
                                        </span>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <span className={`inline-flex rounded-full px-[10px] py-[4px] text-[11px] font-semibold uppercase tracking-[0.5px] ${typePillClass(coupon.type)}`}>
                                          {coupon.type}
                                        </span>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3 text-[13px] font-semibold text-text-primary">{coupon.value}</td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <div className="flex w-[140px] items-center gap-2" title={`${coupon.used} Used / ${coupon.limit} Limit`}>
                                          <div className="h-[6px] flex-1 overflow-hidden rounded-[3px] bg-[#EEEEEE]">
                                            <div
                                              className={`h-full rounded-[3px] ${percent >= 100 ? "bg-[#52C41A]" : "bg-brand"}`}
                                              style={{ width: `${percent}%` }}
                                            />
                                          </div>
                                          <span className="min-w-[56px] text-[12px] text-[#666666]">{coupon.used} / {coupon.limit >= 1000 ? "1K" : coupon.limit}</span>
                                        </div>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <span className="cursor-help text-[13px] text-text-primary" title={coupon.appliesTooltip}>
                                          {coupon.appliesTo}
                                        </span>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <span className={`inline-flex rounded-full px-[10px] py-[4px] text-[11px] font-semibold uppercase tracking-[0.5px] ${statusPillClass(coupon.status)}`}>
                                          {coupon.status}
                                        </span>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3 text-[13px] text-text-primary">{coupon.expires}</td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <div className="flex items-center gap-1.5">
                                          {coupon.view.map((item) => (
                                            <TableIconButton
                                              key={item.id}
                                              label={item.label}
                                              icon={renderTableGlyph(item.glyph)}
                                              onClick={() => notify(item.label)}
                                            />
                                          ))}
                                        </div>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <div className="flex items-center gap-1.5">
                                          {coupon.linkedTo.map((item) => (
                                            <TableIconButton
                                              key={item.id}
                                              label={item.label}
                                              icon={renderTableGlyph(item.glyph)}
                                              onClick={() => notify(item.label)}
                                            />
                                          ))}
                                        </div>
                                      </td>
                                      <td className="border-b border-[#EEEEEE] bg-transparent px-3 py-3">
                                        <TableActionMenu
                                          items={coupon.actions}
                                          open={openMenuId === coupon.id}
                                          onToggle={() => setOpenMenuId((current) => (current === coupon.id ? null : coupon.id))}
                                          onAction={(item) => runAction(coupon.code, item)}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
