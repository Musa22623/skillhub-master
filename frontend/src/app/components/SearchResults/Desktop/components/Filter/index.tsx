"use client"

import { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Star, 
  Globe, 
  BarChart3, 
  DollarSign, 
  Plus, 
  ArrowDownWideNarrow, 
  ChevronDown, 
  X 
} from 'lucide-react';

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
  onFilterChange?: (filterId: string, optionId: string, checked: boolean) => void;
  onSortChange?: (sortId: string) => void;
}

export default function EnhancedFilters({
  filterSections = [],
  sortOptions = [],
  defaultSortOption = 'relevant',
  onFilterChange,
  onSortChange
}: FilterComponentProps) {
  // States for dropdown toggles
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, FilterOption[]>>({});
  const [currentSort, setCurrentSort] = useState(defaultSortOption);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  // Get filter icon based on filter id
  const getFilterIcon = (filterId: string) => {
    switch (filterId) {
      case 'product':
        return <LayoutGrid className="w-4 h-4 opacity-80 text-gray-600" />;
      case 'rating':
        return <Star className="w-4 h-4 opacity-80 text-gray-600" />;
      case 'language':
        return <Globe className="w-4 h-4 opacity-80 text-gray-600" />;
      case 'level':
        return <BarChart3 className="w-4 h-4 opacity-80 text-gray-600" />;
      case 'price':
        return <DollarSign className="w-4 h-4 opacity-80 text-gray-600" />;
      default:
        return <LayoutGrid className="w-4 h-4 opacity-80 text-gray-600" />;
    }
  };

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.filter-dropdown') && !target.closest('.filter-button') && 
          !target.closest('.sort-dropdown') && !target.closest('.sort-button')) {
        setActiveDropdown(null);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPanelOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Handle filter checkbox change
  const handleFilterChange = (filterId: string, option: FilterOption, checked: boolean) => {
    const updatedSelectedFilters = { ...selectedFilters };
    
    if (!updatedSelectedFilters[filterId]) {
      updatedSelectedFilters[filterId] = [];
    }

    if (checked) {
      updatedSelectedFilters[filterId] = [...updatedSelectedFilters[filterId], option];
    } else {
      updatedSelectedFilters[filterId] = updatedSelectedFilters[filterId].filter(
        (item) => item.id !== option.id
      );
    }

    setSelectedFilters(updatedSelectedFilters);
    
    if (onFilterChange) {
      onFilterChange(filterId, option.id, checked);
    }
  };

  // Handle sort option change
  const handleSortChange = (sortId: string) => {
    setCurrentSort(sortId);
    setActiveDropdown(null);
    
    if (onSortChange) {
      onSortChange(sortId);
    }
  };

  // Toggle filter section collapse in side panel
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Get current sort label
  const getCurrentSortLabel = () => {
    const sortOption = sortOptions.find(option => option.id === currentSort);
    return sortOption ? sortOption.label : 'Most Relevant';
  };

  return (
    <>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 flex-1">
            {/* Filter buttons */}
            {filterSections.slice(0, 5).map((section) => (
              <div key={section.id} className="relative filter-dropdown">
                <button
                  className={`filter-button px-4 py-2 bg-white border border-slate-200 rounded-md cursor-pointer flex items-center gap-2 text-sm font-semibold text-gray-800 transition-all min-h-9 ${
                    activeDropdown === section.id || (selectedFilters[section.id]?.length ?? 0) > 0
                      ? "bg-slate-50 border-sky-500 text-sky-500"
                      : "hover:bg-slate-50 hover:border-slate-300"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === section.id ? null : section.id);
                  }}
                >
                  {getFilterIcon(section.id)}
                  <span>{section.title}</span>
                  {(selectedFilters[section.id]?.length ?? 0) > 0 && (
                    <span className="bg-teal-500 text-white py-0.5 px-2 rounded-full text-xs font-semibold">
                      {selectedFilters[section.id]?.length}
                    </span>
                  )}
                </button>
                
                {/* Dropdown content */}
                {activeDropdown === section.id && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-md py-3 px-3 min-w-60 z-50">
                    {section.options.map((option) => (
                      <label key={option.id} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-50 rounded text-sm w-full">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-2 border-slate-300 rounded"
                          checked={!!selectedFilters[section.id]?.some(item => item.id === option.id)}
                          onChange={(e) => handleFilterChange(section.id, option, e.target.checked)}
                        />
                        <div className="flex items-center gap-1 flex-1">
                          {section.id === 'rating' && (
                            <div className="flex items-center gap-1">
                              <span>{option.label}</span>
                              <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
                            </div>
                          )}
                          {section.id !== 'rating' && option.label}
                        </div>
                        {option.count != null && (
                          <span className="text-slate-500 text-xs">({option.count.toLocaleString()})</span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* More filters button */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-md text-sm font-semibold text-gray-800 transition-all hover:bg-slate-200"
              onClick={() => setIsPanelOpen(true)}
            >
              <Plus className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
          
          <div className="border-t border-slate-200 pt-4 mt-2 lg:pt-0 lg:mt-0 lg:border-t-0 lg:border-l lg:pl-6">
            {/* Sort dropdown */}
            <div className="relative sort-dropdown">
              <button
                className="sort-button px-4 py-2 bg-white border border-slate-200 rounded-md cursor-pointer flex items-center gap-2 text-sm font-semibold text-gray-800 transition-all min-h-9 hover:bg-slate-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveDropdown(activeDropdown === "sort" ? null : "sort");
                }}
              >
                <ArrowDownWideNarrow className="w-4 h-4 opacity-80 text-gray-600" />
                <span>Sort by: {getCurrentSortLabel()}</span>
              </button>
              
              {activeDropdown === "sort" && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-md py-3 px-3 min-w-48 z-50">
                  {sortOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-50 rounded text-sm w-full">
                      <input
                        type="radio"
                        className="w-4 h-4"
                        checked={currentSort === option.id}
                        onChange={() => handleSortChange(option.id)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Side Panel */}
      <div className={`fixed top-0 right-0 w-full sm:max-w-md h-full bg-white shadow-lg transition-all duration-300 z-50 transform ${
        isPanelOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}>
        <div className="p-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">All Filters</h2>
          <button
            className="p-1 hover:bg-slate-100 rounded-full"
            onClick={() => setIsPanelOpen(false)}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-5">
          {filterSections.map((section) => (
            <div key={section.id} className="mb-6 pb-4 border-b border-slate-200 last:border-b-0">
              <div
                className="flex justify-between items-center mb-4 cursor-pointer"
                onClick={() => toggleSection(section.id)}
              >
                <h3 className="text-base font-semibold text-gray-800">{section.title}</h3>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${
                  collapsedSections[section.id] ? '-rotate-90' : ''
                }`} />
              </div>
              
              {!collapsedSections[section.id] && (
                <div className="grid gap-2">
                  {section.options.map((option) => (
                    <div key={option.id}>
                      <label className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-50 rounded text-sm">
                        <input
                          type="checkbox"
                          className="w-4 h-4 border-2 border-slate-300 rounded"
                          checked={!!selectedFilters[section.id]?.some(item => item.id === option.id)}
                          onChange={(e) => handleFilterChange(section.id, option, e.target.checked)}
                        />
                        <div className="flex items-center gap-1 flex-1">
                          {option.label}
                        </div>
                        {option.count != null && (
                          <span className="text-slate-500 text-xs">({option.count.toLocaleString()})</span>
                        )}
                      </label>
                      
                      {/* Nested options */}
                      {option.children && option.children.length > 0 && selectedFilters[section.id]?.some(item => item.id === option.id) && (
                        <div className="ml-6 pl-3 border-l border-slate-200">
                          {option.children.map((childOption) => (
                            <label key={childOption.id} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-50 rounded text-sm">
                              <input
                                type="checkbox"
                                className="w-4 h-4 border-2 border-slate-300 rounded"
                                checked={!!selectedFilters[`${section.id}-${option.id}`]?.some(item => item.id === childOption.id)}
                                onChange={(e) => handleFilterChange(`${section.id}-${option.id}`, childOption, e.target.checked)}
                              />
                              {childOption.label}
                              {childOption.count != null && (
                                <span className="text-slate-500 text-xs ml-auto">({childOption.count.toLocaleString()})</span>
                              )}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {section.options.length > 3 && (
                    <button className="text-left text-teal-500 text-sm font-semibold pt-2 hover:underline">
                      + Show more
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
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