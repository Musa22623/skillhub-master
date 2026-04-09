import type { ReactNode } from "react";
import { Badge } from "@/app/components/ui/Badge";
import type {
  BadgeTone,
  BulkTableAction,
  FilterConfig,
  HeaderAction,
  PageConfig,
  StatConfig,
  TableAction,
  TableColumn,
} from "@/app/components/types/ui";

export type AdminRecord = {
  id: string;
  name: string;
  avatar?: string;
  subtitle?: string;
  status: string;
  updatedAt: string;
  category?: string;
  owner?: string;
  plan?: string;
  amount?: string;
  metric?: string;
  email?: string;
  location?: string;
  count?: string;
  source?: string;
  priority?: string;
  stage?: string;
  seats?: string;
  tags?: string[];
  viewLinks?: string[];
  linkedTo?: string[];
};

function statusTone(status: string): BadgeTone {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("active") ||
    normalized.includes("healthy") ||
    normalized.includes("completed") ||
    normalized.includes("approved") ||
    normalized.includes("delivered") ||
    normalized.includes("paid")
  ) {
    return "success";
  }

  if (
    normalized.includes("review") ||
    normalized.includes("pending") ||
    normalized.includes("draft") ||
    normalized.includes("warning")
  ) {
    return "warning";
  }

  if (
    normalized.includes("failed") ||
    normalized.includes("error") ||
    normalized.includes("rejected") ||
    normalized.includes("suspended") ||
    normalized.includes("expired")
  ) {
    return "danger";
  }

  if (normalized.includes("scheduled") || normalized.includes("processing")) {
    return "info";
  }

  return "neutral";
}

function valueFor(row: AdminRecord, key: keyof AdminRecord) {
  return row[key] ?? "--";
}

function parseProgressValue(value: string) {
  const match = value.match(/(\d{1,3})\s*%/);
  if (!match) {
    return null;
  }

  const rawValue = Number(match[1]);
  const percent = Math.max(0, Math.min(100, rawValue));
  return percent;
}

function progressTone(percent: number) {
  if (percent >= 100) {
    return "bg-[#52C41A]";
  }
  return "bg-[#1F8FFF]";
}

function renderProgressValue(value: string) {
  const normalized = value.trim();
  const percent = parseProgressValue(normalized);
  const detail = normalized.replace(/(\d{1,3})\s*%/, "").trim();

  if (percent == null) {
    return <span className="text-text-primary">{normalized || "--"}</span>;
  }

  return (
    <div className="group relative min-w-[130px]">
      <div className="mb-2 inline-flex text-[18px] font-medium leading-none text-text-primary">{percent}%</div>
      {detail ? (
        <span className="pointer-events-none invisible absolute bottom-[calc(100%+8px)] left-0 z-20 max-w-[220px] rounded-[6px] bg-text-primary px-3 py-2 text-[12px] font-medium leading-snug text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:visible group-focus-within:-translate-y-0.5 group-focus-within:opacity-100">
          {detail}
        </span>
      ) : null}
      <div className="h-[6px] rounded-full bg-[#E6EAF0]">
        <div className={`h-[6px] rounded-full ${progressTone(percent)}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

const userLinkMeta: Record<string, { label: string; title: string }> = {
  accountDetails: { label: "AD", title: "Account Details" },
  preferences: { label: "PF", title: "Preferences" },
  billing: { label: "$", title: "Billing Information" },
  loginHistory: { label: "LH", title: "Login History" },
  activityStats: { label: "AS", title: "User Activity Stats" },
  posts: { label: "P", title: "Posts Created" },
  subscriptions: { label: "S", title: "Enrolled Subscriptions" },
  enrollments: { label: "E", title: "Enrollments" },
  certificates: { label: "C", title: "Certificates" },
  transactions: { label: "T", title: "Transactions" },
  reviews: { label: "R", title: "Reviews Left" },
  spaces: { label: "SP", title: "Spaces" },
  apiLog: { label: "API", title: "API Log" },
};

function prettifyToken(value: string) {
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase());
}

function glyphLabel(value: string) {
  const words = prettifyToken(value).split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
}

function renderTooltipLabel(label: string) {
  return (
    <span className="pointer-events-none invisible absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-text-primary px-[10px] py-[6px] text-[12px] font-medium leading-none text-white opacity-0 shadow-[0_8px_18px_rgba(15,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-within:visible group-focus-within:-translate-y-0.5 group-focus-within:opacity-100">
      {label}
    </span>
  );
}

function isDateLikeHeader(header: string) {
  const normalized = header.toLowerCase();
  return (
    normalized.includes("date") ||
    normalized.includes("time") ||
    normalized.includes("joined") ||
    normalized.includes("updated") ||
    normalized.includes("created") ||
    normalized.includes("applied") ||
    normalized.includes("renewal") ||
    normalized.includes("issued") ||
    normalized.includes("expires") ||
    normalized.includes("expiry") ||
    normalized.includes("submitted") ||
    normalized.includes("start") ||
    normalized.includes("last active") ||
    normalized.includes("last activity")
  );
}

function splitDateTimeValue(value: string) {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  const dateMatches = normalized.match(
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:,\s*\d{4})?(?:\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)?/gi,
  );

  if (!dateMatches?.length) {
    return null;
  }

  const preferredMatch = dateMatches.find((match) => /\d{4}/.test(match)) ?? dateMatches[0];
  const display = preferredMatch
    .replace(/\s+\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?$/i, "")
    .replace(/,\s*$/, "")
    .trim();
  const timeMatch = preferredMatch.match(/(\d{1,2}:\d{2}(?::\d{2})?\s*(?:AM|PM)?)/i);
  const tooltip = timeMatch?.[1]?.trim() ?? (display !== normalized ? normalized : "");

  if (!display || display === normalized) {
    return null;
  }

  return {
    display,
    tooltip,
  };
}

function renderDateValue(value: string) {
  const normalized = value.trim();
  const parsed = splitDateTimeValue(normalized);

  if (!parsed) {
    return <span className="text-text-secondary">{normalized || "--"}</span>;
  }

  return (
    <span className="group relative inline-flex text-text-secondary">
      <span>{parsed.display}</span>
      {parsed.tooltip ? renderTooltipLabel(parsed.tooltip) : null}
    </span>
  );
}

function renderTagGroup(items: string[]) {
  if (items.length === 0) {
    return <span className="text-text-secondary">--</span>;
  }

  const visibleItems = items.slice(0, 2);
  const hiddenItems = items.slice(2);

  return (
    <div className="flex min-w-[74px] flex-col items-start gap-1.5">
      {visibleItems.map((item) => (
        <span
          key={item}
          className="inline-flex min-h-7 items-center rounded-full bg-surface-muted px-3 text-[12px] font-medium leading-none text-text-primary"
          title={prettifyToken(item)}
        >
          {prettifyToken(item)}
        </span>
      ))}
      {hiddenItems.length > 0 ? (
        <span
          className="inline-flex min-h-7 items-center rounded-full bg-surface-line px-3 text-[12px] font-semibold leading-none text-text-icon"
          title={hiddenItems.map((item) => prettifyToken(item)).join(", ")}
        >
          +{hiddenItems.length}
        </span>
      ) : null}
    </div>
  );
}

function renderUserLinkGlyph(name: string) {
  switch (name) {
    case "accountDetails":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" />
        </>
      );
    case "preferences":
      return (
        <>
          <path d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z" />
          <path d="M7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z" />
          <path d="M19.0277 15.6255C18.6859 15.5646 18.1941 15.6534 17.682 16.1829C17.4936 16.3777 17.2342 16.4877 16.9632 16.4877C16.6922 16.4877 16.4328 16.3777 16.2444 16.1829C15.7322 15.6534 15.2405 15.5646 14.8987 15.6255C14.5381 15.6897 14.2179 15.9384 14.0623 16.3275C13.8048 16.9713 13.9014 18.662 16.9632 20.4617C20.0249 18.662 20.1216 16.9713 19.864 16.3275C19.7084 15.9384 19.3882 15.6897 19.0277 15.6255Z" />
          <path d="M21.721 15.5847C22.5748 17.7191 21.2654 20.429 17.437 22.4892C17.1412 22.6484 16.7852 22.6484 16.4893 22.4892C12.6609 20.4291 11.3516 17.7191 12.2053 15.5847C12.6117 14.5689 13.4917 13.8446 14.5481 13.6565C15.3567 13.5125 16.2032 13.6915 16.9632 14.1924C17.7232 13.6915 18.5697 13.5125 19.3783 13.6565C20.4347 13.8446 21.3147 14.5689 21.721 15.5847Z" />
          <path d="M9.92597 14.2049C10.1345 14.7163 9.889 15.2999 9.3776 15.5084C7.06131 16.453 5.5 18.5813 5.5 20.9999" />
        </>
      );
    case "billing":
      return (
        <>
          <path d="M6.25 6h11.5" />
          <path d="M4.5 6h13c.8284 0 1.5.67157 1.5 1.5V16.5c0 .8284-.6716 1.5-1.5 1.5h-13c-.82843 0-1.5-.6716-1.5-1.5v-9C3 6.67157 3.67157 6 4.5 6Z" />
          <path d="M14.5 11h3" />
          <circle cx="13.2" cy="11" r="0.75" fill="currentColor" stroke="none" />
          <path d="m10.6 6-2.3-3-4.2 2.7" />
        </>
      );
    case "loginHistory":
      return (
        <>
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" />
          <path d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37" />
          <path d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z" />
          <path d="M16 18H20M20 18L18 16M20 18L18 20" />
        </>
      );
    case "activityStats":
      return (
        <>
          <path d="M8 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2H8C4 2 2 4 2 8V16C2 20 4 22 8 22Z" />
          <path d="M7 10.7402V16.0002" />
          <path d="M12 7V16" />
          <path d="M17 13.2402V16.0002" />
        </>
      );
    case "posts":
      return (
        <>
          <path d="M8 2V5" />
          <path d="M16 2V5" />
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" />
          <path d="M8 11H16" />
          <path d="M8 16H12" />
        </>
      );
    case "subscriptions":
      return (
        <>
          <path d="M8 2V5" />
          <path d="M16 2V5" />
          <path d="M3.5 9.09H20.5" />
          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" />
        </>
      );
    case "enrollments":
      return (
        <>
          <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" />
          <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" />
          <path d="M7 13H13" />
          <path d="M7 17H11" />
        </>
      );
    case "certificates":
      return (
        <>
          <path d="M10.8 12.5 11.1 11.6C11.15 11.47 11.24 11.35 11.35 11.27C11.46 11.19 11.59 11.15 11.73 11.15H12.48C12.61 11.15 12.74 11.11 12.85 11.04L13.46 10.62C13.57 10.54 13.7 10.5 13.84 10.5C13.98 10.5 14.11 10.54 14.22 10.62L14.83 11.04C14.94 11.11 15.07 11.15 15.2 11.15H15.95C16.09 11.15 16.22 11.19 16.33 11.27C16.44 11.35 16.53 11.46 16.58 11.59L16.84 12.32C16.88 12.45 16.96 12.56 17.06 12.64L17.64 13.12C17.75 13.21 17.83 13.33 17.87 13.46C17.91 13.6 17.91 13.74 17.87 13.87L17.67 14.58C17.63 14.71 17.63 14.85 17.67 14.98L17.89 15.72C17.93 15.85 17.93 15.99 17.89 16.13C17.85 16.26 17.77 16.38 17.66 16.47L16.9 17.04L16.59 17.95C16.54 18.08 16.46 18.2 16.34 18.28C16.22 18.37 16.09 18.41 15.95 18.41H14.99L14.18 18.98C14.07 19.06 13.94 19.1 13.8 19.1C13.66 19.1 13.53 19.06 13.42 18.98L12.63 18.43H11.67C11.53 18.42 11.39 18.38 11.28 18.3C11.17 18.22 11.08 18.1 11.03 17.97L10.71 17.06L9.94 16.47C9.83 16.38 9.75 16.26 9.71 16.12C9.67 15.99 9.67 15.84 9.71 15.71L9.92 14.98C9.96 14.85 9.96 14.71 9.92 14.58L9.7 13.85C9.67 13.72 9.68 13.58 9.72 13.45C9.77 13.32 9.85 13.2 9.96 13.12L10.8 12.5Z" />
          <path d="M11.1 17.1 9.5 19.9l1.6-.17.9 1.34 1-2.55" />
          <path d="M16.9 17.1 18.5 19.9l-1.6-.17-.9 1.34-1-2.55" />
        </>
      );
    case "transactions":
      return (
        <>
          <path d="M21.6389 14.3957H17.5906C16.1042 14.3948 14.8993 13.1909 14.8984 11.7045C14.8984 10.218 16.1042 9.01409 17.5906 9.01318H21.6389" />
          <path d="M18.0485 11.6429H17.7369" />
          <path d="M7.74766 3H16.3911C19.2892 3 21.6388 5.34951 21.6388 8.24766V15.4247C21.6388 18.3229 19.2892 20.6724 16.3911 20.6724H7.74766C4.84951 20.6724 2.5 18.3229 2.5 15.4247V8.24766C2.5 5.34951 4.84951 3 7.74766 3Z" />
        </>
      );
    case "reviews":
      return (
        <>
          <path d="M22.954 9.395C22.832 9.017 22.481 8.756 22.058 8.747L15.298 8.823L12.878 1.628C12.746 1.252 12.39 1 11.992 1H11.99C11.591 1 11.236 1.254 11.103 1.639L8.72301 8.822L1.92101 8.686C1.52101 8.693 1.16901 8.953 1.04601 9.333C0.922011 9.714 1.05401 10.132 1.36001 10.361L6.82101 14.607L4.55601 21.791C4.44101 22.173 4.58101 22.588 4.90501 22.821C5.23101 23.056 5.66501 23.056 5.99101 22.829L12.121 18.526L17.994 22.83C18.155 22.942 18.343 22.998 18.531 22.998C18.726 22.998 18.919 22.938 19.083 22.819C19.406 22.583 19.544 22.169 19.424 21.777L17.129 14.74L22.628 10.43C22.946 10.189 23.077 9.772 22.954 9.393V9.395Z" />
        </>
      );
    case "spaces":
      return (
        <>
          <rect x="3" y="3" width="5.4" height="5.4" rx="1.2" />
          <rect x="11.6" y="3" width="5.4" height="5.4" rx="1.2" />
          <rect x="3" y="11.6" width="5.4" height="5.4" rx="1.2" />
          <rect x="11.6" y="11.6" width="5.4" height="5.4" rx="1.2" />
        </>
      );
    case "apiLog":
      return (
        <>
          <path d="M5 9.897c0-1.714 1.46-3.104 3.26-3.104c.275-1.22 1.255-2.215 2.572-2.611c1.317-.397 2.77-.134 3.811 .69c1.042 .822 1.514 2.08 1.239 3.3h.693a2.42 2.42 0 0 1 2.425 2.414a2.42 2.42 0 0 1 -2.425 2.414h-8.315c-1.8 0-3.26-1.39-3.26-3.103z" />
          <path d="M12 13v3" />
          <path d="M12 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M14 18h7" />
          <path d="M3 18h7" />
        </>
      );
    default:
      return (
        <>
          <circle cx="12" cy="12" r="7" />
          <path d="M9.5 12H14.5" />
        </>
      );
  }
}

function renderUserLinkGroup(items: string[]) {
  if (items.length === 0) {
    return <span className="text-text-secondary">--</span>;
  }

  const maxVisible = 5;
  const firstRowCount = 3;
  const visibleItems = items.slice(0, maxVisible);
  const hiddenItems = items.slice(maxVisible);
  const rowOne = visibleItems.slice(0, firstRowCount);
  const rowTwo = visibleItems.slice(firstRowCount);

  const renderIconChip = (item: string) => {
    const meta = userLinkMeta[item] ?? { label: glyphLabel(item), title: prettifyToken(item) };

    return (
      <span key={item} className="group relative inline-flex">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FAFD] text-text-icon transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-soft">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            {renderUserLinkGlyph(item)}
          </svg>
        </span>
        {renderTooltipLabel(meta.title)}
      </span>
    );
  };

  return (
    <div className="flex min-w-[112px] flex-col gap-1.5">
      <div className="flex items-center gap-1.5">{rowOne.map(renderIconChip)}</div>
      {rowTwo.length > 0 || hiddenItems.length > 0 ? (
        <div className="flex items-center gap-1.5">
          {rowTwo.map(renderIconChip)}
          {hiddenItems.length > 0 ? (
            <span className="group relative inline-flex">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-line text-[12px] font-semibold leading-none text-text-icon transition-colors duration-200 hover:bg-brand hover:text-white">
                +{hiddenItems.length}
              </span>
              {renderTooltipLabel(hiddenItems.map((item) => (userLinkMeta[item] ?? { title: prettifyToken(item) }).title).join(", "))}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function createRecord(
  record: Partial<AdminRecord> & Pick<AdminRecord, "id" | "name">,
): AdminRecord {
  return {
    avatar: "",
    subtitle: "",
    status: "Active",
    updatedAt: "Updated today",
    category: "",
    owner: "",
    plan: "",
    amount: "",
    metric: "",
    email: "",
    location: "",
    count: "",
    source: "",
    priority: "",
    stage: "",
    seats: "",
    tags: [],
    viewLinks: [],
    linkedTo: [],
    ...record,
  };
}

export function createPage(config: PageConfig<AdminRecord>): PageConfig<AdminRecord> {
  const normalizedSection = config.section.toLowerCase();
  const entityLabel = config.title.toLowerCase();
  const defaultBulkActions = createDefaultBulkActions(normalizedSection, entityLabel);

  return {
    width: "content",
    emptyMessage: "No records found.",
    rowActionDisplay: "menu",
    ...config,
    bulkActions: config.bulkActions ?? defaultBulkActions,
  };
}

export function createStat(config: StatConfig): StatConfig {
  return config;
}

export function searchFilter(
  placeholder: string,
  id = "query",
  label = "Search",
): FilterConfig {
  return {
    id,
    label,
    type: "search",
    placeholder,
  };
}

export function selectFilter(
  id: string,
  label: string,
  options: Array<{ label: string; value: string }>,
  config: Pick<FilterConfig, "columnId" | "matchMode" | "allLabel" | "selectionMode" | "applyLabel"> = {},
): FilterConfig {
  return {
    id,
    label,
    type: "select",
    options,
    ...config,
  };
}

export function createAction(
  id: string,
  label: string,
  message: string,
  variant: HeaderAction["variant"] = "secondary",
  icon: HeaderAction["icon"] = "refresh",
): HeaderAction {
  return {
    id,
    label,
    message,
    variant,
    icon,
  };
}

export function createRowAction(
  id: string,
  label: string,
  message: string | ((row: AdminRecord) => string),
  variant: TableAction<AdminRecord>["variant"] = "secondary",
): TableAction<AdminRecord> {
  return {
    id,
    label,
    message,
    variant,
  };
}

function createBulkAction(
  id: string,
  label: string,
  entityLabel: string,
  verb: string,
): BulkTableAction<AdminRecord> {
  return {
    id,
    label,
    message: (rows) => `${verb} would be applied to ${rows.length} selected ${entityLabel}.`,
  };
}

function createDefaultBulkActions(section: string, entityLabel: string): BulkTableAction<AdminRecord>[] {
  if (section.includes("financial")) {
    return [
      createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
      createBulkAction("mark-reviewed", "Mark Reviewed", entityLabel, "Review"),
      createBulkAction("download-summary", "Download Summary", entityLabel, "Summary download"),
    ];
  }

  if (section.includes("product")) {
    return [
      createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
      createBulkAction("change-status", "Change Status", entityLabel, "Status change"),
      createBulkAction("duplicate-selected", "Duplicate Selected", entityLabel, "Duplication"),
    ];
  }

  if (section.includes("platform") || section.includes("system")) {
    return [
      createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
      createBulkAction("assign-owner", "Assign Owner", entityLabel, "Owner assignment"),
      createBulkAction("change-status", "Change Status", entityLabel, "Status change"),
    ];
  }

  if (section.includes("community")) {
    return [
      createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
      createBulkAction("moderate-selected", "Moderate Selected", entityLabel, "Moderation"),
      createBulkAction("change-status", "Change Status", entityLabel, "Status change"),
    ];
  }

  if (section.includes("enrollment")) {
    return [
      createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
      createBulkAction("change-status", "Change Status", entityLabel, "Status change"),
      createBulkAction("send-message", "Send Message", entityLabel, "Message send"),
    ];
  }

  return [
    createBulkAction("export-selected", "Export Selected", entityLabel, "Export"),
    createBulkAction("change-status", "Change Status", entityLabel, "Status change"),
    createBulkAction("assign-owner", "Assign Owner", entityLabel, "Owner assignment"),
  ];
}

export function nameColumn(header = "Name"): TableColumn<AdminRecord> {
  return {
    id: "name",
    header,
    cell: (row) => (
      <div className="flex items-center gap-3">
        {row.avatar ? (
          <img
            src={row.avatar}
            alt={row.name}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-surface-line"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-text-secondary">
            {row.name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <div className="font-semibold text-text-primary">{row.name}</div>
          {row.subtitle ? <div className="mt-1 text-xs text-text-secondary">{row.subtitle}</div> : null}
        </div>
      </div>
    ),
    sortValue: (row) => row.name,
    searchValue: (row) => [row.name, row.subtitle].filter(Boolean).join(" "),
    className: "min-w-[220px]",
  };
}

export function textColumn(
  field: keyof AdminRecord,
  header: string,
  className = "",
): TableColumn<AdminRecord> {
  return {
    id: String(field),
    header,
    cell: (row) =>
      isDateLikeHeader(header)
        ? renderDateValue(String(valueFor(row, field)))
        : <span className="text-text-primary">{valueFor(row, field)}</span>,
    sortValue: (row) => String(valueFor(row, field)),
    searchValue: (row) => String(valueFor(row, field)),
    className,
  };
}

export function amountColumn(header = "Amount"): TableColumn<AdminRecord> {
  return {
    id: "amount",
    header,
    cell: (row) => <span className="font-semibold text-text-primary">{row.amount || "--"}</span>,
    sortValue: (row) => row.amount ?? "",
    searchValue: (row) => row.amount ?? "",
  };
}

export function metricColumn(header = "Metric"): TableColumn<AdminRecord> {
  return {
    id: "metric",
    header,
    cell: (row) =>
      header.toLowerCase().includes("progress")
        ? renderProgressValue(row.metric || "")
        : <span className="text-text-primary">{row.metric || "--"}</span>,
    sortValue: (row) => row.metric ?? "",
    searchValue: (row) => row.metric ?? "",
  };
}

export function statusColumn(header = "Status"): TableColumn<AdminRecord> {
  return {
    id: "status",
    header,
    cell: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
    sortValue: (row) => row.status,
    searchValue: (row) => row.status,
  };
}

export function updatedColumn(header = "Updated"): TableColumn<AdminRecord> {
  return {
    id: "updatedAt",
    header,
    cell: (row) => renderDateValue(row.updatedAt),
    sortValue: (row) => row.updatedAt,
    searchValue: (row) => row.updatedAt,
  };
}

export function tagsColumn(header = "Tags"): TableColumn<AdminRecord> {
  return {
    id: "tags",
    header,
    cell: (row) => renderTagGroup(row.tags ?? []),
    sortValue: (row) => row.tags?.join(", ") ?? "",
    searchValue: (row) => row.tags?.join(" ") ?? "",
    className: "min-w-[130px]",
  };
}

export function userLinksColumn(
  field: "viewLinks" | "linkedTo",
  header: string,
): TableColumn<AdminRecord> {
  return {
    id: field,
    header,
    cell: (row) => renderUserLinkGroup((row[field] as string[] | undefined) ?? []),
    sortValue: (row) => ((row[field] as string[] | undefined) ?? []).join(", "),
    searchValue: (row) => ((row[field] as string[] | undefined) ?? []).join(" "),
    className: "min-w-[150px]",
  };
}

export function standardStatusOptions() {
  return [
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Inactive", value: "inactive" },
    { label: "Draft", value: "draft" },
    { label: "Review", value: "review" },
    { label: "Suspended", value: "suspended" },
  ];
}
