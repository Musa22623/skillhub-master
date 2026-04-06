import React from "react";

const SortMenu = () => {
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

  const sortMenuItemClass =
    "px-4 py-2 text-[#333] cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]";

  return (
    <div className="relative inline-block max-xs:w-full">
      <button
        className="flex max-xs:w-full items-center cursor-pointer gap-2 px-3 py-2 bg-[#f5f5f] border border-[#e0e0e0] rounded-md text-sm text-[#333] font-semibold hover:bg-[#ebebeb]"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Sort: Newest
        <svg viewBox="0 0 24 24" fill="none" stroke="#666" className="w-4 h-4 max-xs:ml-auto">
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`absolute top-full right-0 mt-2 z-50 bg-white rounded-[8px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-3 min-w-[200px] opacity-0 invisible transition-all duration-200 ${
          open ? "opacity-100 visible" : ""
        }`}
      >
        <div className={sortMenuItemClass}>Recently Created</div>
        <div className={sortMenuItemClass}>Popularity</div>
        <div className={sortMenuItemClass}>Recently Modified</div>
        <div className={sortMenuItemClass}>Title: A-Z</div>
        <div className={sortMenuItemClass}>Title: Z-A</div>
      </div>
    </div>
  );
};

export default SortMenu;
