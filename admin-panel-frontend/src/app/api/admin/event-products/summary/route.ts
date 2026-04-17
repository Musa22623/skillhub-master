import { fetchEventProductsSummary } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/event-products/summary");
  }

  const payload = await fetchEventProductsSummary();
  return jsonResponse(payload);
}
