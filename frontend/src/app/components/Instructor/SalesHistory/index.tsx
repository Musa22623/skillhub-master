"use client";

import React from "react";
import StatsGrid from "../SalesHistory/components/StatsGrid";
import SalesHistory from "./components/SalesHistory";
import PayoutHistory from "./components/PayoutHistory";

// import styles from "./historystyle.module.css"

const SalesHistoryInstructor = () => {
  return (
    <>
      <h2 className="text-[1.25rem] font-semibold text-[#262b3d] mb-[1.5rem]">
        Sales History
      </h2>

      <div className="mb-[1.5rem]">
        <StatsGrid />
      </div>

      <div className="mb-[1.5rem]">
        
        <SalesHistory />

      </div>

      <div className="mb-[1.5rem]">
        
        <PayoutHistory />

      </div>
    </>
  );
};

export default SalesHistoryInstructor;
