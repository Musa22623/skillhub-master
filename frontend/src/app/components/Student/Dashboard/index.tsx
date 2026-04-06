import StatsGrid from "./components/StatsGrid";
import ContetnInProgress from "./components/ContetnInProgress";
import Certificates from "./components/Certificates";
import AchievementsAndCalendar from "./components/AchievementsAndCalendar";
import StudyReminders from "./components/StudyReminders";


const DashboardInstructor = () => {
  return (
    <div className="max-xs:bg-white max-xs:rounded-md mb-20">
      <h2 className=" text-[1.25rem] font-semibold text-[#262b3d] xs:mb-[1.5rem] max-xs:ml-4 max-xs:pt-4">
        Here&apos;s what happening
      </h2>
      {/* stats grid */}
      <div className="mb-[1.5rem]">
        <StatsGrid />
      </div>
      {/* Content In Progress  */}
      <div className="mb-[1.5rem]">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <ContetnInProgress />
          </div>
        </div>
      </div>
      {/* Certificates */}
      <div className="mb-[1.5rem]">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <Certificates />
          </div>
        </div>
      </div>
      {/* Achievements & Badges */}
      <div className="mb-[1.5rem]">
        < AchievementsAndCalendar />
      </div>
      {/* Study Reminders */}
      <div className="" >
        <StudyReminders />
      </div>
     
    </div>
  );
};

export default DashboardInstructor;
