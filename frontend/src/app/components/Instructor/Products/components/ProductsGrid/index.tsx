import { ProductCard } from "./ProductCard";

type IProduct = {
  id:string,
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

const ProductsGrid = ({products}:{products:IProduct[]}) => {
  return (
    <div>
      <div className="flex flex-col gap-4 max-xs:hidden">
        {products.map((product: IProduct, index: number) => (
          <ProductCard.Desktop {...product} key={index} />
        ))}
      </div>
      <div className="min-xs:hidden flex flex-col gap-1 max-xs:gap-3">
        {products.map((product: IProduct, index: number) => (
          <ProductCard.Mobile {...product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
