import { fetchEventProductsListPage, fetchEventProductsSummary } from "@/app/lib/api/products.api";
import {
  mapEventProductsListResponse,
  mapEventProductsSummaryResponse,
} from "@/app/lib/mappers/products/event-products.mapper";
import type {
  EventProductPageData,
  EventProductQueryParams,
  EventProductSummaryData,
} from "@/app/lib/types/products";

export async function getEventProductsListData(params: EventProductQueryParams): Promise<EventProductPageData> {
  const response = await fetchEventProductsListPage(params);
  return mapEventProductsListResponse(response);
}

export async function getEventProductsSummaryData(): Promise<EventProductSummaryData> {
  const response = await fetchEventProductsSummary();
  return mapEventProductsSummaryResponse(response);
}
