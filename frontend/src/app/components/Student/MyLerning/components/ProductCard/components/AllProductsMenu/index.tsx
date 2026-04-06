import React from "react";
import MenuItem from "./MenuItem";
import { PRODUCTS_MENU_ITEMS } from "@/constants";

interface AllProductsMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

type IMenuItem = {
  icon: React.ReactNode;
  title: string;
  count: number;
};

const AllProductsMenu: React.FC<AllProductsMenuProps> = ({ open, setOpen }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

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
    <div
      ref={menuRef}
      className={`z-50 absolute top-full right-0 bg-white rounded-lg py-2 px-0 mt-2 min-w-[180px] opacity-0 invisible shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ${
        open ? "visible opacity-100" : ""
      }`}
    >
      {PRODUCTS_MENU_ITEMS.map((item: IMenuItem, index: number) => (
        <MenuItem {...item} key={index} />
      ))}
    </div>
  );
};

export default AllProductsMenu;
