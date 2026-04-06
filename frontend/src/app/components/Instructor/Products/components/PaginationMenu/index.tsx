/** @format */

import React from 'react';

interface PaginationMenuProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const PaginationMenu: React.FC<PaginationMenuProps> = ({ itemsPerPage, setItemsPerPage }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  
  // Available items per page options
  const itemsPerPageOptions = [10, 25, 50];

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

  const handleItemsPerPageChange = (newValue: number) => {
    setItemsPerPage(newValue);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div
        ref={menuRef}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f5] border border-[#e0e0e0] rounded-md text-sm cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#ebebeb]"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Items Per Page: {itemsPerPage}
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          fill="none"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        className={`absolute bottom-full left-0 mb-2 bg-white rounded-lg py-2 px-0 min-w-[120px] shadow-md transition-all duration-200 z-10 ${
          open ? "visible opacity-100" : "opacity-0 invisible"
        }`}
      >
        {itemsPerPageOptions.map((option) => (
          <div 
            key={option}
            className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5] ${
              itemsPerPage === option ? "font-semibold bg-[#f5f5f5] text-[#333]" : "text-[#333]"
            }`}
            onClick={() => handleItemsPerPageChange(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginationMenu;