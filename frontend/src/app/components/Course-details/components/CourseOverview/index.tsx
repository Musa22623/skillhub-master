/** @format */

import {default as DesktopOverview} from './Desktop';
import {default as MobileOverview} from './Mobile';

const CourseOverview = () => {
	return (
		<div>
			<div className='flex flex-col max-sm:hidden'>
				<DesktopOverview />
			</div>
			<div className='min-sm:hidden flex flex-col'>
				<MobileOverview />
			</div>
		</div>
	);
};
export default CourseOverview;
