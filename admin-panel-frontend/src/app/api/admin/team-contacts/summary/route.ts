import { fetchMockTeamContactsSummary } from "@/app/lib/api/users.mock";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/team-contacts/summary");
  }

  const payload = await fetchMockTeamContactsSummary();
  return jsonResponse(payload);
}
