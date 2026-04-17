import { fetchBundlesSummary } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/bundles/summary");
  }

  const payload = await fetchBundlesSummary();
  return jsonResponse(payload);
}
