"use client";
import Calendar from "@/app/components/Calender/studentcalender";
import { CertificatesSVGNEW, TrophySVG } from "@/app/components/svg";

interface AchievementProps {
  title: string;
  description: string;
  
  iconColor: string;
}
const AchievementCard: React.FC<AchievementProps> = ({ title, description, iconColor }) => (
  <div className="text-center p-4 xs:p-[20px] border-[1px]  border-[#e2e8f0] rounded-[12px] bg-[#fff] [transition:transform_.2s] relative overflow-hidden">
    {/* Icon */}
    <div className="relative w-[120px] h-[120px] mt-[0] mx-[auto] mb-[16px]">
      <span className={`w-10 h-10 ${iconColor}`}>
      <TrophySVG />
      </span>
    </div>

    {/* Achievement Title */}
    <h3 className="text-lg font-semibold text-[#262b3d]">{title}</h3>

    {/* Description */}
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// Achievements Data
const achievements = [
  {
    id: 1,
    title: "Master Learner",
    description: "Completed 10 courses with distinction",
  
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Engagement Pro",
    description: "Participated in 50+ learning activities",
    
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Milestone Achiever",
    description: "Reached all quarterly learning goals",
    
    iconColor: "text-yellow-600",
  },
];

export default function AchievementsAndCalendar() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-10 xs:gap-6 ">
      {/* Achievements Section (7 columns) */}
      <div className="xs:col-span-7 col-span-full bg-white shadow-lg rounded-xl p-6 border border-gray-200 xs:pb-15">
        <div className="flex items-center gap-3 mb-6 text-gray-900">
          <CertificatesSVGNEW />
          <h1 className="text-2xl font-bold text-[#262b3d]">Achievements & Badges</h1>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-1 md:grid-cols-3 max-xs:my-4 gap-4">
          {achievements.slice(0,2).map((achieve) => (
            <AchievementCard
              key={achieve.id}
              title={achieve.title}
              description={achieve.description}
             
              iconColor={achieve.iconColor}
            />
          ))}
        </div>
      </div>

      {/* Calendar Section (3 columns) */}
      <div className="col-span-3 bg-white shadow-sm max-xs:my-4 rounded-xl p-6">
        <Calendar />
      </div>
    </div>
  );
}
