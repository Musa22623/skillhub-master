/** @format */

import {default as DesktopInstructorProfile} from './Desktop';
import {default as MobileInstructorProfile} from './Mobile';

const InstructorProfile = () => {
  return (
    <div className='mt-6'>
      <div className='flex flex-col max-sm:hidden'>
        <DesktopInstructorProfile />
      </div>
      <div className='min-sm:hidden flex flex-col'>
        <MobileInstructorProfile />
      </div>
    </div>
  );
};
export default InstructorProfile;
