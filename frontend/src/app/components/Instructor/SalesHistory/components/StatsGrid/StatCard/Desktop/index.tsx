import React from "react";
import Badge from "@/app/components/ui/badge";

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string | undefined;
  name: string;
  value: string | number; // Replaced 'any' with 'string | number'
  percent: number;
  content: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBg,
  name,
  value,
  percent,
  content,
}) => {
  const classNames = {
    root: "bg-white rounded-[1rem] p-6 relative shadow-md flex flex-col w-full",
    header: "flex mb-3",
    icon: "w-[36px] h-[36px] rounded-[12px] w-[44px] h-[44px] flex items-center justify-center mb-2",
    name: "text-[#262b3d] text-[0.9rem] font-semibold mb-2",
    value:
      "text-[#142e53] text-[1.5rem] font-bold mb-2 flex items-center gap-3",
    comparison: "text-[#3b6e91] text-[0.8rem] opacity-70 mb-4",
    footer: {
      root: "p-[.75rem] bg-[rgba(0,0,0,.03)] m-[1.5rem_-1.5rem_-1.5rem] p-[1rem_1.5rem] rounded-b-lg border-t border-[rgba(229,231,235,.8)]",
      content:
        "inline-flex items-center gap-2 p-[0.375rem_0.875rem] bg-white rounded-full text-[#4b5563] font-semibold text-[0.875rem] shadow-[0_1px_2px_rgba(0,0,0,.05)]",
    },
  };

  return (
    <div className={classNames.root}>
      <div className={classNames.header}>
        <div className={classNames.icon} style={{ backgroundColor: iconBg }}>
          {icon}
        </div>
      </div>
      <div className={classNames.name}>{name}</div>
      <div className={classNames.value}>
        {value}
       { percent == 0 ? "" :
        <Badge
          color={percent > 0 ? "success" : percent < 0 ? "error" : "light"}
        >
          {percent > 0 ? "+" : ""}
          {percent.toFixed(1)}% {/* Ensure one decimal point */}
        </Badge>
      }
      </div>
      <div className={classNames.comparison}>{content}</div>
     
    </div>
  );
};

export default StatCard;
