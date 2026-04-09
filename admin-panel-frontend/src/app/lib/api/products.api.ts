import { legacyData } from "@/app/features/legacy/legacyData";
import type { AllProductsApiResponse, LegacyProductDto } from "@/app/lib/types/products";
import type { LegacyUserStatDto } from "@/app/lib/types/users";

type LegacyAllProductsPage = {
  datasets?: {
    statsData?: LegacyUserStatDto[];
    productsData?: LegacyProductDto[];
  };
};

export async function fetchAllProductsPage(): Promise<AllProductsApiResponse> {
  const page = legacyData["all-products"] as unknown as LegacyAllProductsPage | undefined;

  return {
    stats: page?.datasets?.statsData ?? [],
    rows: page?.datasets?.productsData ?? [],
  };
}
