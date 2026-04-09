import { fetchAllProductsPage } from "@/app/lib/api/products.api";
import { mapAllProductsApiResponse } from "@/app/lib/mappers/products.mapper";

export async function getAllProductsPageData() {
  const response = await fetchAllProductsPage();
  return mapAllProductsApiResponse(response);
}
