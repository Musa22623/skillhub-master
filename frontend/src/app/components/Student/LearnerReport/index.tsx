import LearningDashboard from "./components/LearningDashboard";
import ContentInProgress from "./components/ContentInProgress";

const DashboardInstructor = () => {
  return (
    <>
      <div className="mb-[1.5rem]">
        {/* LearningDashboard  */}
        <LearningDashboard />
      </div>
      <div className="mb-[1.5rem]">
        {/* LearningDashboard  */}
        <ContentInProgress />
      </div>
    </>
  );
};

export default DashboardInstructor;
