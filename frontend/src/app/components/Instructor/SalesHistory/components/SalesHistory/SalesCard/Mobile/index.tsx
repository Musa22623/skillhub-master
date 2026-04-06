import React from "react";
import Image from "next/image";

interface SalesCardProps {
  type: "course" | "event" | "community";
  image: string;
  title: string;
  amount: number;
  status: "completed" | "refunded";
  date: string;
}

const SalesCard: React.FC<SalesCardProps> = ({
  type,
  image,
  title,
  amount,
  status,
  date,
}) => {
  const classNames = {
    root: "p-4 border border-[#e5e7eb] flex items-center gap-3 border-bottom-none",
    product: {
      root: "flex gap-3 items-center flex-1 min-width-0",
      image: "w-12 h-12 rounded-[50%] object-cover flex-shrink-0",
      title: "font-semibold text-sm mb-1 truncate",
      meta: {
        root: "flex gap-2 items-center mt-1",
        status: "inline-block py-1 px-2 rounded-xl text-xs font-semibold",
        type: "inline-flex py-1 px-2 text-xs bg-[#f3f4f6] text-[#4d4d4c] font-semibold rounded-xl",
      },
    },
    amount: "font-semibold text-[#1a1a1a] text-sm text-right whitespace-nowrap",
    date: "text-xs text-[#6b7280] text-right mt-[6px]",
  };

  const statusColor =
    status === "completed"
      ? "bg-[#dcfce7] text-[#166534]"
      : status === "refunded"
      ? "bg-[#fee2e2] text-[#991b1b]"
      : "";

  return (
    <div className={classNames.root}>
      <div className={classNames.product.root}>
        <Image
          className={classNames.product.image}
          src={image}
          alt={title}
          width={48}
          height={48}
        />
        <div className="flex-1 w-[160px]">
          <div className={classNames.product.title}>{title}</div>
          <div className={classNames.product.meta.root}>
            <span
              className={`${classNames.product.meta.status} ${statusColor}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className={classNames.product.meta.type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className={classNames.amount}>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
        <div className={classNames.date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesCard;
