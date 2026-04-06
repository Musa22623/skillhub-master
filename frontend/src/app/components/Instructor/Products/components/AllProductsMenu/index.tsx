/** @format */
"use client";
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {PRODUCT_DATA} from '@/constants';

interface AllProductsMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProducts: string[],
  setSelectedProducts: React.Dispatch<React.SetStateAction<string[]>>
}

const AllProductsMenu: React.FC<AllProductsMenuProps> = ({ open, setOpen, selectedProducts, setSelectedProducts }) => {
  const isMobile = useIsMobile();
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (isAllSelected || selectedProducts.length === 0) {
      router.replace("?");
    } else {
      const searchParams = new URLSearchParams();
      selectedProducts.forEach((product) => {
        searchParams.append("type", product.toLowerCase());
      });
      router.replace(`?${searchParams.toString()}`);
    }
  }, [isAllSelected, selectedProducts, router]);

  const handleProductSelect = (product: {
    id: string;
    name: string;
    count: number;
    icon: React.FC;
    isAllOption?: boolean;
  }) => {
    if (product.isAllOption) {
      if (isAllSelected) {
        setSelectedProducts([]);
        setIsAllSelected(false);
      } else {
        setSelectedProducts(
          productOptions.filter((p) => !p.isAllOption).map((p) => p.id)
        );
        setIsAllSelected(true);
      }
    } else {
      setSelectedProducts((prev) => {
        if (prev.includes(product.id)) {
          const newSelected = prev.filter((id) => id !== product.id);
          // If removing this product means none are selected, also set isAllSelected to false
          setIsAllSelected(newSelected.length === productOptions.length - 1 ? true : false);
          return newSelected;
        } else {
          const newSelected = [...prev, product.id];
          // Check if all products are selected except "All Products"
          if (newSelected.length === productOptions.length - 1) {
            setIsAllSelected(true);
          }
          return newSelected;
        }
      });
    }
  };



  const includedTypes = ["school", "course", "session", "community", "bundle", "subscription"];
 
  const typeCounts: Record<string, number> = PRODUCT_DATA.reduce(
    (acc, product) => {
      const type = product.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
 
  const allCount = includedTypes.reduce((sum, type) => {
  return sum + (typeCounts[type] || 0);
}, 0);

  const productOptions = [
    {
      id: 'all',
      name: 'All Products',
      count: allCount,
      icon: AllProductsIcon,
      isAllOption: true,
    },
    {
      id: 'school',
      name: 'Schools',
      count: typeCounts['school'] || 0,
      icon: SchoolIcon,
    },
    {
      id: 'course',
      name: 'Courses',
      count: typeCounts['course'] || 0,
      icon: CourseIcon,
    },
    {
      id: 'session',
      name: 'Sessions',
      count: typeCounts['session'] || 0,
      icon: SessionIcon,
    },
    {
      id: 'community',
      name: 'Communities',
      count: typeCounts['community'] || 0,
      icon: CommunityIcon,
    },
    {
      id: 'bundle',
      name: 'Bundles',
      count: typeCounts['bundle'] || 0,
      icon: BundleIcon,
    },
    {
      id: 'subscription',
      name: 'Subscriptions',
      count: typeCounts['subscription'] || 0,
      icon: SubscriptionIcon,
    },
  ];

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="flex-row justify-between items-center py-0 pb-2 border-b">
            <DrawerTitle>Filter by Product Type</DrawerTitle>
            <button
              className="bg-transparent border-none text-gray-500 text-2xl cursor-pointer p-1"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>
          </DrawerHeader>
          <section className="overflow-y-auto no-scrollbar">
            <div className="flex flex-col gap-2 p-4 max-h-[calc(90vh-140px)] overflow-y-auto">
              {productOptions.map((product) => (
                <div
                  key={product.id}
                  className={`relative border rounded-xl p-3.5 cursor-pointer transition-all duration-200 ${product.isAllOption
                      ? "bg-gray-50 border-2 border--500 mb-2"
                      : "bg-white border-gray-200"
                    } ${(product.isAllOption && isAllSelected) ||
                      (!product.isAllOption &&
                        selectedProducts.includes(product.id))
                      ? "border-blue-500 bg-blue-50"
                      : ""
                    } hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-0.5`}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <product.icon />
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <span
                        className={`text-sm ${(product.isAllOption && isAllSelected) ||
                            (!product.isAllOption &&
                              selectedProducts.includes(product.id))
                            ? "text-blue-700 font-semibold"
                            : "text-gray-700 font-semibold"
                          }`}
                      >
                        {product.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-xl transition-all duration-200 ${(product.isAllOption && isAllSelected) ||
                              (!product.isAllOption &&
                                selectedProducts.includes(product.id))
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-500"
                            }`}
                        >
                          {product.count}
                        </span>
                        <div
                          className={`w-5 h-5 border-2 rounded-md caret-transparent relative transition-all duration-200 flex-shrink-0 ${(product.isAllOption && isAllSelected) ||
                              (!product.isAllOption &&
                                selectedProducts.includes(product.id))
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 bg-white"
                            }`}
                        >
                          {((product.isAllOption && isAllSelected) ||
                            (!product.isAllOption &&
                              selectedProducts.includes(product.id))) && (
                              <div className="absolute left-1.5 top-0.5 w-1 h-2.5 border-r-2 border-b-2 border-white transform rotate-45" />
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <DrawerFooter className="border-t py-2">
            <div className="flex gap-2">
              <button
                className="w-fit py-2 px-4 bg-white text-black border border-black rounded-md font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-gray-100"
                onClick={() => {
                  setSelectedProducts([]);
                  setIsAllSelected(false);
                }}
              >
                Clear
              </button>
              <button  onClick={() => setOpen(false)} className="w-full py-2 px-4 bg-black text-white border-none rounded-md font-semibold text-sm cursor-pointer transition-all duration-200 hover:bg-gray-800">
                 Show{' '}
            {
              PRODUCT_DATA.filter((product) =>
                selectedProducts.includes(product.type)
              ).length
            }{' '}
            Products
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
        <div
        ref={menuRef}
        className={`max-sm:hidden z-50 absolute top-full left-0 bg-white rounded-lg py-2 px-0 mt-2 min-w-[240px] opacity-0 invisible shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ${
          open ? 'visible opacity-100' : ''
        }`}
      >
        {productOptions.map((option) => (
          <div
            key={option.id}
            className={`px-4 py-2 w-full text-sm flex items-center justify-between cursor-pointer transition-all duration-200 ${
              (option.isAllOption && isAllSelected) ||
              (!option.isAllOption && selectedProducts.includes(option.id))
                ? 'bg-blue-50 text-blue-500  font-semibold'
                : 'text-black font-[500] hover:bg-[#f5f5f5]'
            }`}
            onClick={() => handleProductSelect(option)}
          >
            <div className='flex items-center gap-3'>
              <option.icon />
              <span>{option.name}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span
                className={`text-xs px-2 py-0.5 rounded-xl transition-all duration-200 ${
                  (option.isAllOption && isAllSelected) ||
                  (!option.isAllOption && selectedProducts.includes(option.id))
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {option.count}
              </span>
              <div
                className={`w-5 h-5 border-2 rounded-md caret-transparent relative transition-all duration-200 flex-shrink-0 ${
                  (option.isAllOption && isAllSelected) ||
                  (!option.isAllOption && selectedProducts.includes(option.id))
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {((option.isAllOption && isAllSelected) ||
                  (!option.isAllOption &&
                    selectedProducts.includes(option.id))) && (
                  <div className='absolute left-1.5 top-0.5 w-1 h-2.5 border-r-2 border-b-2 border-white transform rotate-45' />
                )}
              </div>
            </div>
          </div>
        ))}
        {/* <div className="align-middle my-2 border-b border-gray-200 "></div> */}
        <div className='flex justify-between border-t border-gray-300 p-3 mt-2 mx-1'>
          <button
            className='px-5 py-2 text-xs rounded-md text-gray-900 cursor-pointer border-1 transition duration-200 hover:bg-[#f5f5f7]'
            onClick={() => {
              setSelectedProducts([]);
              setIsAllSelected(false);
            }}
          >
            Clear
          </button>
          <button
          onClick={() => setOpen(false)}
            disabled={selectedProducts.length === 0}
            className={`px-4 py-2 rounded-md text-xs font-medium cursor-pointer border transition duration-200
    ${
      selectedProducts.length === 0
        ? 'bg-[#a0aec0]  cursor-not-allowed opacity-75 text-white'
        : 'bg-[#1a202c] text-white hover:bg-[#2d3748]'
    }
  `}
          >
            Show{' '}
            {
              PRODUCT_DATA.filter((product) =>
                selectedProducts.includes(product.type)
              ).length
            }{' '}
            Products
          </button>
        </div>
      </div>
    );
  }
};

// Icon Components
const AllProductsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#4F4F4F"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M4 4h6v6h-6z"></path>
    <path d="M14 4h6v6h-6z"></path>
    <path d="M4 14h6v6h-6z"></path>
    <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
  </svg>
);

const SchoolIcon = () => (
  <svg fill="none" viewBox="0 0 20 20" className="w-5 h-5">
    <path
      d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462Z"
      clipRule="evenodd"
      fillRule="evenodd"
      fill="#4F4F4F"
    ></path>
  </svg>
);

const CourseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    className="w-5 h-5"
  >
    <path
      fill="#4F4F4F"
      d="M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const SessionIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="#4F4F4F"
      d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const CommunityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 20"
    className="w-5 h-5"
  >
    <path
      fill="#4F4F4F"
      d="M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
    <path
      fill="#4F4F4F"
      d="M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z"
      clipRule="evenodd"
      fillRule="evenodd"
    ></path>
  </svg>
);

const BundleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path
      fill="#4F4F4F"
      d="M3 1h18a3 3 0 0 1 3 3v8H2v5a1 1 0 0 0 1 1h7v2H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3ZM2 4v2h20V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm11.8 10.81a2.7 2.7 0 0 1 4.2.43 2.7 2.7 0 0 1 4.2-.43 2.8 2.8 0 0 1 0 3.92L18 23l-4.2-4.27a2.8 2.8 0 0 1 0-3.92Z"
    ></path>
  </svg>
);

const SubscriptionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    className="size-5"
  >
    <path d="M17 12.7992V13.5992C17.4418 13.5992 17.8 13.241 17.8 12.7992H17ZM17 8.39922H17.8C17.8 7.95739 17.4418 7.59922 17 7.59922V8.39922ZM4.96739 4.12628C4.59574 4.3652 4.48814 4.86017 4.72706 5.23183C4.96598 5.60348 5.46095 5.71108 5.83261 5.47216L4.96739 4.12628ZM11 1.19922L11.6315 0.708066C11.3773 0.381231 10.9157 0.302372 10.5674 0.526276L11 1.19922ZM13.1685 5.29037C13.4398 5.63913 13.9424 5.70196 14.2912 5.4307C14.6399 5.15945 14.7027 4.65682 14.4315 4.30807L13.1685 5.29037ZM17 11.9992H14.4V13.5992H17V11.9992ZM14.4 9.19922H17V7.59922H14.4V9.19922ZM16.2 8.39922V12.7992H17.8V8.39922H16.2ZM13 10.5992C13 9.82602 13.6268 9.19922 14.4 9.19922V7.59922C12.7431 7.59922 11.4 8.94237 11.4 10.5992H13ZM14.4 11.9992C13.6268 11.9992 13 11.3724 13 10.5992H11.4C11.4 12.2561 12.7431 13.5992 14.4 13.5992V11.9992ZM5.83261 5.47216L11.4326 1.87216L10.5674 0.526276L4.96739 4.12628L5.83261 5.47216ZM10.3685 1.69037L13.1685 5.29037L14.4315 4.30807L11.6315 0.708066L10.3685 1.69037ZM1.8 5.59922H15.4V3.99922H1.8V5.59922ZM15.4 15.9992H1.8V17.5992H15.4V15.9992ZM1.8 15.9992V5.59922H0.2V15.9992H1.8ZM1.8 15.9992H1.8H0.2C0.2 16.8829 0.916343 17.5992 1.8 17.5992V15.9992ZM15.4 15.9992H15.4V17.5992C16.2837 17.5992 17 16.8829 17 15.9992H15.4ZM15.4 5.59922H15.4H17C17 4.71556 16.2837 3.99922 15.4 3.99922V5.59922ZM1.8 3.99922C0.916344 3.99922 0.2 4.71556 0.2 5.59922H1.8H1.8V3.99922ZM15.4 13.3992V15.9992H17V13.3992H15.4ZM15.4 5.59922V7.69922H17V5.59922H15.4Z"></path>
  </svg>
);

export default AllProductsMenu;