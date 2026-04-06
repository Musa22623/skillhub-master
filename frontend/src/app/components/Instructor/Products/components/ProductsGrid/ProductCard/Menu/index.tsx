"use client";

// import { CheckIcon } from "@/app/components/svg";
import { X } from "lucide-react";
import Image, { StaticImageData } from "next/image";
// import { useState } from "react";

interface HoverSubmenuItemProps {
  imageUrl: StaticImageData;
  title: string;
  price: string;
  showCheck?: boolean;
  onUnlink?: () => void;
}
export const HoverSubmenuItem = ({
  imageUrl,
  title,
  // price,
  // showCheck = false,
  onUnlink,
}: HoverSubmenuItemProps) => {

  const handleUnlink = () => {
    onUnlink?.();
  };

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer">
      <div className="flex items-center justify-between gap-5">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded overflow-hidden flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={title}
            width={48}
            height={48}
            className="object-cover w-12 h-12"
          />
        </div>
        <span className="font-semibold text-gray-800 break-words leading-tight">
          {title}
        </span>
      </div>
      <button
        type="button"
        className="flex items-center gap-2 p-1 justify-end hover:bg-red-500 hover:text-white hover:rounded"
        onClick={handleUnlink}
      >
        <X className="size-4" />
      </button>
    </div>
  );
};
