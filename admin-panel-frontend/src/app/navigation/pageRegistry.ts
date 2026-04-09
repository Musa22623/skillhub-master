import type { PageConfig } from "@/app/components/types/ui";
import type { AdminRecord } from "@/app/sections/shared/config/shared";
import { userPages } from "@/app/sections/users/config/pages";
import { productPages } from "@/app/sections/products/config/pages";
import { enrollmentPages } from "@/app/sections/enrollment/config/pages";
import { financialPages } from "@/app/sections/financials/config/pages";
import { communityPages } from "@/app/sections/community/config/pages";
import { platformPages } from "@/app/sections/platform/config/pages";
import { systemPages } from "@/app/sections/system/config/pages";

export const pageRegistry: PageConfig<AdminRecord>[] = [
  ...userPages,
  ...productPages,
  ...enrollmentPages,
  ...financialPages,
  ...communityPages,
  ...platformPages,
  ...systemPages,
];
