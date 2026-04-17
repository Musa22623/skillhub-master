import { fetchBundlesListPage, fetchBundlesSummary } from "@/app/lib/api/products.api";
import {
  mapBundlesListResponse,
  mapBundlesSummaryResponse,
} from "@/app/lib/mappers/products/bundles.mapper";
import type { BundlePageData, BundleQueryParams, BundleSummaryData } from "@/app/lib/types/products";

export async function getBundlesListData(params: BundleQueryParams): Promise<BundlePageData> {
  const response = await fetchBundlesListPage(params);
  return mapBundlesListResponse(response);
}

export async function getBundlesSummaryData(): Promise<BundleSummaryData> {
  const response = await fetchBundlesSummary();
  return mapBundlesSummaryResponse(response);
}
