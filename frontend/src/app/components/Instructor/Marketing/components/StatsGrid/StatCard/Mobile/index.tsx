import React from "react";
// import { MarketingUp } from "@/app/components/svg";
// import { MarketingDown } from "@/app/components/svg";

interface StatCardProps {
  name: string;
  value: string;
  percent: number;
  content: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ name, value, percent }) => {
  const classNames = {
    root: "bg-white rounded-[12px] p-3 shadow-md",
    name: "text-[12px] text-[#262b3d] mb-1 font-semibold tracking-[-0.01em]",
    value: "text-[20px] font-bold text-[#142E53] mb-1",
    cardhead: "flex items-center justify-between text-[11px] text-[#64748B]",
    content: "font-semibold"
  };

  return (
    <div className={classNames.root}>
      <div className={classNames.name}>{name}</div>
      <div className={classNames.value}>{value}</div>
      <div className={classNames.cardhead}>
        <span className={classNames.content}>This Past Month</span>
        <div
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            percent > 0
              ? "text-green-600 bg-green-100"
              : percent < 0
              ? "text-red-600 bg-red-100"
              : "text-gray-600 bg-gray-100"
          }`}
        >
           {/* {percent > 0 ? <MarketingUp /> : <MarketingDown />} */}
          {percent > 0 ? "+" : "-"}
          {Math.abs(percent)}%
        </div>
      </div>
    </div>
  );
};

export default StatCard;
