import React from "react";
import Image, { StaticImageData } from "next/image";
import Tooltip from "@/app/components/ui/tooltips";
import Link from "next/link";

interface ProductCardProps {
  type: "course" | "event" | "community";
  isLast?: boolean;
  image: string | StaticImageData;
  title: string;
  progress: number;
  status: "Draft" | "Published";
  students: number;
  revenue: number;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  isLast, 
  type, 
  title, 
  progress, 
  status, 
  students, 
  revenue, 
  rating 
}) => {
  const classNames = {
    root: `max-xs:min-w-[240px] max-xs:snap-start max-xs:w-[240px] max-xs:p-0 bg-white border border-[#e5e7eb] rounded-[10px] p-4 transition-transform transition-shadow duration-200 flex flex-col sm:flex-row items-start overflow-auto sm:gap-4 gap-1 hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] ${
      isLast ? "" : "min-xs:mb-4"
    }`,
    image:
      "w-full h-[200px] max-xs:h-[140px] sm:w-12 sm:h-12 object-cover rounded-t-sm xs:rounded-[8px] flex-shrink-0",
    content: {
      root: "flex-grow flex flex-col justify-between w-full max-xs:p-3 max-xs:pt-0",
      title: "font-semibold text-[#1a1a1a] text-[15px] leading-[1.4]",
    },
    statusColor: {
      Draft: "text-[#1a1a1a]",
      Published: "text-[##1a1a1a]",
    },
  };
  
  return (
    <div className={classNames.root}>
      <Image
        alt={title}
        src={image}
        className={classNames.image}
        width={48}
        height={48}
      />
      <div className={classNames.content.root}>
        <h3 className={classNames.content.title}>{title}</h3>
        <p className="mb-2.5 mt-2 text-[13px]">
          Progress <span className="font-bold">{progress}%</span> • Status:{" "}
          <span className={`font-bold ${classNames.statusColor[status]}`}>{status}</span>
        </p>
        <div className="w-full bg-[#E5E5E5] rounded-full h-1 xs:h-2 mb-2.5">
          <div 
            className={`h-1 xs:h-2 rounded-full bg-[#16B78B]`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex gap-[16px] mt-auto">
          <Tooltip
            title={`${students.toLocaleString()} students`}
            classNames="flex items-center gap-2 text-[#4d4d4c] text-[13px] font-semibold"
          >
            <svg
              fill="none"
              viewBox="0 0 20 20"
              className="w-4 h-4 flex-shrink-0 text-[#4d4d4c]"
            >
              <path
                fill="currentColor"
                d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            {students.toLocaleString()}
          </Tooltip>
          <Tooltip
            title={`$${revenue.toLocaleString()} revenue`}
            classNames="flex items-center gap-2 text-[#4d4d4c] text-[13px] font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              className="w-4 h-4 flex-shrink-0 text-[#4d4d4c]"
            >
              <path
                fill="currentColor"
                d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
              <path
                fill="currentColor"
                d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            ${revenue.toLocaleString()}
          </Tooltip>
          <Tooltip
            title={`${rating} avg rating`}
            classNames="flex items-center gap-2 text-[#4d4d4c] text-[13px] font-semibold"
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 flex-shrink-0 text-[#4d4d4c]"
            >
              <path
                fill="currentColor"
                d="M12 4.875a.75.75 0 01.648.372l1.994 3.414 3.893.85a.75.75 0 01.395 1.238l-2.646 2.905.414 3.892a.75.75 0 01-1.042.768L12 16.744l-3.656 1.57a.75.75 0 01-1.042-.768l.414-3.892L5.07 10.75a.75.75 0 01.395-1.238l3.893-.85 1.994-3.414A.75.75 0 0112 4.875zm0 2.237l-1.512 2.59a.75.75 0 01-.488.354l-2.946.643 1.998 2.195a.75.75 0 01.191.584L8.93 16.43l2.775-1.192a.75.75 0 01.592 0l2.775 1.192-.314-2.952a.75.75 0 01.191-.584l1.998-2.195L14 10.056a.75.75 0 01-.488-.355L12 7.112z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            {rating}
          </Tooltip>
        </div>
        <Link href={`/edit-${type.toLowerCase()}`} className="inline-flex items-center justify-center py-2 px-4 rounded-[6px] text-[14px] font-semibold bg-[#f5f5f5] text-[#1a1a1a] border-0 cursor-pointer mt-3 transition-all duration-200 ease w-full hover:bg-[#e5e5e5] hover:translate-y-[-1px] active:translate-y-0">
          Edit {type.charAt(0).toUpperCase() + type.slice(1)}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;