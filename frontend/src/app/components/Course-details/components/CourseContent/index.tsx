/** @format */

import {default as DesktopCourseContent} from './Desktop';
import {default as MobileCourseContent} from './Mobile';

const CourseContent = () => {
	return (
		<div>
			<div className='flex flex-col max-sm:hidden'>
				<DesktopCourseContent />
			</div>
			<div className='min-sm:hidden flex flex-col'>
				<MobileCourseContent />
			</div>
		</div>
	);
};
export default CourseContent;
