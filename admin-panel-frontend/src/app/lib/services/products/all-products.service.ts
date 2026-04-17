import { fetchAllProductsListPage, fetchAllProductsSummary } from "@/app/lib/api/products.api";
import {
  mapAllProductsListResponse,
  mapAllProductsSummaryResponse,
} from "@/app/lib/mappers/products/all-products.mapper";
import type {
  AllProductsPageData,
  AllProductsQueryParams,
  AllProductsSummaryData,
} from "@/app/lib/types/products";

export async function getAllProductsListData(
  params: AllProductsQueryParams,
): Promise<AllProductsPageData> {
  const response = await fetchAllProductsListPage(params);
  return mapAllProductsListResponse(response);
}

export async function getAllProductsSummaryData(): Promise<AllProductsSummaryData> {
  const response = await fetchAllProductsSummary();
  return mapAllProductsSummaryResponse(response);
}
