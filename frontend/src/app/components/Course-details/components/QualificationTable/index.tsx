/** @format */

import {default as DesktopQualification} from './Desktop';
import {default as MobileQualification} from './Mobile';

const CourseQualification = () => {
  return (
    <div>
      <div className='flex flex-col max-sm:hidden'>
        <DesktopQualification />
      </div>
      <div className='min-sm:hidden flex flex-col'>
        <MobileQualification />
      </div>
    </div>
  );
};
export default CourseQualification;
