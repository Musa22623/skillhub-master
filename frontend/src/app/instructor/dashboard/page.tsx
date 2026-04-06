'use client';
import dynamic from 'next/dynamic';
const DashboardInstructor = dynamic(() => import('@/app/components/Instructor/Dashboard'), { ssr: false });

const InstructorDashboardPage = () => {
  return <DashboardInstructor />;
};

export default InstructorDashboardPage;
