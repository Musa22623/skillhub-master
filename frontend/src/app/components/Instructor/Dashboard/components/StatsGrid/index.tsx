/** @format */

"use client";

import React, { useRef } from "react";
import { StatCard } from "./StatCard";
import {
  BundleSvg,
  CommunitySvg,
  CourseSvg,
  PayoutSvg,
  RatingStarSvg,
  StudentSvg,
  TimeDollarSvg,
  ZoomSvg,
} from "@/app/components/svg";
import { Star } from "lucide-react";

const StatsGrid = () => {
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const desktopScrollRef = useRef<HTMLDivElement | null>(null);



  return (
    <React.Fragment>
      <div className="min-xs:hidden p-0 flex flex-col gap-5 w-full">
        <div
          ref={mobileScrollRef}
          className="min-xs:hidden overflow-x-auto scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex flex-col gap-5 w-max px-[10px] pb-5 pt-1">
            {/* First row */}
            <div className="flex gap-3 w-max">
              <StatCard.Mobile
                icon={<CourseSvg className="size-5 fill-[#2e90fa]" />}
                iconBg="bg-[#d7e9ff]"
                iconColor="text-blue-600"
                name="Courses"
                value="18"
                percentage="+12.5%"
                trend="positive"
                comparison="Compared to last month"
                footer="$981 Earned"
              />

              <StatCard.Mobile
                icon={<StudentSvg className="size-5 fill-[#12b76a]" />}
                iconBg="bg-[#e5fef0]"
                iconColor="text-green-600"
                name="Students"
                value="120,875"
                percentage="+28.0%"
                trend="positive"
                comparison="Compared to last month"
                footer="+25,000 Followers"
              />

              <StatCard.Mobile
                icon={<Star className="size-5 " />}
                iconBg="bg-[#e9e3ff]"
                iconColor="text-[#9e77ed]"
                name="Ratings"
                value="355"
                percentage="-26.7%"
                trend="negative"
                comparison="Compared to last month"
                footer={
                  <div className="inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-500">
                      <path
                        d="M9.31 9.262l-6.198.947 4.49 4.602-1.04 6.382L12 18.186l5.439 3.007-1.041-6.382 4.49-4.602-6.198-.947L12 3.53 9.31 9.262zM8.292 7.9L0 9.167l6 6.15L4.584 24 12 19.9l7.417 4.1L18 15.317l6-6.15L15.708 7.9 12 0 8.292 7.9z"
                        fill="currentColor"
                        fillRule="evenodd"
                      />
                    </svg>
                    4.5 Avg Rating
                  </div>
                }
              />

              <StatCard.Mobile
                icon={<BundleSvg className="size-5 fill-[#f79009]" />}
                iconBg="bg-[#fff3d7]"
                iconColor="text-amber-500"
                name="Bundles"
                value="12"
                percentage="+15.0%"
                trend="positive"
                comparison="Compared to last month"
                footer="$557 Earned"
              />
            </div>

            {/* Second row */}
            <div className="flex gap-3 w-max">
              <StatCard.Mobile
                icon={<TimeDollarSvg className="size-5 fill-[#f04438]" />}
                iconBg="bg-[#ffe4e8]"
                iconColor="text-blue-600"
                name="Subs. Min Watched"
                value="8,897"
                percentage="+33.3%"
                trend="positive"
                comparison="Compared to last month"
                footer="$410.55 Earned"
              />

              <StatCard.Mobile
                icon={<CommunitySvg className="size-5 fill-[#ff692e]" />}
                iconBg="bg-[#ffe4d5]"
                iconColor="text-green-600"
                name="Communities"
                value="7"
                percentage="+33.3%"
                trend="positive"
                comparison="Compared to last month"
                footer="$383.55 Earned"
              />

              <StatCard.Mobile
                icon={<ZoomSvg className="size-5 fill-[#344054]" />}
                iconBg="bg-[#f3f3f3]"
                iconColor="text-purple-600"
                name="Sessions"
                value="5"
                percentage="0%"
                trend="neutral"
                comparison="Compared to last month"
                footer="$242 Earned"
              />

              <StatCard.Mobile
                icon={<PayoutSvg className="size-5 fill-[#2e90fa]" />}
                iconBg="bg-[#eff8ff]"
                iconColor="text-amber-500"
                name="Last Payout"
                value="$1,301"
                percentage="+37.0%"
                trend="positive"
                comparison="Compared to last month"
                footer="$437 Unpaid"
              />
            </div>
          </div>
        </div>
      </div>
	       <div
        ref={desktopScrollRef}
        className="max-xs:hidden overflow-x-auto px-0 scrollbar-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
      <div className="max-xs:hidden pb-4 grid grid-cols-1 gap-[12px] justify-center xl:grid-cols-4 xl:gap-[24px] lg:grid-cols-3 lg:gap-[20px] md:grid-cols-3 md:gap-[15px] sm:grid-cols-2 sm:gap-[15px] xs:grid-cols-2 xs:gap-[12px]">
      
	    <StatCard.Desktop
          icon={<CourseSvg className="w-[22px] h-[22px] fill-[#2e90fa]" />}
          iconBg="#d7e9ff"
          name={"Courses"}
          value={18}
          percent={12.5}
          content={<>$981 Earned</>}
        />
        <StatCard.Desktop
          icon={<StudentSvg className="w-[22px] h-[22px] fill-[#12b76a]" />}
          iconBg="#e5fef0"
          name={"Students"}
          value={120875}
          percent={28}
          content={<>+25,000 Followers</>}
        />
        <StatCard.Desktop
          icon={<Star className="w-[22px] h-[22px] text-[#9e77ed]" />}
          iconBg="#e9e3ff"
          name={"Ratings"}
          value={355}
          percent={-26.7}
          content={
            <>
              <RatingStarSvg className="w-[16px] h-[16px] stroke-[#13c4cc] stroke-2 fill-none" />
              4.5 Avg Rating
            </>
          }
        />
        <StatCard.Desktop
          icon={<BundleSvg className="w-[22px] h-[22px] fill-[#f79009]" />}
          iconBg="#fff3d7"
          name={"Bundles"}
          value={12}
          percent={15}
          content={<>$557 Earned</>}
        />
        <StatCard.Desktop
          icon={<TimeDollarSvg className="w-[22px] h-[22px] fill-[#f04438]" />}
          iconBg="#ffe4e8"
          name={"Minutes Watched"}
          value={8897}
          percent={33.3}
          content={<>$410.55 Earned</>}
        />
        <StatCard.Desktop
          icon={<CommunitySvg className="w-[22px] h-[22px] fill-[#ff692e]" />}
          iconBg="#ffe4d5"
          name={"Communities"}
          value={7}
          percent={33.3}
          content={<>$383.55 Earned</>}
        />
        <StatCard.Desktop
          icon={<ZoomSvg className="w-[22px] h-[22px] fill-[#344054]" />}
          iconBg="#f3f3f3"
          name={"Sessions"}
          value={5}
          percent={0}
          content={<>$242 Earned</>}
        />
        <StatCard.Desktop
          icon={<PayoutSvg className="w-[22px] h-[22px] fill-[#2e90fa]" />}
          iconBg="#eff8ff"
          name={"Last Payout"}
          value={1301}
          percent={37}
          content={<>$437 Unpaid</>}
        />
      </div>
	  </div>
    </React.Fragment>
  );
};

export default StatsGrid;
