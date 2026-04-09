import type { StatConfig, TableColumn } from "@/app/components/types/ui";

export type ConfiguredPageTabData<Row extends { id: string }> = {
  id: string;
  stats?: StatConfig[];
  columns?: TableColumn<Row>[];
  rows?: Row[];
  emptyMessage?: string;
};

export type ConfiguredPageData<Row extends { id: string }> = {
  source: "mock-config" | "mock-legacy";
  stats?: StatConfig[];
  columns?: TableColumn<Row>[];
  rows?: Row[];
  tabs?: ConfiguredPageTabData<Row>[];
};

export type ConfiguredPageApiResponse<Row extends { id: string }> = {
  source: "mock-config" | "mock-legacy";
  pageId: string;
  stats?: StatConfig[];
  rows?: Row[];
  tabs?: Array<{
    id: string;
    stats?: StatConfig[];
    rows?: Row[];
    emptyMessage?: string;
  }>;
  legacyPage?: unknown;
};
