"use client";

import React from "react";
import { StatCard } from "./StatCard";

const stats = [
  { name: "Sent", value: "21,300", percent: 4.2, content: "This Past Month" },
  {
    name: "Open Rate",
    value: "86.84%",
    percent: -1.2,
    content: "This Past Month",
  },
  { name: "CTR", value: "2.63%", percent: -2.2, content: "This Past Month" },
  {
    name: "Unsubscribed",
    value: "3.03%",
    percent: 1.0,
    content: "This Past Month",
  },
];

const StatsGrid = () => (
  <>
    {/* Mobile View */}
  
    <div className="min-xs:hidden p-0 w-full">
      <div className="w-[calc(100vw-15px)] overflow-x-auto">
        <div className="grid grid-cols-2 gap-3 mb-5 px-0.5">
          {stats.map((stat, i) => (
            <StatCard.Mobile key={i} {...stat} />
          ))}
        </div>
      </div>
    </div>

    {/* Desktop View */}
    <div className="max-xs:hidden grid gap-[12px] justify-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
      {stats.map((stat, i) => (
        <StatCard.Desktop key={i} {...stat} />
      ))}
    </div>
  </>
);

export default StatsGrid;
