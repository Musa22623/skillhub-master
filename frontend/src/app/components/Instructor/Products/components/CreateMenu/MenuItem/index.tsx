/** @format */

import React from "react";

interface MenuItemProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 w-full text-black font-[500] text-sm flex items-center gap-3 cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]"
    >
      {icon}
      {title}
    </button>
  );
};

export default MenuItem;
