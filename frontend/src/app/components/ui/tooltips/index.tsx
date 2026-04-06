import React from "react";

interface ToolTipProps {
  children: React.ReactNode;
  title: string;
  classNames?: string;
}

const Tooltip: React.FC<ToolTipProps> = ({ children, title, classNames }) => {
  return (
    <div
      className={`tooltip ${classNames}`}
      data-tooltip={title}
    >
      {children}
    </div>
  );
};

export default Tooltip;
