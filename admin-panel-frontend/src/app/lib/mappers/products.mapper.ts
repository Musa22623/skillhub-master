import type { AdminRecord } from "@/app/sections/shared/config/shared";
import type { StatConfig } from "@/app/components/types/ui";
import type { AllProductsApiResponse, AllProductsPageData, LegacyProductDto } from "@/app/lib/types/products";

function toTitleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(" ");
}

function mapAllProductsStat(stat: { id: string; title: string; value: string; trend: { value: string; type: string } | null }): StatConfig | null {
  switch (stat.id) {
    case "total":
      return { id: "products-total", label: "Total products", value: stat.value, change: stat.trend?.value, tone: "success", icon: "products" };
    case "published":
      return { id: "products-published", label: "Published", value: stat.value, change: stat.trend?.value, tone: "success", icon: "chart" };
    case "pending":
      return { id: "products-pending", label: "Pending approval", value: stat.value, change: stat.trend?.value, tone: "warning", icon: "document" };
    case "drafts":
      return { id: "products-drafts", label: "Drafts", value: stat.value, change: stat.trend?.value, tone: "info", icon: "system" };
    default:
      return null;
  }
}

function mapProductStatus(status: string) {
  if (status.toLowerCase() === "published") {
    return "Published";
  }
  if (status.toLowerCase() === "pending") {
    return "Pending approval";
  }
  return toTitleCase(status);
}

function mapProductRow(product: LegacyProductDto): AdminRecord {
  return {
    id: String(product.id),
    name: product.title,
    subtitle: product.productId,
    category: toTitleCase(product.type),
    owner: product.instructor?.name ?? "--",
    metric: String(product.enrollments),
    status: mapProductStatus(product.status),
    updatedAt: product.updated ?? product.created,
  };
}

export function mapAllProductsApiResponse(response: AllProductsApiResponse): AllProductsPageData {
  return {
    stats: response.stats.map(mapAllProductsStat).filter((stat): stat is StatConfig => stat !== null),
    rows: response.rows.map(mapProductRow),
  };
}
