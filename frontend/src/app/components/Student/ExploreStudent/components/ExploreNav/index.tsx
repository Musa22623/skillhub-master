"use client";
import { useState } from "react";
import {
  CourseSvg,
  EventSvg,
  CommunitySvg,
  InstructorsSVG,
  SubscriptionSvg,
  BundleSvg1,
  SettingSvg,
} from "@/app/components/svg";

import { TrendingCourse } from "./components/TrendingCourse";
import { TrendingSessions } from "./components/TrendingSessions";
import { TrendingCommunities } from "./components/TrendingCommunities";
import { PopularInstructors } from "./components/PopularInstructors";
import { PopularSubscriptions } from "./components/PopularSubscriptions";
import { TrendingBundles } from "./components/TrendingBundles";
// import Topics from "./components/Topics";

export default function ExplorePage() {
  const [active, setActive] = useState("All");

  // Navigation Items inside the component (to use `active`)
  const navItems = [
  { name: "All", svg: null },
  {
    name: "Courses",
    svg: (
      <CourseSvg
        className="size-5"
        fill={active === "Courses" ? "#02c5af" : "#6b7280"} // gray-500
      />
    ),
  },
  {
    name: "Sessions",
    svg: (
      <EventSvg
        className="size-5"
        fill={active === "Sessions" ? "#02c5af" : "#6b7280"}
      />
    ),
  },
  {
    name: "Communities",
    svg: (
      <CommunitySvg
        className="size-5"
        fill={active === "Communities" ? "#02c5af" : "#6b7280"}
      />
    ),
  },
  {
    name: "Instructors",
    svg: (
      <InstructorsSVG
        className="size-5"
        fill={active === "Instructors" ? "#02c5af" : "#6b7280"}
      />
    ),
  },
  {
    name: "Subscriptions",
    svg: (
      <SubscriptionSvg
        className="size-5"
        fill={active === "Subscriptions" ? "#02c5af" : "#6b7280"}
      />
    ),
  },
  {
    name: "Bundles",
    svg: (
      <BundleSvg1
        className="size-5"
        fill={active === "Bundles" ? "#02c5af" : "#6b7280"}
      />
    ),
  },
];


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white flex items-start shadow-md rounded-2xl mb-[1.5rem] ">
        <div className="flex items-center px-6 py-3 space-x-6 flex-grow flex-wrap">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="flex items-center space-x-2 text-gray-700 transition-colors cursor-pointer font-semibold"
              onClick={() => setActive(item.name)}
            >
              {item.svg && <span className="mr-1">{item.svg}</span>}
             <span
                className={`pb-[1px] leading-[3] transition-shadow duration-300 ${
                  active === item.name
                    ? "text-[rgb(2,197,175)] border-b-[3px] border-b-[rgb(2,197,175)]"
                    : ""
                }`}
              > 
                {item.name}
              </span>
            </button>
          ))}
        </div>

        <div className="w-[20%] flex justify-end mr-5 mt-5">
          <SettingSvg className="text-gray-600 cursor-pointer" />
        </div>
      </nav>

      {/* Content Sections */}
      <div>
        {/* {(active === "All" || active === "Topics") && <Topics/>} */}
        {(active === "All" || active === "Courses") && <TrendingCourse />}
        {(active === "All" || active === "Sessions") && <TrendingSessions />}
        {(active === "All" || active === "Communities") && <TrendingCommunities />}
        {(active === "All" || active === "Instructors") && <PopularInstructors />}
        {(active === "All" || active === "Subscriptions") && <PopularSubscriptions />}
        {(active === "All" || active === "Bundles") && <TrendingBundles />}
      </div>
    </div>
  );
}
