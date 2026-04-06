"use client";

import Image from "next/image";
import { SessionSvg, StarSvg, StudentSvg } from "@/app/components/svg";

interface EventsCardProps {
  title: string;
  author: string;
  image: string;
  thumbnail: string;
  description: string;
  sessionType: "1on1" | "Group";
  participants: string;
  engagementCount: string;
}

export function EventsCard({
  title,
  author,
  image,
  thumbnail,
  description,
  sessionType,
  participants,
  engagementCount,
}: EventsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
      {/* Course Image */}
      <div className="relative">
        <Image
          alt={title}
          className="w-full h-48 object-cover"
          src={image}
          width={400}
          height={200}
        />

        <Image
          alt={title}
          className="absolute bottom-[-25px] left-[20px] w-[50px] h-[50px] shadow-lg  rounded-[12px] border-3 border-white"
          src={thumbnail}
          width={50}
          height={50}
        />

        <div className="absolute -bottom-4 right-5 w-8 h-8 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-md transition-colors duration-300">
          <span className="relative -top-2 text-2xl">...</span>
        </div>
      </div>

      {/* Course Details */}
      <div className="pt-4 pl-4 pr-4 mt-5">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{author}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Book Now Button */}
        <button className="w-full bg-teal-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-teal-600 transition-colors duration-300">
          Book Now
        </button>
      </div>
      
      {/* Course Stats */}
      <div className="flex items-center justify-between text-sm bg-[rgb(248,_249,_251)] p-[10px]">
        <div className="relative group flex items-center gap-1">
          <div className="text-[#4287C4] w-4 h-4">
            <SessionSvg />
          </div>
          <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
            {sessionType}
          </span>

          <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
            {sessionType === "1on1" ? "1on1 Session" : "Group Session"}

            <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
          </div>
        </div>

        <div className="relative group flex items-center gap-1">
          <div className="text-[#4287C4] w-4 h-4">
            <StudentSvg />
          </div>
          <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
            {participants}
          </span>

          <div className="absolute -top-10 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1.5 px-3 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10">
            Member Count
            <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
          </div>
        </div>

        <div className="relative group flex items-center gap-1">
          <div className="text-[#4287C4] w-4 h-4">
            <StarSvg />
          </div>
          <span className="text-[14px] font-semibold text-[rgb(0, 0, 0)]">
            {engagementCount}
          </span>
        </div>
      </div>
    </div>
  );
}