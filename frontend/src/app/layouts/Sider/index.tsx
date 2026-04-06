"use client";
import React from "react";
import Logo from "@/assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BookmarkSvg,
  CalendarSvg,
  CollapseSvg,
  CollectionSvg,
  ExploreSvg,
  HomeOutlinedSvg,
  LearningSvg,
  MarketingSvg,
  NotificationSvg,
  PlayListSvg,
  ProductSvg,
  ReportSvg,
  SalesHistorySvg,
  SchoolSvg,
  SettingSvg,
  TeamSvg,
} from "@/app/components/svg";
import Styles from "./Sider.module.css";

type IMenuItem = {
  menuKey: string;
  icon: React.ElementType;
  title: string;
  route: string;
};

const mainMenuItems: Array<IMenuItem> = [
  {
    menuKey: "dashboard",
    icon: HomeOutlinedSvg,
    title: "Dashboard",
    route: "/instructor/dashboard"
  },
  {
    menuKey: "my_products",
    icon: ProductSvg,
    title: "My Products",
     route: "/instructor/products"
  },
  {
    menuKey: "sales_history",
    icon: SalesHistorySvg,
    title: "Sales History",
     route: "/instructor/sales-history",
  },
  {
    menuKey: "marketing",
    icon: MarketingSvg,
    title: "Marketing",
    route: "/instructor/marketing",
  },
];

const learnMenuItems: Array<IMenuItem> = [

  {
    menuKey: "student",
    icon: ExploreSvg,
    title: "Dashboards",
    route: "/student/dashboard",
  },
  {
    menuKey: "learn_explore",
    icon: ExploreSvg,
    title: "Explore",
     route: "/student/explore",
  },
  {
    menuKey: "learn_my_learning",
    icon: LearningSvg,
    title: "My Learning",
     route: "/",
  },
  {
    menuKey: "learn_learner_report",
    icon: ReportSvg,
    title: "Learner Report",
     route: "/",
  },
  {
    menuKey: "learn_school",
    icon: SchoolSvg,
    title: "School",
     route: "/",
  },
  {
    menuKey: "learn_calendar",
    icon: CalendarSvg,
    title: "Calendar",
     route: "/",
  },
  {
    menuKey: "learn_bookmarks",
    icon: BookmarkSvg,
    title: "Bookmarks",
     route: "/",
  },
  {
    menuKey: "learn_collections",
    icon: CollectionSvg,
    title: "Collections",
     route: "/",
  },
];

const bottoMenuItems: Array<IMenuItem> = [
  {
    menuKey: "playlist",
    icon: PlayListSvg,
    title: "PlayList",
     route: "/",
  },
  {
    menuKey: "notifications",
    icon: NotificationSvg,
    title: "Notifications",
     route: "/",
  },
  {
    menuKey: "team",
    icon: TeamSvg,
    title: "Team",
    route: "/",
  },
  {
    menuKey: "settings",
    icon: SettingSvg,
    title: "Settings",
     route: "/",
  },
];

interface NavItemProps {
  menuKey: string;
  title: string;
  icon: React.ElementType;
  activeMenu: string;
  setActiveMenu: (value: string) => void;
  isBottomMenu?: boolean;
  route:string;
}

const NavItem: React.FC<NavItemProps> = ({
  menuKey,
  title,
  icon: Icon,
  activeMenu,
  setActiveMenu,
  isBottomMenu,
  route,
}) => {
  const isActive = activeMenu === menuKey;
 const router = useRouter();

  const handleMenuClick = (menuKey:string,route:string) =>{
    setActiveMenu(menuKey);
    router.push(route);
  }

  return (
    <div
      className={`${Styles["nav-item"]} ${
        isActive
          ? Styles["active"]
          : isBottomMenu
          ? Styles["bottom-inactive"]
          : Styles["inactive"]
      }`}
      onClick={() => handleMenuClick(menuKey, route)}
    >
      <Icon
        className={`${
          isActive
            ? Styles["svg-icon-active"]
            : isBottomMenu
            ? Styles["svg-bottom-icon"]
            : Styles["svg-icon"]
        }`}
      />
      <div className="text-[13px]">{title}</div>
    </div>
  );
};

const Sider = () => {
  const [activeMenu, setActiveMenu] = React.useState("dashboard");

  return (
    <div className="pr-0 h-screen w-[220px] fixed bg-white max-[1221px]:hidden z-10">
      <div className="flex items-center justify-between border-b border-[#F0F0F0] pt-4 pr-2 pl-4 pb-3">
        <Image
          src={Logo}
          className="cursor-pointer"
          alt="logo"
          width={115}
          height={27}
          priority={true}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="px-[11px] py-2 cursor-pointer">
          <CollapseSvg />
        </div>
      </div>
      <div className="">
        <div>
          <div className="pt-2 px-4 flex flex-col gap-2">
            {mainMenuItems.map((menuItem: IMenuItem) => (
              <NavItem
                key={menuItem.menuKey}
                {...menuItem}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            ))}
          </div>
          <div className="pt-6">
            <div className="text-[10px] text-[#767571] font-semibold px-4">
              LEARN
            </div>
            <div className="pt-2 px-4 flex flex-col gap-2">
              {learnMenuItems.map((menuItem: IMenuItem) => (
                <NavItem
                  key={menuItem.menuKey}
                  {...menuItem}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))}
            </div>
          </div>
        </div>
        {/* bottom menu */}
        <div className="px-4 flex flex-col gap-2 mt-4">
          {bottoMenuItems.map((menuItem: IMenuItem) => (
            <NavItem
              key={menuItem.menuKey}
              {...menuItem}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              isBottomMenu={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sider;
