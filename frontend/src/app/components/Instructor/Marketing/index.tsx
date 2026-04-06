import StatsGrid from "./components/StatsGrid";
import DeliveryGrid from "./components/DeliveryGrid";
import EmailMarketing from "./components/EmailMarketing";
import OverallSales from "./components/OverallSales";
const DashboardInstructor = () => {
  return (
    <div>
      
      {/* stats grid */}
      <div className="xs:mb-[1.5rem]">
        <StatsGrid />
      </div>
      {/* overall sales & upcomming events */}
      <div className="mb-[1.5rem] ">
        <div className="grid grid-cols-1 md:grid-cols-10">
          <div className="col-span-1 md:col-span-7">
            <OverallSales  />
          </div>
          <div className="col-span-1 md:col-span-3 bg-white rounded-lg overflow-hidden border border-gray-300 p-4 max-md:mt-4 min-md:ml-1">
            <DeliveryGrid />
          </div>
        </div>
      </div>
      {/* recent activities */}
      <div className="mb-[1.5rem]">
        <EmailMarketing />
      </div>

    </div>
  );
};

export default DashboardInstructor;