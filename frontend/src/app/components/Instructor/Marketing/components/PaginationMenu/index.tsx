import React from "react";

const PaginationMenu = () => {
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

  return (
    <div className="relative">
      <div
        ref={menuRef}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#f5f5f5] border-[#e0e0e0] rounded-md text-sm cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#ebebeb]"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Items Per Page: 6
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
        className={`absolute bottom-full left-0 mb-2 bg-white rounded-lg py-2 px-0 min-w-[120px] opacity-0 invisible shadow-md transition-all duration-200 ${
          open ? "visible opacity-100" : ""
        }`}
      >
        <div className="px-4 py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]">
          10
        </div>
        <div className="px-4 py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]">
          25
        </div>
        <div className="px-4 py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]">
          50
        </div>
      </div>
    </div>
  );
};

export default PaginationMenu;
