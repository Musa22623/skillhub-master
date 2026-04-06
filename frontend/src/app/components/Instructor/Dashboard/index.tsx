'use client';
import StatsGrid from "./components/StatsGrid";
import OverallSales from "./components/OverallSales";
import UpcommingEvents from "./components/UpcommingEvents";
import RecentActivity from "./components/RecentActivity";
import RecentSales from "./components/RecentSales";

const DashboardInstructor = () => {
  return (
    <div className="max-sm:bg-background max-sm:p-2 max-sm:overflow-x-hidden max-xs:mb-17">
      <h2 className="text-[1.125rem] xs:text-[1.25rem] font-semibold text-[#1E293B] mb-[1.5rem]">
        Here&apos;s what happening
      </h2>
      {/* stats grid */}
      <div className="mb-[1.5rem]">
        <StatsGrid />
      </div>
      {/* overall sales & upcomming events */}
      <div className="mb-[1.5rem]">
        <div className="grid grid-cols-1 md:grid-cols-10">
          <div className="col-span-1 md:col-span-7">
            <OverallSales />
          </div>
          <div className="col-span-1 md:col-span-3">
            <UpcommingEvents />
          </div>
        </div>
      </div>
      {/* recent activities */}
      <div className="mb-[1.5rem]">
        <RecentActivity />
      </div>
      {/* recent sales */}
      <div>
        <RecentSales />
      </div>
    </div>
  );
};

export default DashboardInstructor;
