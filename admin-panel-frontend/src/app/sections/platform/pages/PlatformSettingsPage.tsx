import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { useToast } from "@/app/providers/ToastProvider";
import { legacyData } from "@/app/features/legacy/legacyData";

type TabId =
  | "general"
  | "mode"
  | "financials"
  | "api"
  | "checkout"
  | "teams"
  | "checklists"
  | "badges"
  | "categories"
  | "sync"
  | "permissions";

type SettingsState = {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  defaultLanguage: string;
  enabledLanguages: string[];
  iosAppUrl: string;
  androidAppUrl: string;
  maintenanceMessage: string;
  currentMode: string;
  freeAccessDuration: string;
  enrollmentLimit: string;
  limitPeriod: string;
  expirationMethod: string;
  courseRate: string;
  eventRate: string;
  bundleRate: string;
  subscriptionPoolRate: string;
  payoutSchedule: string;
  minimumPayout: string;
  defaultTaxRate: string;
  schoolUrl: string;
  clientId: string;
  clientSecret: string;
  stripePublishableKey: string;
  stripeSecretKey: string;
  paypalClientId: string;
  paypalSecret: string;
  resendApiKey: string;
  bunnyApiKey: string;
  typesenseAdminKey: string;
  apifyToken: string;
  certifierApiKey: string;
  courseCheckoutId: string;
  eventCheckoutId: string;
  certificatePackCheckoutId: string;
  teamPlanModel1Id: string;
  teamPlanModel2Id: string;
  teamPlanModel3Id: string;
  discountTiers: string;
  creditPricingTiers: string;
  anchorDummyCourseId: string;
};

type FlagState = {
  maintenanceMode: boolean;
  taxCalculation: boolean;
  managerSelected: boolean;
  memberCredits: boolean;
  teamSubscriptions: boolean;
};

type PermissionState = Record<string, { readOnly: boolean; readWrite: boolean }>;

type SettingsTableData = {
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

const tabs: Array<{ id: TabId; label: string }> = [
  { id: "general", label: "General Settings" },
  { id: "mode", label: "Platform Mode" },
  { id: "financials", label: "Financials & Commissions" },
  { id: "api", label: "API & Integrations" },
  { id: "checkout", label: "Checkout IDs" },
  { id: "teams", label: "Team Plans" },
  { id: "checklists", label: "Checklists" },
  { id: "badges", label: "Badge Definitions" },
  { id: "categories", label: "Categories & Topics" },
  { id: "sync", label: "Data Sync" },
  { id: "permissions", label: "Support Permissions" },
];

const initialSettings: SettingsState = {
  siteName: "SkillHub Academy",
  siteUrl: "https://academy.skillhub.com",
  adminEmail: "admin@skillhub.com",
  defaultLanguage: "en",
  enabledLanguages: ["en", "es"],
  iosAppUrl: "",
  androidAppUrl: "",
  maintenanceMessage: "",
  currentMode: "UDEMY",
  freeAccessDuration: "30",
  enrollmentLimit: "1",
  limitPeriod: "30",
  expirationMethod: "CRON_BATCH",
  courseRate: "70",
  eventRate: "80",
  bundleRate: "70",
  subscriptionPoolRate: "60",
  payoutSchedule: "MONTHLY",
  minimumPayout: "50.00",
  defaultTaxRate: "0",
  schoolUrl: "",
  clientId: "****************",
  clientSecret: "****************",
  stripePublishableKey: "",
  stripeSecretKey: "********",
  paypalClientId: "",
  paypalSecret: "********",
  resendApiKey: "****************",
  bunnyApiKey: "****************",
  typesenseAdminKey: "****************",
  apifyToken: "****************",
  certifierApiKey: "****************",
  courseCheckoutId: "payment-course-standard",
  eventCheckoutId: "payment-event-live",
  certificatePackCheckoutId: "payment-cert-pack",
  teamPlanModel1Id: "payment-team-fixed",
  teamPlanModel2Id: "payment-team-credits",
  teamPlanModel3Id: "payment-team-sub",
  discountTiers: `[
  {"min": 5, "max": 10, "discount": 10},
  {"min": 11, "max": 50, "discount": 20}
]`,
  creditPricingTiers: `[
  {"min": 10, "max": 50, "price": 25.00},
  {"min": 51, "max": 100, "price": 20.00}
]`,
  anchorDummyCourseId: "",
};

const initialFlags: FlagState = {
  maintenanceMode: false,
  taxCalculation: false,
  managerSelected: true,
  memberCredits: true,
  teamSubscriptions: false,
};

const initialPermissions: PermissionState = {
  "User Management": { readOnly: false, readWrite: false },
  "Product Management": { readOnly: true, readWrite: false },
  Financials: { readOnly: false, readWrite: false },
};

const categoryItems = [
  { id: "business", label: "Business", depth: 0, muted: false },
  { id: "finance", label: "Finance", depth: 1, muted: false },
  { id: "accounting", label: "Accounting", depth: 2, muted: true },
];

function fieldClassName(extraClassName = "") {
  return `w-full rounded-md border border-[#E0E0E0] bg-white px-3 py-2.5 text-sm text-text-primary transition focus:border-brand focus:ring-4 focus:ring-brand/15 ${extraClassName}`;
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 border-b border-surface-line pb-4">
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      <p className="mt-1 text-sm text-text-secondary">{description}</p>
    </div>
  );
}

function SubsectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-4 border-b border-surface-line pb-2 text-[15px] font-semibold text-text-primary">{children}</h3>;
}

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[13px] font-semibold text-text-primary">
        {label}
        {hint ? <span className="ml-1 text-xs font-normal text-text-secondary">{hint}</span> : null}
      </label>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onToggle,
}: {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 rounded-md border border-surface-line bg-[#FAFAFA] px-4 py-4">
      <div className="pr-4">
        <div className="text-sm font-semibold text-text-primary">{label}</div>
        <div className="mt-0.5 text-xs text-text-secondary">{description}</div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${checked ? "bg-state-success" : "bg-[#CCCCCC]"}`}
      >
        <span
          className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow transition ${checked ? "left-[23px]" : "left-[3px]"}`}
        />
      </button>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TabIcon({ tabId }: { tabId: TabId }) {
  const className = "h-[18px] w-[18px]";

  switch (tabId) {
    case "general":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.6c.64-.27 1-.89 1-1.51V3a2 2 0 0 1 4 0v.09c0 .62.36 1.24 1 1.51.64.27 1.38.13 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06c-.46.44-.6 1.18-.33 1.82.27.64.89 1 1.51 1H21a2 2 0 0 1 0 4h-.09c-.62 0-1.24.36-1.51 1z" />
        </svg>
      );
    case "mode":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "financials":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "checkout":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 16h9.72a2 2 0 0 0 1.96-1.61L23 6H6" />
        </svg>
      );
    case "teams":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "checklists":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );
    case "badges":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="8" r="6" />
          <path d="m8.21 13.89-1.42 7.11L12 18l5.21 3-1.42-7.12" />
        </svg>
      );
    case "categories":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      );
    case "sync":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M21.5 2v6h-6" />
          <path d="M2.5 22v-6h6" />
          <path d="M2 11.5A10 10 0 0 1 20.8 7.2" />
          <path d="M22 12.5A10 10 0 0 1 3.2 16.7" />
        </svg>
      );
    case "permissions":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
}

function SettingsTable({
  table,
  onEdit,
}: {
  table: SettingsTableData;
  onEdit: (label: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-panel border border-surface-line">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {table.headers.map((header) => (
                <th
                  key={header}
                  className={`border-b border-surface-line bg-surface-muted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-icon ${
                    header === "Actions" ? "text-right" : ""
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={`${rowIndex}-${row.join("-")}`}>
                {row.map((cell, cellIndex) => {
                  const header = table.headers[cellIndex] ?? "";
                  const normalized = cell.trim();

                  return (
                    <td
                      key={`${rowIndex}-${header}`}
                      className={`border-b border-surface-line bg-white px-4 py-3 text-sm text-text-primary last:border-b-0 ${
                        header === "Actions" ? "text-right" : ""
                      }`}
                    >
                      {header === "Item Name" || header === "Name" ? <strong>{normalized}</strong> : null}
                      {header === "Logic" ? (
                        <code className="rounded bg-surface-page px-2 py-1 text-xs text-text-icon">{normalized}</code>
                      ) : null}
                      {header === "Status" ? (
                        <span className="inline-flex rounded px-2 py-1 text-[11px] font-semibold uppercase text-state-success" style={{ backgroundColor: "rgba(82, 196, 26, 0.1)" }}>
                          {normalized}
                        </span>
                      ) : null}
                      {header === "Actions" ? (
                        <button
                          type="button"
                          onClick={() => onEdit(row[0] || "row")}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
                          aria-label={`Edit ${row[0] || "row"}`}
                        >
                          <PencilIcon />
                        </button>
                      ) : null}
                      {header === "Icon" ? (
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
                          <TabIcon tabId="badges" />
                        </div>
                      ) : null}
                      {!["Item Name", "Name", "Logic", "Status", "Actions", "Icon"].includes(header) ? normalized || "--" : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PermissionMatrix({
  rows,
  value,
  onToggle,
}: {
  rows: string[];
  value: PermissionState;
  onToggle: (row: string, field: "readOnly" | "readWrite") => void;
}) {
  return (
    <div className="overflow-hidden rounded-panel border border-surface-line">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="border-b border-surface-line bg-surface-muted px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-icon">
                Page / Feature
              </th>
              <th className="border-b border-surface-line bg-surface-muted px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-text-icon">
                Read Only
              </th>
              <th className="border-b border-surface-line bg-surface-muted px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-text-icon">
                Read + Write
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row}>
                <td className="border-b border-surface-line bg-white px-4 py-3 text-sm text-text-primary last:border-b-0">{row}</td>
                <td className="border-b border-surface-line bg-white px-4 py-3 text-center last:border-b-0">
                  <input
                    type="checkbox"
                    checked={value[row]?.readOnly ?? false}
                    onChange={() => onToggle(row, "readOnly")}
                    className="h-4 w-4 accent-brand"
                  />
                </td>
                <td className="border-b border-surface-line bg-white px-4 py-3 text-center last:border-b-0">
                  <input
                    type="checkbox"
                    checked={value[row]?.readWrite ?? false}
                    onChange={() => onToggle(row, "readWrite")}
                    className="h-4 w-4 accent-brand"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PlatformSettingsPage() {
  const { notify } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [flags, setFlags] = useState<FlagState>(initialFlags);
  const [permissions, setPermissions] = useState<PermissionState>(initialPermissions);
  const platformTables = legacyData["platform-settings"].tables;

  const checklistTable = useMemo<SettingsTableData>(
    () => ({
      headers: platformTables[0]?.headers ?? [],
      rows: platformTables[0]?.rows ?? [],
    }),
    [platformTables],
  );

  const badgeTable = useMemo<SettingsTableData>(
    () => ({
      headers: platformTables[1]?.headers ?? [],
      rows: platformTables[1]?.rows ?? [],
    }),
    [platformTables],
  );

  const permissionRows = useMemo(
    () => (platformTables[2]?.rows ?? []).map((row) => row[0]).filter(Boolean),
    [platformTables],
  );

  function updateField<Key extends keyof SettingsState>(key: Key, value: SettingsState[Key]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  function toggleFlag(key: keyof FlagState) {
    setFlags((current) => ({ ...current, [key]: !current[key] }));
  }

  function updateLanguages(event: ChangeEvent<HTMLSelectElement>) {
    const values = Array.from(event.target.selectedOptions, (option) => option.value);
    updateField("enabledLanguages", values);
  }

  function togglePermission(row: string, field: "readOnly" | "readWrite") {
    setPermissions((current) => {
      const previous = current[row] ?? { readOnly: false, readWrite: false };
      const nextValue = !previous[field];
      const nextRow = {
        ...previous,
        [field]: nextValue,
      };

      if (field === "readWrite" && nextValue) {
        nextRow.readOnly = false;
      }

      return {
        ...current,
        [row]: nextRow,
      };
    });
  }

  let content: ReactNode = null;

  if (activeTab === "general") {
    content = (
      <>
        <SectionHeader title="General Settings" description="Basic platform information and localization settings." />

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Field label="Site Name">
            <input className={fieldClassName()} value={settings.siteName} onChange={(event) => updateField("siteName", event.target.value)} />
          </Field>
          <Field label="Site URL">
            <input className={fieldClassName()} value={settings.siteUrl} onChange={(event) => updateField("siteUrl", event.target.value)} />
          </Field>
        </div>

        <Field label="Admin Email" className="mb-6">
          <input className={fieldClassName()} value={settings.adminEmail} onChange={(event) => updateField("adminEmail", event.target.value)} />
        </Field>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Field label="Default Language">
            <select className={fieldClassName()} value={settings.defaultLanguage} onChange={(event) => updateField("defaultLanguage", event.target.value)}>
              <option value="en">English (en)</option>
              <option value="es">Spanish (es)</option>
              <option value="fr">French (fr)</option>
            </select>
          </Field>
          <Field label="Enabled Languages">
            <select
              multiple
              size={4}
              className={fieldClassName("min-h-[110px]")}
              value={settings.enabledLanguages}
              onChange={updateLanguages}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </Field>
        </div>

        <div className="mb-8">
          <SubsectionTitle>Mobile Apps</SubsectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="iOS App URL">
              <input
                className={fieldClassName()}
                placeholder="App Store Link"
                value={settings.iosAppUrl}
                onChange={(event) => updateField("iosAppUrl", event.target.value)}
              />
            </Field>
            <Field label="Android App URL">
              <input
                className={fieldClassName()}
                placeholder="Google Play Link"
                value={settings.androidAppUrl}
                onChange={(event) => updateField("androidAppUrl", event.target.value)}
              />
            </Field>
          </div>
        </div>

        <ToggleRow
          label="Maintenance Mode"
          description="Disable public access. Admins can still log in."
          checked={flags.maintenanceMode}
          onToggle={() => toggleFlag("maintenanceMode")}
        />

        <Field label="Maintenance Message">
          <textarea
            className={fieldClassName("min-h-[110px] resize-y")}
            placeholder="We are currently undergoing scheduled maintenance. Please check back soon."
            value={settings.maintenanceMessage}
            onChange={(event) => updateField("maintenanceMessage", event.target.value)}
          />
        </Field>
      </>
    );
  }

  if (activeTab === "mode") {
    content = (
      <>
        <SectionHeader title="Platform Mode" description="Define the operational model of your marketplace." />

        <Field label="Current Mode" className="mb-6">
          <select className={fieldClassName()} value={settings.currentMode} onChange={(event) => updateField("currentMode", event.target.value)}>
            <option value="UDEMY">Udemy / SkillHub (Standard)</option>
            <option value="ALISON_FREE">Alison Free (Ad-supported)</option>
            <option value="ALISON_SEMI_FREE">Alison Semi-Free (Limited Free Access)</option>
            <option value="CPE_MODEL">CPE Model (Professional Credits)</option>
            <option value="DIY_WONDERHOW">DIY / WonderHow</option>
          </select>
        </Field>

        {settings.currentMode === "ALISON_SEMI_FREE" ? (
          <div className="rounded-panel border border-surface-line bg-surface-muted p-5">
            <h3 className="mb-3 text-[15px] font-semibold text-text-primary">Semi-Free Configuration</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Free Access Duration" hint="(Days)">
                <input className={fieldClassName()} value={settings.freeAccessDuration} onChange={(event) => updateField("freeAccessDuration", event.target.value)} />
              </Field>
              <Field label="Enrollment Limit" hint="(Courses)">
                <input className={fieldClassName()} value={settings.enrollmentLimit} onChange={(event) => updateField("enrollmentLimit", event.target.value)} />
              </Field>
              <Field label="Limit Period" hint="(Days)">
                <input className={fieldClassName()} value={settings.limitPeriod} onChange={(event) => updateField("limitPeriod", event.target.value)} />
              </Field>
              <Field label="Expiration Method">
                <select className={fieldClassName()} value={settings.expirationMethod} onChange={(event) => updateField("expirationMethod", event.target.value)}>
                  <option value="CRON_BATCH">Batch Cron Job (Efficient)</option>
                  <option value="INDIVIDUAL_QUEUE">Individual Queue (Precise)</option>
                </select>
              </Field>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  if (activeTab === "financials") {
    content = (
      <>
        <SectionHeader title="Financials & Commissions" description="Configure default commission rates and payout rules." />

        <div className="mb-8">
          <SubsectionTitle>Default Commission Rates (%)</SubsectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Course Rate">
              <input className={fieldClassName()} value={settings.courseRate} onChange={(event) => updateField("courseRate", event.target.value)} />
            </Field>
            <Field label="Event Rate">
              <input className={fieldClassName()} value={settings.eventRate} onChange={(event) => updateField("eventRate", event.target.value)} />
            </Field>
            <Field label="Bundle Rate">
              <input className={fieldClassName()} value={settings.bundleRate} onChange={(event) => updateField("bundleRate", event.target.value)} />
            </Field>
            <Field label="Subscription Pool Rate">
              <input className={fieldClassName()} value={settings.subscriptionPoolRate} onChange={(event) => updateField("subscriptionPoolRate", event.target.value)} />
            </Field>
          </div>
        </div>

        <div className="mb-8">
          <SubsectionTitle>Payout Settings</SubsectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Payout Schedule">
              <select className={fieldClassName()} value={settings.payoutSchedule} onChange={(event) => updateField("payoutSchedule", event.target.value)}>
                <option value="MONTHLY">Monthly (1st of month)</option>
                <option value="NET_30">Net 30</option>
                <option value="WEEKLY">Weekly</option>
              </select>
            </Field>
            <Field label="Minimum Payout Amount ($)">
              <input className={fieldClassName()} value={settings.minimumPayout} onChange={(event) => updateField("minimumPayout", event.target.value)} />
            </Field>
          </div>
        </div>

        <ToggleRow
          label="Enable Tax Calculation"
          description="Apply tax rates to purchases automatically."
          checked={flags.taxCalculation}
          onToggle={() => toggleFlag("taxCalculation")}
        />

        <Field label="Default Tax Rate (%)">
          <input className={fieldClassName()} value={settings.defaultTaxRate} onChange={(event) => updateField("defaultTaxRate", event.target.value)} />
        </Field>
      </>
    );
  }

  if (activeTab === "api") {
    content = (
      <>
        <SectionHeader title="API & Integrations" description="Manage credentials for external services." />

        <div className="mb-8">
          <SubsectionTitle>LearnWorlds (LMS Core)</SubsectionTitle>
          <Field label="School URL" className="mb-6">
            <input
              className={fieldClassName()}
              placeholder="https://yourschool.learnworlds.com"
              value={settings.schoolUrl}
              onChange={(event) => updateField("schoolUrl", event.target.value)}
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Client ID">
              <input className={fieldClassName()} value={settings.clientId} onChange={(event) => updateField("clientId", event.target.value)} />
            </Field>
            <Field label="Client Secret">
              <input className={fieldClassName()} value={settings.clientSecret} onChange={(event) => updateField("clientSecret", event.target.value)} />
            </Field>
          </div>
        </div>

        <div className="mb-8">
          <SubsectionTitle>Payment Gateways</SubsectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Stripe Publishable Key">
              <input
                className={fieldClassName()}
                placeholder="pk_test_..."
                value={settings.stripePublishableKey}
                onChange={(event) => updateField("stripePublishableKey", event.target.value)}
              />
            </Field>
            <Field label="Stripe Secret Key">
              <input className={fieldClassName()} value={settings.stripeSecretKey} onChange={(event) => updateField("stripeSecretKey", event.target.value)} />
            </Field>
            <Field label="PayPal Client ID">
              <input
                className={fieldClassName()}
                placeholder="client_id"
                value={settings.paypalClientId}
                onChange={(event) => updateField("paypalClientId", event.target.value)}
              />
            </Field>
            <Field label="PayPal Secret">
              <input className={fieldClassName()} value={settings.paypalSecret} onChange={(event) => updateField("paypalSecret", event.target.value)} />
            </Field>
          </div>
        </div>

        <div>
          <SubsectionTitle>External Services</SubsectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Resend API Key" hint="(Email)">
              <input className={fieldClassName()} value={settings.resendApiKey} onChange={(event) => updateField("resendApiKey", event.target.value)} />
            </Field>
            <Field label="Bunny.net API Key" hint="(Video)">
              <input className={fieldClassName()} value={settings.bunnyApiKey} onChange={(event) => updateField("bunnyApiKey", event.target.value)} />
            </Field>
            <Field label="Typesense Admin Key" hint="(Search)">
              <input className={fieldClassName()} value={settings.typesenseAdminKey} onChange={(event) => updateField("typesenseAdminKey", event.target.value)} />
            </Field>
            <Field label="Apify Token" hint="(Automation)">
              <input className={fieldClassName()} value={settings.apifyToken} onChange={(event) => updateField("apifyToken", event.target.value)} />
            </Field>
            <Field label="Certifier.io API Key" hint="(Certificates)">
              <input className={fieldClassName()} value={settings.certifierApiKey} onChange={(event) => updateField("certifierApiKey", event.target.value)} />
            </Field>
          </div>
        </div>
      </>
    );
  }

  if (activeTab === "checkout") {
    content = (
      <>
        <SectionHeader title="Checkout Configuration" description="Map internal products to LearnWorlds payment pages." />
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Course Checkout ID">
            <input className={fieldClassName()} value={settings.courseCheckoutId} onChange={(event) => updateField("courseCheckoutId", event.target.value)} />
          </Field>
          <Field label="Event Checkout ID">
            <input className={fieldClassName()} value={settings.eventCheckoutId} onChange={(event) => updateField("eventCheckoutId", event.target.value)} />
          </Field>
          <Field label="Certificate Pack Checkout ID">
            <input className={fieldClassName()} value={settings.certificatePackCheckoutId} onChange={(event) => updateField("certificatePackCheckoutId", event.target.value)} />
          </Field>
          <Field label="Team Plan (Model 1) ID">
            <input className={fieldClassName()} value={settings.teamPlanModel1Id} onChange={(event) => updateField("teamPlanModel1Id", event.target.value)} />
          </Field>
          <Field label="Team Plan (Model 2) ID">
            <input className={fieldClassName()} value={settings.teamPlanModel2Id} onChange={(event) => updateField("teamPlanModel2Id", event.target.value)} />
          </Field>
          <Field label="Team Plan (Model 3) ID">
            <input className={fieldClassName()} value={settings.teamPlanModel3Id} onChange={(event) => updateField("teamPlanModel3Id", event.target.value)} />
          </Field>
        </div>
      </>
    );
  }

  if (activeTab === "teams") {
    content = (
      <>
        <SectionHeader title="Team Plans Configuration" description="Enable and configure B2B team models." />

        <ToggleRow
          label="Enable Manager-Selected (Model 1)"
          description="Fixed seat packages for specific courses."
          checked={flags.managerSelected}
          onToggle={() => toggleFlag("managerSelected")}
        />

        <div className="mb-6 border-l-2 border-surface-line pl-4">
          <Field label="Discount Tiers" hint="(JSON Format)">
            <textarea
              className={fieldClassName("min-h-[130px] resize-y bg-[#FAFAFA] font-mono text-[13px]")}
              value={settings.discountTiers}
              onChange={(event) => updateField("discountTiers", event.target.value)}
            />
          </Field>
        </div>

        <ToggleRow
          label="Enable Member Credits (Model 2)"
          description="Credit packs for flexible enrollment."
          checked={flags.memberCredits}
          onToggle={() => toggleFlag("memberCredits")}
        />

        <div className="mb-6 border-l-2 border-surface-line pl-4">
          <Field label="Credit Pricing Tiers" hint="(JSON Format)">
            <textarea
              className={fieldClassName("min-h-[130px] resize-y bg-[#FAFAFA] font-mono text-[13px]")}
              value={settings.creditPricingTiers}
              onChange={(event) => updateField("creditPricingTiers", event.target.value)}
            />
          </Field>
        </div>

        <ToggleRow
          label="Enable Team Subscriptions (Model 3)"
          description="Recurring billing for group access."
          checked={flags.teamSubscriptions}
          onToggle={() => toggleFlag("teamSubscriptions")}
        />

        <Field label="Anchor Dummy Course ID" hint="(Required for Model 3)" className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={fieldClassName()}
              placeholder="lw-course-id"
              value={settings.anchorDummyCourseId}
              onChange={(event) => updateField("anchorDummyCourseId", event.target.value)}
            />
            <button
              type="button"
              onClick={() => notify("Anchor course verified.")}
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
            >
              Verify
            </button>
          </div>
        </Field>

        <button
          type="button"
          onClick={() => notify("Subscription matrix generation started.")}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white transition hover:bg-[#3A7BAF]"
        >
          Generate Subscription Matrix (Sync to LW)
        </button>
      </>
    );
  }

  if (activeTab === "checklists") {
    content = (
      <>
        <SectionHeader title="Checklist Management" description="Define compliance rules for courses, events, and profiles." />
        <div className="mb-4">
          <select className={`${fieldClassName()} max-w-[200px]`}>
            <option>Course Checklists</option>
            <option>Event Checklists</option>
            <option>Profile Checklists</option>
            <option>Community Checklists</option>
          </select>
        </div>
        <SettingsTable table={checklistTable} onEdit={(label) => notify(`Editing ${label}.`)} />
        <button
          type="button"
          onClick={() => notify("Checklist item form opened.")}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
        >
          + Add Checklist Item
        </button>
      </>
    );
  }

  if (activeTab === "badges") {
    content = (
      <>
        <SectionHeader title="Badge Definitions" description="Manage system achievements and triggers." />
        <SettingsTable table={badgeTable} onEdit={(label) => notify(`Editing ${label}.`)} />
        <button
          type="button"
          onClick={() => notify("Badge creation flow opened.")}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
        >
          + Add Badge
        </button>
      </>
    );
  }

  if (activeTab === "categories") {
    content = (
      <>
        <SectionHeader title="Categories & Topics" description="Manage content hierarchy." />
        <div className="space-y-2">
          {categoryItems.map((item) => (
            <div key={item.id} className={`flex items-center justify-between rounded-md border border-surface-line bg-white px-4 py-3 ${item.depth === 1 ? "ml-6" : ""} ${item.depth === 2 ? "ml-12" : ""}`}>
              <div className={`text-sm ${item.depth === 0 ? "font-semibold text-text-primary" : item.muted ? "text-text-secondary" : "text-text-primary"}`}>
                {item.label}
              </div>
              <button
                type="button"
                onClick={() => notify(`Editing ${item.label}.`)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-surface-muted hover:text-text-primary"
                aria-label={`Edit ${item.label}`}
              >
                <PencilIcon />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => notify("Category creation flow opened.")}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
        >
          + Add Category
        </button>
      </>
    );
  }

  if (activeTab === "sync") {
    content = (
      <>
        <SectionHeader title="Data Sync & Maintenance" description="Manually trigger synchronization jobs." />
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { label: "Sync Users", action: "User sync started.", danger: false },
            { label: "Sync Products", action: "Product sync started.", danger: false },
            { label: "Sync Enrollments", action: "Enrollment sync started.", danger: false },
            { label: "Re-index Search (Typesense)", action: "Search re-index started.", danger: true },
          ].map((item) => (
            <Field key={item.label} label={item.label}>
              <button
                type="button"
                onClick={() => notify(item.action)}
                className={`inline-flex min-h-10 w-full items-center justify-center rounded-md px-4 text-sm font-medium transition ${
                  item.danger
                    ? "bg-state-danger text-white hover:bg-[#E84244]"
                    : "border border-surface-line bg-white text-text-primary hover:bg-surface-muted"
                }`}
              >
                {item.danger ? "Re-index All" : "Sync Now"}
              </button>
            </Field>
          ))}
        </div>
      </>
    );
  }

  if (activeTab === "permissions") {
    content = (
      <>
        <SectionHeader title="Support Role Permissions" description="Define access levels for Support staff." />
        <PermissionMatrix rows={permissionRows} value={permissions} onToggle={togglePermission} />
      </>
    );
  }

  return (
    <div className="page-container max-w-content">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Platform Settings</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="overflow-hidden rounded-panel border border-surface-line bg-white shadow-panel md:max-h-[800px]">
        <div className="flex min-h-[700px] flex-col md:flex-row">
          <aside className="w-full flex-shrink-0 border-b border-surface-line bg-[#FAFAFA] md:w-[280px] md:border-b-0 md:border-r">
            <div className="overflow-x-auto md:overflow-visible">
              <div className="flex min-w-max flex-row gap-0 px-0 py-4 md:min-w-0 md:flex-col md:py-4">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`mx-0 flex items-center gap-3 border-b-2 px-6 py-3 text-left text-sm font-medium transition md:border-b-0 md:border-l-[3px] ${
                        isActive
                          ? "border-brand bg-brand-soft text-text-icon md:border-l-brand"
                          : "border-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                      }`}
                    >
                      <span className="flex h-5 w-5 items-center justify-center"><TabIcon tabId={tab.id} /></span>
                      <span className={`${isActive ? "font-semibold" : ""}`}>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex min-h-[700px] flex-1 flex-col bg-white">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">{content}</div>

            <div className="mt-auto flex justify-end gap-3 border-t border-surface-line bg-white px-6 py-5 md:px-8">
              <button
                type="button"
                onClick={() => notify("Changes cancelled.")}
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-surface-line bg-white px-4 text-sm font-medium text-text-primary transition hover:bg-surface-muted"
              >
                Cancel Changes
              </button>
              <button
                type="button"
                onClick={() => notify("Settings saved successfully!")}
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-medium text-white transition hover:bg-[#3A7BAF]"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
