/** @format */

import { FilterSvg } from "@/app/components/svg";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";
import React, { useState } from "react";
interface FilterMenuProps {
  selectedStatus: string[];
  setSelectedStatus: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSort?: string;
  onChangeSort?: (value: string) => void;
}
const FilterMenu: React.FC<FilterMenuProps> = ({
  selectedStatus,
  setSelectedStatus,
  selectedSort,
  onChangeSort,
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
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

  // sort menu
  const [tempSort, setTempSort] = useState(selectedSort);

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

  const filterOptionClass = "flex items-center gap-2 p-2 cursor-pointer ";
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const statusOptions = [
    {
      id: "all",
      name: "Any Status",
      desc: "Select all status ListboxOptions",
      count: 4,
      isAllOption: true,
    },
    {
      id: "published",
      name: "Published",
      desc: "Live and visible to users",
      count: 1,
    },
    { id: "draft", name: "Draft", desc: "Work in progress", count: 1 },
    {
      id: "pending",
      name: "Pending Approval",
      desc: "Awaiting review",
      count: 1,
    },
    {
      id: "rejected",
      name: "Rejected	",
      desc: "Not approved for publishing",
      count: 1,
    },
  ];

  const handleStatusSelect = (status: {
    id: string;
    name: string;
    desc: string;
    count: number;
    isAllOption?: boolean;
  }) => {
    if (status.isAllOption) {
      if (isAllSelected) {
        setSelectedFilter([]);
        setIsAllSelected(false);
      } else {
        setSelectedFilter(
          statusOptions.filter((p) => !p.isAllOption).map((p) => p.id)
        );
        setIsAllSelected(true);
      }
    } else {
      setSelectedFilter((prev) => {
        if (prev.includes(status.id)) {
          const newSelected = prev.filter((id) => id !== status.id);
          setIsAllSelected(false);
          return newSelected;
        } else {
          const newSelected = [...prev, status.id];
          // Check if all status are selected except "All status"
          if (newSelected.length === statusOptions.length - 1) {
            setIsAllSelected(true);
          }
          return newSelected;
        }
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    setSelectedStatus((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((status) => status !== id);
      }
    });
  };
  // const getSelectedCount = () => {
  // 	return isAllSelected ? 'All' : selectedFilter.length;
  // };

  React.useEffect(() => {
    // When selectedStatus is cleared (empty), also clear selectedFilter and isAllSelected for mobile
    if (isMobile && selectedStatus.length === 0) {
      setSelectedFilter([]);
      setIsAllSelected(false);
    }
  }, [selectedStatus, isMobile]);

  if (isMobile) {
    return (
      <div className="relative inline-block max-xs:w-full">
        <button
          className=" cursor-pointer  font-semibold "
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FilterSvg className="w-4 h-4 " fill="black" />
        </button>

        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="max-h-fit h-fit">
            <DrawerHeader className="flex-row justify-between items-center border-b py-0 pb-2">
              <DrawerTitle>Filter by Status</DrawerTitle>
              <button
                className="bg-transparent border-none text-gray-500 text-2xl cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <X className="size-4" />
              </button>
            </DrawerHeader>
            <section className="overflow-y-auto no-scrollbar">
              {/* Product Grid */}
              <div className="flex flex-col gap-2 py-4 px-0 max-h-[calc(90vh-140px)] overflow-y-auto">
                <div className="px-4 space-y-2">
                  <h3 className="font-semibold text-sm mb-2">Status</h3>
                  {/* Product Options */}
                  {statusOptions.map((status) => (
                    <div
                      key={status.id}
                      className={`relative border rounded-md p-3.5 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 ${
                        status.isAllOption
                          ? "bg-gray-50 border-2 border-blue-500 mb-2"
                          : "bg-white border-gray-200"
                      } ${
                        (status.isAllOption && isAllSelected) ||
                        (!status.isAllOption &&
                          selectedFilter.includes(status.id))
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      } hover:border-blue-500 hover:bg-blue-50 hover:-translate-y-0.5`}
                      onClick={() => handleStatusSelect(status)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col flex-1">
                          <span
                            className={`text-sm text-gray-700 font-semibold`}
                          >
                            {status.name}
                          </span>
                          <span className={`text-xs text-gray-600 `}>
                            {status.desc}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 border-2 rounded-md relative transition-all duration-200 flex-shrink-0 ${
                            (status.isAllOption && isAllSelected) ||
                            (!status.isAllOption &&
                              selectedFilter.includes(status.id))
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {((status.isAllOption && isAllSelected) ||
                            (!status.isAllOption &&
                              selectedFilter.includes(status.id))) && (
                            <div className="absolute left-1.5 top-0.5 w-1 h-2.5 border-r-2 border-b-2 border-white transform rotate-45" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* short section */}
                <hr className="my-4" />

                <div className="flex flex-col gap-3 px-4">
                  <h3 className="font-semibold text-sm">Short By</h3>
                  <div
                    className={`relative px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      tempSort === "newest" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                    onClick={() => setTempSort("newest")}
                  >
                    <input
                      type="radio"
                      id="sort-newest"
                      name="sort"
                      className="absolute opacity-0"
                      checked={tempSort === "newest"}
                      readOnly
                    />
                    <label
                      htmlFor="sort-newest"
                      className={`flex items-center justify-between w-full cursor-pointer ${
                        tempSort === "newest"
                          ? "text-blue-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span>Newest</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tempSort === "newest"
                            ? "border-2 border-blue-500 bg-blue-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {tempSort === "newest" && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`relative px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      tempSort === "az" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                    onClick={() => setTempSort("az")}
                  >
                    <input
                      type="radio"
                      id="sort-az"
                      name="sort"
                      className="absolute opacity-0"
                      checked={tempSort === "az"}
                      readOnly
                    />
                    <label
                      htmlFor="sort-az"
                      className={`flex items-center justify-between w-full cursor-pointer ${
                        tempSort === "az"
                          ? "text-blue-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span>Title: A-Z</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tempSort === "az"
                            ? "border-2 border-blue-500 bg-blue-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {tempSort === "az" && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`relative px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      tempSort === "za" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                    onClick={() => setTempSort("za")}
                  >
                    <input
                      type="radio"
                      id="sort-za"
                      name="sort"
                      className="absolute opacity-0"
                      checked={tempSort === "za"}
                      readOnly
                    />
                    <label
                      htmlFor="sort-za"
                      className={`flex items-center justify-between w-full cursor-pointer ${
                        tempSort === "za"
                          ? "text-blue-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span>Title: Z-A</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tempSort === "za"
                            ? "border-2 border-blue-500 bg-blue-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {tempSort === "za" && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`relative px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      tempSort === "popularity" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                    onClick={() => setTempSort("popularity")}
                  >
                    <input
                      type="radio"
                      id="sort-popularity"
                      name="sort"
                      className="absolute opacity-0"
                      checked={tempSort === "popularity"}
                      readOnly
                    />
                    <label
                      htmlFor="sort-popularity"
                      className={`flex items-center justify-between w-full cursor-pointer ${
                        tempSort === "popularity"
                          ? "text-blue-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span>Most popularity</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tempSort === "popularity"
                            ? "border-2 border-blue-500 bg-blue-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {tempSort === "popularity" && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                    </label>
                  </div>
                  <div
                    className={`relative px-3 py-2  rounded-lg cursor-pointer transition-all ${
                      tempSort === "modified" ? "bg-blue-50" : "bg-gray-50"
                    }`}
                    onClick={() => setTempSort("modified")}
                  >
                    <input
                      type="radio"
                      id="sort-modified"
                      name="sort"
                      className="absolute opacity-0"
                      checked={tempSort === "modified"}
                      readOnly
                    />
                    <label
                      htmlFor="sort-modified"
                      className={`flex items-center justify-between w-full cursor-pointer ${
                        tempSort === "modified"
                          ? "text-blue-700 font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      <span>Recently Modified</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          tempSort === "modified"
                            ? "border-2 border-blue-500 bg-blue-500"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {tempSort === "modified" && (
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <DrawerFooter className="border-t py-2">
              <div className="flex items-center gap-2">
                <button
                  className={`w-fit border py-3 px-4 rounded-md font-semibold bg-white text-black hover:bg-gray-800 text-sm transition-all duration-200`}
                  onClick={() => {
                    setSelectedFilter([]);
                    setIsAllSelected(true);
                    setTempSort("newest");
                    if (onChangeSort) {
                      onChangeSort("");
                    }
                  }}
                >
                  Clear
                </button>
                <button
                  className={`w-full py-3 px-4 rounded-md font-semibold bg-gray-900 text-white hover:bg-gray-800 text-sm transition-all duration-200`}
                  onClick={() => {
                    setSelectedStatus(selectedFilter);
                    if (tempSort && onChangeSort) {
                      onChangeSort(tempSort);
                    }
                    setOpen(false);
                  }}
                >
                  {/* {getSelectedCount() === 0
									? `Show All Results`
									: `Show ${getSelectedCount()} Results`} */}
                  Apply Filters
                </button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else {
    return (
      <div className="relative max-xs:w-full">
        <button
          className="flex max-xs:w-full font-semibold text-black items-center cursor-pointer gap-2 px-3 py-2 bg-[#f5f5f] border border-[#e0e0e0] rounded-md text-sm hover:bg-[#ebebeb]"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Filter by Status
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            fill="none"
            className="max-xs:ml-auto"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          ref={menuRef}
          className={`absolute top-full right-0 mt-2 max-xs:w-full z-50 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-3 min-w-[200px] opacity-0 invisible transition-all duration-200 ${
            open ? "opacity-100 visible" : ""
          }`}
        >
          <div className={filterOptionClass}>
            <label className="flex items-center space-x-2 cursor-pointer relative w-full">
              <input
                type="checkbox"
                id="published"
                className="peer appearance-none size-3.5 rounded-[2px] border border-gray-400  bg-white checked:bg-[#00BCD4] checked:border-teal-500 focus:outline-none"
                checked={selectedStatus.includes("published")}
                onChange={handleCheckboxChange}
              />
              <svg
                className="h-3 w-3 ml-px hidden peer-checked:block text-white absolute pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm ">Publish</span>
            </label>
          </div>
         
          <div className={filterOptionClass}>
            <label className="flex items-center space-x-2 cursor-pointer relative w-full">
              <input
                type="checkbox"
                id="draft"
                className="peer appearance-none size-3.5 rounded-[2px] border border-gray-400  bg-white checked:bg-[#00BCD4] checked:border-teal-500 focus:outline-none"
                checked={selectedStatus.includes("draft")}
                onChange={handleCheckboxChange}
              />
              <svg
                className="h-3 w-3 ml-px hidden peer-checked:block text-white absolute pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm ">Draft</span>
            </label>
          </div>
         
          <div className={filterOptionClass}>
            <label className="flex items-center space-x-2 cursor-pointer relative w-full">
              <input
                type="checkbox"
                id="pending"
                className="peer appearance-none size-3.5 rounded-[2px] border border-gray-400  bg-white checked:bg-[#00BCD4] checked:border-teal-500 focus:outline-none"
                checked={selectedStatus.includes("pending")}
                onChange={handleCheckboxChange}
              />
              <svg
                className="h-3 w-3 ml-px hidden peer-checked:block text-white absolute pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm ">Pending Approval</span>
            </label>
          </div>
         
          <div className={filterOptionClass}>
            <label className="flex items-center space-x-2 cursor-pointer relative w-full">
              <input
                type="checkbox"
                id="rejected"
                className="peer appearance-none size-3.5 rounded-[2px] border border-gray-400  bg-white checked:bg-[#00BCD4] checked:border-teal-500 focus:outline-none"
                checked={selectedStatus.includes("rejected")}
                onChange={handleCheckboxChange}
              />
              <svg
                className="h-3 w-3 ml-px hidden peer-checked:block text-white absolute pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm ">Rejected</span>
            </label>
          </div>
         
        </div>
      </div>
    );
  }
};

export default FilterMenu;
