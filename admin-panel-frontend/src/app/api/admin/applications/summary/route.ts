import { fetchMockApplicationsSummary } from "@/app/lib/api/users.mock";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/applications/summary");
  }

  const payload = await fetchMockApplicationsSummary();
  return jsonResponse(payload);
}
