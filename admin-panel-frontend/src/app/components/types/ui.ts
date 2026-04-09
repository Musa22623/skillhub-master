import type { ComponentType, ReactNode } from "react";

export type ActionVariant = "primary" | "secondary" | "ghost" | "danger";
export type BadgeTone = "success" | "danger" | "warning" | "info" | "neutral";
export type IconName =
  | "dashboard"
  | "users"
  | "products"
  | "chart"
  | "money"
  | "community"
  | "platform"
  | "system"
  | "document"
  | "bell"
  | "search"
  | "refresh"
  | "calendar"
  | "activity"
  | "mail";

export type NavItem = {
  id: string;
  label: string;
  path?: string;
  icon?: IconName;
  group?: string;
  children?: NavItem[];
};

export type StatConfig = {
  id: string;
  label: string;
  value: string;
  change?: string;
  tone?: BadgeTone;
  icon: IconName;
  helper?: string;
};

export type HeaderAction = {
  id: string;
  label: string;
  variant?: ActionVariant;
  icon?: IconName;
  message?: string;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterConfig = {
  id: string;
  label: string;
  type: "search" | "select";
  placeholder?: string;
  options?: FilterOption[];
  columnId?: string;
  matchMode?: "includes" | "equals";
  allLabel?: string;
  selectionMode?: "single" | "multiple";
  applyLabel?: string;
};

export type FilterValue = string | string[];

export type SearchFieldOption = {
  id: string;
  label: string;
};

export type SortDirection = "asc" | "desc";

export type SortOption = {
  id: string;
  label: string;
  columnId: string;
  direction: SortDirection;
};

export type TableAction<Row> = {
  id: string;
  label: string;
  variant?: ActionVariant;
  message?: string | ((row: Row) => string);
};

export type BulkTableAction<Row> = {
  id: string;
  label: string;
  message?: string | ((rows: Row[]) => string);
};

export type TableColumn<Row> = {
  id: string;
  header: string;
  cell: (row: Row) => ReactNode;
  sortValue?: (row: Row) => string | number;
  searchValue?: (row: Row) => string;
  className?: string;
};

export type TabConfig<Row> = {
  id: string;
  label: string;
  stats?: StatConfig[];
  filters?: FilterConfig[];
  searchFields?: SearchFieldOption[];
  sortOptions?: SortOption[];
  enableSearchFieldSelector?: boolean;
  filterLayout?: "single" | "split";
  columns: TableColumn<Row>[];
  rows: Row[];
  rowActions?: TableAction<Row>[];
  rowActionDisplay?: "buttons" | "menu";
  bulkActions?: BulkTableAction<Row>[];
  bulkActionLabel?: string;
  defaultSortColumn?: string;
  emptyMessage?: string;
};

export type PageConfig<Row = Record<string, unknown>> = {
  id: string;
  path: string;
  title: string;
  section: string;
  component?: ComponentType;
  description?: string;
  width?: "content" | "narrow";
  stats?: StatConfig[];
  actions?: HeaderAction[];
  filters?: FilterConfig[];
  searchFields?: SearchFieldOption[];
  sortOptions?: SortOption[];
  enableSearchFieldSelector?: boolean;
  filterLayout?: "single" | "split";
  columns?: TableColumn<Row>[];
  rows?: Row[];
  rowActions?: TableAction<Row>[];
  rowActionDisplay?: "buttons" | "menu";
  bulkActions?: BulkTableAction<Row>[];
  bulkActionLabel?: string;
  useLegacyData?: boolean;
  density?: "compact" | "comfortable";
  tabs?: TabConfig<Row>[];
  emptyMessage?: string;
  notes?: string[];
};
