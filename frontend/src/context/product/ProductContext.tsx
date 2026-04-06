
'use client';

import { createContext, useState } from 'react';
import { PRODUCT_DATA } from "@/constants";

interface ProductContextType {
setFilteredProducts: React.Dispatch<React.SetStateAction<typeof PRODUCT_DATA>>
setCurrentPage:React.Dispatch<React.SetStateAction<number>>
currentPage:number;
filteredProducts: typeof PRODUCT_DATA
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState<typeof PRODUCT_DATA>(
      []
    );
  return (
    <ProductContext.Provider value={{ setFilteredProducts, setCurrentPage, currentPage, filteredProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
