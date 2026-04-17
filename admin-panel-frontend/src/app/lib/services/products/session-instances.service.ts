import { fetchSessionInstancesListPage, fetchSessionInstancesSummary } from "@/app/lib/api/products.api";
import {
  mapSessionInstancesListResponse,
  mapSessionInstancesSummaryResponse,
} from "@/app/lib/mappers/products/session-instances.mapper";
import type {
  SessionInstancePageData,
  SessionInstanceQueryParams,
  SessionInstanceSummaryData,
} from "@/app/lib/types/products";

export async function getSessionInstancesListData(
  params: SessionInstanceQueryParams,
): Promise<SessionInstancePageData> {
  const response = await fetchSessionInstancesListPage(params);
  return mapSessionInstancesListResponse(response);
}

export async function getSessionInstancesSummaryData(): Promise<SessionInstanceSummaryData> {
  const response = await fetchSessionInstancesSummary();
  return mapSessionInstancesSummaryResponse(response);
}
