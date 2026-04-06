/** @format */

import {default as DesktopCourseReviews} from './Desktop';
import {default as MobileCourseReviews} from './Mobile';

const CourseReviews = () => {
  return (
    <div className=''>
      <div className='flex flex-col max-sm:hidden'>
        <DesktopCourseReviews />
      </div>
      <div className='min-sm:hidden flex flex-col'>
        <MobileCourseReviews />
      </div>
    </div>
  );
};
export default CourseReviews;
