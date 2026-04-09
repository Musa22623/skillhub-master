import type { NextRequest } from "next/server";
import { fetchMockUserManagementPage } from "@/app/lib/api/users.mock";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";
import type { SortDirection } from "@/app/components/types/ui";

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

function parseSearchFields(value: string | null) {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);
}

function parseSortDirection(value: string | null): SortDirection | undefined {
  return value === "asc" || value === "desc" ? value : undefined;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = {
    query: searchParams.get("query") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    role: searchParams.get("role") ?? undefined,
    sortBy: searchParams.get("sortBy") ?? undefined,
    sortDir: parseSortDirection(searchParams.get("sortDir")),
    page: parsePositiveInteger(searchParams.get("page"), 1),
    pageSize: parsePositiveInteger(searchParams.get("pageSize"), 25),
    searchFields: parseSearchFields(searchParams.get("searchFields")),
  };

  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/users", {
      query: query.query,
      status: query.status,
      role: query.role,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
      page: query.page,
      pageSize: query.pageSize,
      searchFields: query.searchFields.join(","),
    });
  }

  const payload = await fetchMockUserManagementPage(query);
  return jsonResponse(payload);
}
