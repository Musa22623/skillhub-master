import { fetchMockAllInstructorsSummary } from "@/app/lib/api/users.mock";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/instructors/summary");
  }

  const payload = await fetchMockAllInstructorsSummary();
  return jsonResponse(payload);
}
