import { fetchAllProductsSummary } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/products/summary");
  }

  const payload = await fetchAllProductsSummary();
  return jsonResponse(payload);
}
