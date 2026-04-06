import React from "react";

const FilterMenu = () => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

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

  const filterOptionClass = "flex items-center gap-2 p-2 cursor-pointer";
  const filterCheckClass =
    "filter-checkbox w-4 h-4 border-[2px] border-[#e0e0e0] rounded-xs relative";
  const checkedClass = "checked bg-[#00BCD4] border-[#00BCD4]";
  const filterLabelClass = "text-sm text-[#333]";

  return (
    <div className="relative max-xs:w-full">
      <button
        className="flex max-xs:w-full items-center cursor-pointer gap-2 px-3 py-2 bg-[#f5f5f] border border-[#e0e0e0] rounded-md text-sm text-[#333] font-semibold hover:bg-[#ebebeb]"
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
          <div className={`${filterCheckClass} ${checkedClass}`}></div>
          <span className={filterLabelClass}>Published</span>
        </div>
        <div className={filterOptionClass}>
          <div className={filterCheckClass}></div>
          <span className={filterLabelClass}>Draft</span>
        </div>
        <div className={filterOptionClass}>
          <div className={filterCheckClass}></div>
          <span className={filterLabelClass}>Pending Approval</span>
        </div>
        <div className={filterOptionClass}>
          <div className={filterCheckClass}></div>
          <span className={filterLabelClass}>Rejected</span>
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
