import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color: "success" | "light" | "error";
  // size?: "sm" | "md" | "lg";
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  const baseClass = "inline-flex text-sm p-1 px-3 rounded-2xl font-semibold";

  const variants = {
    success: "bg-[rgba(2,197,175,.1)] text-[#02c5af]",
    light: "bg-[#f1f2f1] text-[#919595]",
    error: "bg-[rgba(255,76,81,.1)] text-[#ff4c51]",
  };

  const colorClass = variants[color];

  return <div className={`${baseClass} ${colorClass}`}>{children}</div>;
};

export default Badge;
