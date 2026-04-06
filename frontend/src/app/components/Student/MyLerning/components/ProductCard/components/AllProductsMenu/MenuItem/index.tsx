import React from "react";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  count: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, count }) => {
  return (
    <div className="px-4 py-2 text-[#333] text-sm flex items-center justify-between cursor-pointer transition-colors duration-200 hover:bg-[#f5f5f5]">
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
      <div>{count}</div>
    </div>
  );
};

export default MenuItem;
