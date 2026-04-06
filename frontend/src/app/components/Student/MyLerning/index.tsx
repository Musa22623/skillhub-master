import ProductCard from "./components/ProductCard";
import OrderPlaced from "./components/OrderPlaced";
const MyLearning = () => {
  return (
    <>
      <div className="mb-[1.5rem]">
        <ProductCard />
      </div>
      <div className="mb-[1.5rem]">
        <OrderPlaced />
      </div>
    </>
  );
};

export default MyLearning;
