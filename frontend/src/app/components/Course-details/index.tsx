/** @format */

'use client';

import CourseContent from './components/CourseContent';
import CourseHeader from './components/CourseHeader';
import CourseOverview from './components/CourseOverview';
import CourseReviews from './components/CourseReviews';
import InstructorProfile from './components/InstructorProfile';
import QualificationsTable from './components/QualificationTable';
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';
import StudentsAlsoBought from './StudentAlsoBought';


export default function CourseDetails() {
	return (
		<div className='relative sm:space-y-6 max-sm:mb-20'>
			<CourseHeader />
			<div className='max-w-[525px] lg:max-w-[600px] xl:max-w-[670px] 2xl:max-w-[720px] sm:space-y-6'>
				<CourseOverview />

				<CourseContent />

				<QualificationsTable />

				<div className='hidden sm:block space-y-6'>
					<FrequentlyBoughtTogether />

					<StudentsAlsoBought />

					<InstructorProfile />

					<CourseReviews />
				</div>

				<div className='block sm:hidden space-y-6'>
					<InstructorProfile />
					<CourseReviews />
					<StudentsAlsoBought />
					<FrequentlyBoughtTogether />
				</div>
			</div>
		</div>
	);
}
