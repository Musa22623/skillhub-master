import { fetchMockTeamMembersSummary } from "@/app/lib/api/users.mock";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/team-members/summary");
  }

  const payload = await fetchMockTeamMembersSummary();
  return jsonResponse(payload);
}
