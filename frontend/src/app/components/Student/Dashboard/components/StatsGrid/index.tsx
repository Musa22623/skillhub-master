/** @format */

"use client";

import React from "react";
import { StatCard } from "./StatCard";
import {
  CommunitySvg,
  CourseSvg,
  PayoutSvg,
  StudentSvg,
  TimeDollarSvg,
  CertificateSvg,
  BadgesSvg,
  StarLineSvg,
} from "@/app/components/svg";

// Common Stats Data
const statsData = [
  {
    icon: <CourseSvg className="size-5 " fill="#2e90fa" />,
    iconBg: "#d7e9ff",
    name: "In Progress",
    value: "18",
    percent: 12.5,
    content: (
      <>
        <CourseSvg className="size-4" fill="#16a9b1" /> 105 Total
      </>
    ),
  },
  {
    icon: <StudentSvg className="size-5  " fill="#10b368" />,
    iconBg: "#e5fef0",
    name: "Completed",
    value: "37",
    percent: 28,
    content: (
      <>
        <StudentSvg className="size-4" fill="#16a9b1" />
        55 Total
      </>
    ),
  },
  {
    icon: <StarLineSvg className="size-5" fill="#906bd6" />,
    iconBg: "#e9e3ff",
    name: "Reviews Left",
    value: "35",
    percent: -26.7,
    content: (
      <>
        <StarLineSvg className="size-4" fill="#16a9b1" />
        75 Total
      </>
    ),
  },
  {
    icon: <BadgesSvg className="size-5" fill="#df820e" />,
    iconBg: "#fff3d7",
    name: "Badges",
    value: "3",
    percent: 15,
    content: (
      <>
        <BadgesSvg className="size-4" fill="#16a9b1" />
        15 Total
      </>
    ),
  },
  {
    icon: <TimeDollarSvg className="size-5 fill-[#f04438]" />,
    iconBg: "#ffe4e8",
    name: "Minutes Watched",
    value: "8,897",
    percent: 33.3,
    content: (
      <>
        <TimeDollarSvg className="size-4" fill="#16a9b1" />
        8,895 Total
      </>
    ),
  },
  {
    icon: <CommunitySvg className="size-4" fill="#f8672d" />,
    iconBg: "#ffe4d5",
    name: "Comments",
    value: "67",
    percent: 33.3,
    content: (
      <>
        <CommunitySvg className="size-4" fill="#16a9b1" />
        1,595 Total
      </>
    ),
  },
  {
    icon: <CertificateSvg className="size-5 fill-[#344054]" />,
    iconBg: "#f3f3f3",
    name: "Certificates",
    value: "5",
    percent: 0,
    content: (
      <>
        <CertificateSvg className="size-4" fill="#16a9b1" />
        24 Total
      </>
    ),
  },
  {
    icon: <PayoutSvg className="size-5 fill-[#2e90fa]" />,
    iconBg: "#eff8ff",
    name: "Spent",
    value: "$407",
    percent: 37,
    content: (
      <>
        <PayoutSvg className="size-4" fill="#16a9b1" />
        $2,450 Total
      </>
    ),
  },
];

const StatsGrid = () => {
  return (
    <React.Fragment>
      {/* Mobile View */}
      <div className="min-xs:hidden p-0 flex flex-col gap-5 w-full bg-white">
        {/** Render Mobile Cards in 2 Rows **/}

        <div className="flex w-full p-4">
          <StatCard.Mobile />
        </div>
      </div>

      {/* Desktop View */}
      <div className="max-xs:hidden grid grid-cols-1 gap-[12px] justify-center xl:grid-cols-4 xl:gap-[24px] lg:grid-cols-3 lg:gap-[20px] md:grid-cols-3 md:gap-[15px] sm:grid-cols-2 sm:gap-[15px] xs:grid-cols-2 xs:gap-[12px]">
        {statsData.map((stat, index) => (
          <StatCard.Desktop key={index} {...stat} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default StatsGrid;
