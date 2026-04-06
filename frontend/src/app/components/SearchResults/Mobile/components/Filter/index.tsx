"use client";

import { useState, useEffect } from "react";
import {

  ChevronDown,
  X,
} from "lucide-react";
import { BundleSvg1, CommunitySvg, CourseSvg, FilterSvg, SearchSvg, SessionSvg,  } from "@/app/components/svg";
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
interface FilterOption {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
  children?: FilterOption[];
  rating?: number;
}

interface FilterSection {
  id: string;
  title: string;
  options: FilterOption[];
  collapsed?: boolean;
}

interface SortOption {
  id: string;
  label: string;
  selected?: boolean;
}

interface FilterComponentProps {
  filterSections: FilterSection[];
  sortOptions: SortOption[];
  defaultSortOption: string;
  onFilterChange?: (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => void;
  onSortChange?: (sortId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  countCard : number
}



export default function Filters({
  filterSections = [],
 activeTab,
  setActiveTab, 
  onFilterChange,
  countCard
}: FilterComponentProps) {
  // States for dropdown toggles
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [inputValue,setInputValue] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, FilterOption[]>
  >({});
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  // Get filter icon based on filter id
  // const getFilterIcon = (filterId: string) => {
  //   switch (filterId) {
  //     case "product":
  //       return <LayoutGrid className="w-4 h-4 opacity-80 text-gray-600" />;
  //     case "rating":
  //       return <Star className="w-4 h-4 opacity-80 text-gray-600" />;
  //     case "language":
  //       return <Globe className="w-4 h-4 opacity-80 text-gray-600" />;
  //     case "level":
  //       return <BarChart3 className="w-4 h-4 opacity-80 text-gray-600" />;
  //     case "price":
  //       return <DollarSign className="w-4 h-4 opacity-80 text-gray-600" />;
  //     default:
  //       return <LayoutGrid className="w-4 h-4 opacity-80 text-gray-600" />;
  //   }
  // };
    const SearchnavItems = [

    {
      name: "Courses",
      svg: (
        <CourseSvg
          className="size-5"
          fill={activeTab === "Courses" ? "#02c5af" : "#6b7280"} // gray-500
        />
      ),
    },
    {
      name: "Sessions",
      svg: (
        <SessionSvg
          className="size-5"
          fill={activeTab === "Sessions" ? "#02c5af" : "#6b7280"}
        />
      ),
    },
    {
      name: "Communities",
      svg: (
        <CommunitySvg
          className="size-5"
          fill={activeTab === "Communities" ? "#02c5af" : "#6b7280"}
        />
      ),
    },
    
    
    {
      name: "Bundles",
      svg: (
        <BundleSvg1
          className="size-5"
          fill={activeTab === "Bundles" ? "#02c5af" : "#6b7280"}
        />
      ),
    },
  ];

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".filter-dropdown") &&
        !target.closest(".filter-button") &&
        !target.closest(".sort-dropdown") &&
        !target.closest(".sort-button")
      ) {
        if (activeDropdown !== null) {
          setActiveDropdown(null);
        }
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsPanelOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Handle filter checkbox change
  const handleFilterChange = (
    filterId: string,
    option: FilterOption,
    checked: boolean
  ) => {
    const updatedSelectedFilters = { ...selectedFilters };

    if (!updatedSelectedFilters[filterId]) {
      updatedSelectedFilters[filterId] = [];
    }

    if (checked) {
      updatedSelectedFilters[filterId] = [
        ...updatedSelectedFilters[filterId],
        option,
      ];
    } else {
      updatedSelectedFilters[filterId] = updatedSelectedFilters[
        filterId
      ].filter((item) => item.id !== option.id);
    }

    setSelectedFilters(updatedSelectedFilters);

    if (onFilterChange) {
      onFilterChange(filterId, option.id, checked);
    }
  };

  // Toggle filter section collapse in side panel
  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };


  return (
    <>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-row flex-wrap items-stretch sm:items-center gap-3 flex-1">
            {/* More filters button */}
            <div className="flex items-center space-x-2 p-2  ">
              <div className="flex  items-center border rounded-lg px-4 py-2 w-full max-w-sm  bg-slate-100">
                <SearchSvg fill="white" />
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="ml-2 outline-none w-60"
                  value={inputValue}
                />
              </div>
              <button
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 rounded-full text-sm font-semibold text-gray-800 transition-all hover:bg-slate-200"
                onClick={() => setIsPanelOpen(true)}
              >
                <FilterSvg className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex overflow-x-auto gap-2 no-scrollbar">
           {SearchnavItems.map((item) => (
              
             <div onClick={() => { setActiveTab(item.name.toLowerCase()); setInputValue(item.name.toLowerCase()); }} key={item.name} className="flex gap-2 text-gray-600 bg-accent border rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-accent/80">
               <div className="flex items-center" >
                 {item.svg}
               </div>
              <div>
                <span>{item.name}</span>
              </div>
                  {
                    activeTab === item.name.toLowerCase() &&   <div className="bg-teal-500 py-0.5 px-2 rounded-full  ">
                    <span className="flex items-center justify-center text-xs  text-white">{countCard}</span>
                  </div>
                  }
               
             </div>
           
          )) }
          </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {/* <div
        className={`fixed top-0 right-0 w-full sm:max-w-md h-full bg-white shadow-lg transition-all duration-300 z-50 transform ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Filters</h2>
          <button
            className="p-1 hover:bg-slate-100 rounded-full"
            onClick={() => setIsPanelOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

       
      </div> */}
        <Drawer open={isPanelOpen} onOpenChange={setIsPanelOpen}>
        <DrawerContent className="h-[95vh] ">
          <DrawerHeader className="border-b border-slate-200">
            <DrawerTitle className="text-lg font-semibold text-gray-800">All Filters</DrawerTitle>
            <button
              className="absolute right-4 top-3 p-1 hover:bg-slate-100 rounded-full"
              onClick={() => setIsPanelOpen(false)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </DrawerHeader>
          <div className="p-5 overflow-y-auto">
            {filterSections.map((section) => (
              <div key={section.id} className="mb-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-3"
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="font-semibold text-gray-800">{section.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      !collapsedSections[section.id] ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {!collapsedSections[section.id] && (
                  <div className="space-y-2 pl-1">
                    {section.options.map((option) => (
                      <div key={option.id} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id={`${section.id}-${option.id}`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                            checked={selectedFilters[section.id]?.some((item) => item.id === option.id) || false}
                            onChange={(e) => handleFilterChange(section.id, option, e.target.checked)}
                          />
                        </div>
                        <label htmlFor={`${section.id}-${option.id}`} className="ml-2 block text-sm text-gray-700">
                          {option.label}
                          {option.count !== undefined && <span className="ml-1 text-gray-500">({option.count})</span>}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <DrawerFooter className="border-t border-slate-200">
            <button
              className="w-full py-3 bg-black text-white rounded-md hover:bg-teal-600 transition-colors"
              onClick={() => setIsPanelOpen(false)}
            >
              Apply Filters
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Overlay */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsPanelOpen(false)}
        />
      )}
    </>
  );
}
