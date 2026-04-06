import { ProductCard } from "./ProductCard";
import { PRODUCT_DATA } from "@/constants";

type IProduct = {
  image: string;
  type: string;
  status?: string;
  title: string;
  price?: string;
  students?: string;
  members?: string;
  posts?: string;
  spaces?: string;
  certificates?: string;
  subscribers?: string;
  products?: string;
  lastActivity: string;
  action?: string;
};

const ProductsGrid = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 max-xs:hidden">
        {PRODUCT_DATA.map((product: IProduct, index: number) => (
          <ProductCard.Desktop {...product} key={index} />
        ))}
      </div>
      <div className="min-xs:hidden flex flex-col gap-1 max-xs:gap-3">
        {PRODUCT_DATA.map((product: IProduct, index: number) => (
          <ProductCard.Mobile {...product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
