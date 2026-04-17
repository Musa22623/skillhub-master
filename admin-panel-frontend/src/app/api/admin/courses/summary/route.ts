import { fetchCoursesSummary } from "@/app/lib/api/products.api";
import { jsonResponse, proxyAdminGet, shouldProxyAdminRequest } from "@/app/api/admin/shared/route-helpers";

export async function GET() {
  if (shouldProxyAdminRequest()) {
    return proxyAdminGet("/admin/courses/summary");
  }

  const payload = await fetchCoursesSummary();
  return jsonResponse(payload);
}
