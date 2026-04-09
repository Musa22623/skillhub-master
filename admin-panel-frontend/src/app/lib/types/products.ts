import type { StatConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type { LegacyUserStatDto } from "@/app/lib/types/users";

export type LegacyProductDto = {
  id: number;
  productId: string;
  title: string;
  type: string;
  status: string;
  enrollments: number;
  created: string;
  updated?: string;
  instructor?: {
    name: string;
  };
};

export type AllProductsApiResponse = {
  stats: readonly LegacyUserStatDto[];
  rows: readonly LegacyProductDto[];
};

export type AllProductsPageData = {
  stats: StatConfig[];
  rows: AdminRecord[];
};
