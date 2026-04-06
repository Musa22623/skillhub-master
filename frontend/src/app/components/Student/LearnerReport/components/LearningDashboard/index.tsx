"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";

// Sample learning data
const learningData = {
  daysLearned: [3, 6, 10, 19, 20],
  bestLearningDay: 20,
  minutesPerDay: {
    3: 45,
    6: 60,
    10: 90,
    19: 120,
    20: 250,
  },
  weeklyAverage: {
    MON: 0,
    TUE: 30,
    WED: 0,
    THU: 25,
    FRI: 120,
    SAT: 0,
    SUN: 0,
  },
};

// Function to get color intensity based on minutes learned
const getIntensityColor = (minutes: number) => {
  const maxMinutes = 120;
  const intensity = Math.min(minutes / maxMinutes, 1);
  const baseColor = { r: 19, g: 196, b: 204 }; // #13C4CC
  return `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${
    0.3 + intensity * 0.7
  })`;
};

export default function LearningDashboard() {
  const [selectedMonth, setSelectedMonth] = useState("July 2023");

  // Generate calendar days
  const renderCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      const hasLearned =
        learningData.minutesPerDay[
          i as keyof typeof learningData.minutesPerDay
        ];
      const isBestDay = i === learningData.bestLearningDay;

      let bgColor = "transparent";
      if (hasLearned) {
        bgColor = isBestDay ? "#13AFF0" : getIntensityColor(hasLearned);
      }

      days.push(
        <div
          key={i}
          className="aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer relative group"
          style={{ backgroundColor: bgColor }}
          data-minutes={hasLearned}
        >
          <span className={hasLearned ? "text-white" : "text-slate-500"}>
            {i}
          </span>
          {hasLearned && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {hasLearned} minutes
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  return (
    <div className=" mx-auto bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="relative mb-8">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#13C4CC] rounded-full"></div>
        <div className="pt-6">
          <h2 className="xs:text-2xl sm:text-2xl font-bold mb-2">Hey Joe,</h2>
          <div className="flex max-sm:flex-col justify-between items-start gap-10">
            <div>
              <p className="sm:text-xl">
                Your{" "}
                <span className="text-[#13C4CC] font-semibold">
                  Monthly Learner Report
                </span>{" "}
                is in!
              </p>
              <p className="text-slate-500 mt-2 sm:text-sm">
                Check out your stats for the month, see how you're growing, and
                aim to achieve even more next month!
              </p>
            </div>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-[260px]">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="July 2023">July 2023</SelectItem>
                <SelectItem value="August 2023">August 2023</SelectItem>
                <SelectItem value="September 2023">September 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h3 className="text-xl font-semibold mb-4">
        Learning Stats in {selectedMonth.split(" ")[0]}
      </h3>
      <div className="flex max-sm:flex-col gap-6 mb-10">
        {/* Calendar Section */}
        <div className="flex-1">
          <Card className="sm:h-[600px] flex flex-col">
            <CardContent className="p-4 flex-grow flex flex-col">
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-slate-500 text-sm "
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2 ">
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="flex gap-4 my-4 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#13C4CC]"></div>
                  <span>Days you learnt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#13AFF0]"></div>
                  <span>Best learning day</span>
                </div>
              </div>

              {/* Summary */}
              <div className=" bg-[#f0f7ff] rounded-lg sm:p-4 p-4">
                <p className="font-semibold">You learned 5 days this month</p>
                <p className="text-green-600">5 days more than last month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="flex-1">
          <div className="flex flex-col gap-4 h-full">
            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <svg viewBox="0 0 16 16" fill="#6B7280" className="w-5 h-5">
                      <path clipRule="evenodd" d="M6.017.667a.75.75 0 0 1 .75-.75H9.7a.75.75 0 0 1 0 1.5h-.717v.74a6.984 6.984 0 1 1-1.5 0v-.74h-.716a.75.75 0 0 1-.75-.75M3.756 1.67a.75.75 0 0 1 0 1.061l-1.1 1.1a.75.75 0 0 1-1.06-1.06l.549-.55.55-.55a.75.75 0 0 1 1.06 0m8.955 0a.75.75 0 0 1 1.06 0l1.1 1.1a.75.75 0 1 1-1.06 1.061l-.55-.55-.55-.55a.75.75 0 0 1 0-1.06M8.233 3.617a5.483 5.483 0 1 0 0 10.966 5.483 5.483 0 0 0 0-10.966m0 1.8a.75.75 0 0 1 .75.75v2.508l1.47.882a.75.75 0 1 1-.772 1.286l-1.834-1.1a.75.75 0 0 1-.364-.643V6.167a.75.75 0 0 1 .75-.75" fillRule="evenodd"></path>
                    </svg>
                    <span className="text-sm sm:text-sm">
                      TOTAL TIME LEARNING
                    </span>
                  </div>
                  <div className="sm:text-xl font-bold">4 Hrs 11 mins</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#6B7280">
                      <g><path d="M5.8,9.44l.25-.76s.03-.09,.05-.13c-.19,.26-.28,.56-.3,.89Zm9.52,8.51l-.76,.25c.33-.02,.63-.11,.89-.3-.04,.02-.09,.04-.13,.05Z"></path><path d="M12.71,11.29c-1.18-1.17-2.22-2.07-3.1-2.65-1.38-.92-2.45-1.07-3.19-.46-.05,.03-.09,.07-.13,.11s-.08,.09-.11,.14c-.03,.03-.06,.07-.08,.12-.02,.04-.04,.09-.05,.13l-.25,.76-3.75,11.24c-.12,.36-.02,.76,.24,1.03,.19,.19,.45,.29,.71,.29,.11,0,.21-.02,.32-.05l11.24-3.75,.76-.25s.09-.03,.13-.05c.04-.02,.08-.05,.12-.08,.05-.03,.1-.07,.14-.11,.04-.04,.08-.08,.11-.13,1-1.19,.03-3.14-3.11-6.29Zm-1.42,1.42c1.98,1.97,2.61,3.03,2.8,3.5-.75-.15-2.37-.98-3.85-2.45-1.47-1.47-2.3-3.1-2.45-3.85,.47,.19,1.53,.82,3.5,2.8Zm-6.71,6.71l2.26-6.78c.56,.93,1.28,1.83,1.99,2.53,.71,.71,1.6,1.43,2.53,1.99l-6.78,2.26Z"></path></g><path d="M19.71,5.71l-2,2c-.2,.19-.45,.29-.71,.29s-.51-.1-.71-.29c-.39-.39-.39-1.03,0-1.42l2-2c.39-.39,1.03-.39,1.42,0,.39,.39,.39,1.03,0,1.42Z"></path><path d="M18.71,15.71c-.39,.39-1.03,.39-1.42,0-.39-.39-.39-1.03,0-1.42,.39-.39,1.03-.39,1.42,0,.39,.39,.39,1.03,0,1.42Z"></path><path d="M8.71,6.71c-.39,.39-1.03,.39-1.42,0-.39-.39-.39-1.03,0-1.42,.39-.39,1.03-.39,1.42,0,.39,.39,.39,1.03,0,1.42Z"></path><circle r="1" cy="9" cx="14"></circle><path d="M22,11c0,.55-.45,1-1,1h-2c-.55,0-1-.45-1-1s.45-1,1-1h2c.55,0,1,.45,1,1Z"></path><path d="M14,3v2c0,.55-.45,1-1,1s-1-.45-1-1V3c0-.55,.45-1,1-1s1,.45,1,1Z"></path>
                    </svg>
                    <span className="text-sm sm:text-sm">
                      BEST LEARNING DAY
                    </span>
                  </div>
                  <div className="sm:text-xl font-bold">
                    21st Jul | 4 Hrs 10 mins
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Chart */}
            <Card className="flex-grow">
              <CardContent className="p-4">
                <div className="text-slate-500 text-sm mb-4">
                  AVERAGE NUMBER OF HOURS YOU LEARN ON DAYS OF THE WEEK
                </div>

                {/* Scrollable container on mobile */}
                <div className="flex items-end justify-between h-[200px] py-2 ">
                  {Object.entries(learningData.weeklyAverage).map(
                    ([day, minutes]) => (
                      <div
                        key={day}
                        className="flex flex-col items-center min-w-[30px] sm:min-w-0 mx-1"
                      >
                        <div className="text-xs text-slate-500 mb-1">
                          {minutes} min
                        </div>
                        <div
                          className="min-w-9 max-w-10 sm:w-12 bg-[#13C4CC] rounded-t-md relative group"
                          style={{ height: `${(minutes / 120) * 150}px` }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {day}: {minutes} Min
                          </div>
                        </div>
                        <div className="text-center text-slate-500 text-xs sm:text-sm mt-2">
                          {day}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Image src="https://i.ibb.co/VWVQ75sL/best-day.webp" width={20} height={20} alt="Best Day" />
                    <div>
                      <strong>Fridays</strong> are your best day
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Image src="https://i.ibb.co/tpdkmHQ1/study-least.webp" width={20} height={20} alt="Study Least" />
                    <div>
                      <strong>Thursday</strong> you study the least
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-[#f0f7ff] rounded-xl p-4 mt-8">
        <div className="flex items-center gap-2 mb-6">
          
          <Image src="https://i.ibb.co/21zYqMN1/goals-and-achievements.webp" alt="" width={25} height={25} />
          <h2 className="text-xl font-semibold">
            Goals and Achievements in{" "}
            <span className="text-slate-500">December</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Badges Section */}
          <div className="flex-1 bg-white rounded-xl p-5">
            <p className="mb-4">
              YOU EARNED{" "}
              <span className="text-[#13C4CC] font-bold">ONE BADGE</span>
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                  0
                </div>
                <p className="font-semibold mb-1">Gold</p>
                <p className="text-xs text-slate-500">
                  Learn 3 days in a week to earn Gold
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                  0
                </div>
                <p className="font-semibold mb-1">Silver</p>
                <p className="text-xs text-slate-500">
                  Learn 2 days in a week to earn Silver
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 border-2 border-dashed border-[#cd7f32] bg-[rgba(205,127,50,0.1)] rounded-full flex items-center justify-center text-2xl mx-auto mb-2">
                  1
                </div>
                <p className="font-semibold mb-1">Bronze</p>
                <p className="text-xs text-slate-500">
                  Learn 1 day in a week to earn Bronze
                </p>
              </div>
            </div>
          </div>

          {/* Stats Widgets */}
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 relative">
              <div className="absolute top-5 right-5">
                <Image src="https://i.ibb.co/SDNYwSSN/courses-completed.webp" alt="" width={25} height={25} />
              </div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-xs sm:textsm  text-slate-500">
                COURSES YOU COMPLETED
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 relative">
              <div className="absolute top-5 right-5">
                <Image src="https://i.ibb.co/C3kVRK7n/certs-claimed.webp" alt="" width={25} height={25} />
              </div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-xs sm:textsm  text-slate-500">
              CERTIFICATES YOU CLAIMED
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 relative">
              <div className="absolute top-5 right-5">
                <Image src="https://i.ibb.co/cX1J89rf/courses-in-progress.webp" alt="" width={25} height={25} />
              </div>
              <div className="text-3xl font-bold mb-2">1</div>
              <div className="text-xs sm:textsm  text-slate-500">
              COURSES IN PROGRESS
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 relative">
              <div className="absolute top-5 right-5">
                <Image src="https://i.ibb.co/dw6nRr0P/up5.png" alt="" width={50} height={50} />
              </div>
              <div className="text-3xl font-bold mb-2">0</div>
              <div className="text-xs sm:textsm  text-slate-500">
              AVERAGE COURSE ASSESSMENT SCORE
              </div>
            </div>
            
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <p>Keep learning and add more achievements!</p>
          <Button className="bg-[#13C4CC] hover:bg-[#11b3bb]">
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
}
