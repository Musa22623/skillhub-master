import type { NextRequest } from "next/server";
import { fetchEventProductsListPage } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";
import { parsePositiveInteger, parseSearchFields, parseSortDirection } from "@/app/api/admin/shared/list-query";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = {
    query: searchParams.get("query") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortDir: parseSortDirection(searchParams.get("sortDir")),
    page: parsePositiveInteger(searchParams.get("page"), 1),
    pageSize: parsePositiveInteger(searchParams.get("pageSize"), 25),
    searchFields: parseSearchFields(searchParams.get("searchFields")),
  };

  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/event-products", {
      query: query.query,
      status: query.status,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
      page: query.page,
      pageSize: query.pageSize,
      searchFields: query.searchFields.join(","),
    });
  }

  const payload = await fetchEventProductsListPage(query);
  return jsonResponse(payload);
}
