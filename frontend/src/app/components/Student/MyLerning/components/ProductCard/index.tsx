"use client";

import React from "react";
import PaginationMenu from "./components/PaginationMenu";
import ProductsGrid from "./components/ProductsGrid";
import FilterMenu from "./components/FilterMenu";
import SortMenu from "./components/SortMenu";
import { ArrowBottomtSvg } from "@/app/components/svg";
import AllProductsMenu from "./components/AllProductsMenu";

const ProductsInstructor = () => {
  const [openProductsMenu, setOpenProductsMenu] = React.useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold leading-8 tracking-wide text-[#333] max-xs:text-2xl">
            All Products
          </h1>
          <div
            className="w-5 h-5 bg-[#333] rounded-[50%] flex items-center justify-center ml-0.5 cursor-pointer relative"
            onClick={() => {
              setOpenProductsMenu(!openProductsMenu);
            }}
          >
            <ArrowBottomtSvg className="w-3.5 h-3.5 stroke-white fill-none" />
            <AllProductsMenu
              open={openProductsMenu}
              setOpen={setOpenProductsMenu}
            />
          </div>
        </div>
      
      </div>

      <div className="bg-white rounded-xl max-xs:p-2 p-6 shadow-sm">
        <div className="mb-6">
          <input
            type="text"
            className="w-full py-3 pr-4 pl-10 rounded-lg text-sm border border-[#e0e0e0] bg-[url(/img/search-icon.svg)] bg-no-repeat bg-[12px_center] transition-all duration-200 focus:outline-none focus:border-[#333]"
            placeholder="Search Products"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-[#666] text-sm max-sm:hidden">
            Showing <strong className="text-[#333] font-semibold">1-8</strong>{" "}
            of <strong className="text-[#333] font-semibold">120</strong>{" "}
            products
          </div>
          <div className="flex items-center gap-3 justify-between max-sm:w-full">
            <FilterMenu />
            <SortMenu />
          </div>
        </div>

        <ProductsGrid />

        <div className="flex justify-between items-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0] max-sm:hidden">
          <div className="flex items-center gap-6">
            <div className="text-[#666] text-sm">
              Showing <strong className="text-[#333] font-semibold">1-8</strong>{" "}
              of <strong className="text-[#333] font-semibold">120</strong>{" "}
              products
            </div>
            <PaginationMenu />
          </div>

          <div className="flex items-center gap-2">
            <button className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333]transition-all duration-200 hover:bg-[#f5f5f5]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 bg-[#333] text-white border-[#333]">
              1
            </button>
            <button className="w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInstructor;
