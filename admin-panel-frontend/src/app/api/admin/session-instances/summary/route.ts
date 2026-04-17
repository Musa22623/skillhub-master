import { fetchSessionInstancesSummary } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/session-instances/summary");
  }

  const payload = await fetchSessionInstancesSummary();
  return jsonResponse(payload);
}
