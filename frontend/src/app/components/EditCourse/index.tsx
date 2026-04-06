// /** @format */

// import {useIsMobile} from '@/hooks/use-mobile';

// import CreateCourseEdit from './componets/Desktop';
// import EditMobileCourse from './componets/Mobile';

// const EditCourse = () => {
// 	const isMobile = useIsMobile();

// 	if (isMobile) {
// 		return (
// 			<div className='min-sm:hidden flex flex-col'>
// 				<EditMobileCourse open={true} onClose={() => {}} />
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className='flex flex-col max-sm:hidden'>
// 				<CreateCourseEdit open={true} onClose={() => {}} />


					
					
// 			</div>
// 		);
// 	}

// };
// export default EditCourse;





import { useIsMobile } from "@/hooks/use-mobile";
import EditMobileCourse from "./componets/Mobile";
import CreateCourseEdit from "./componets/Desktop";



const EditCourse = ({
  open,
  setOpen
 
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
	return (
	  <div className="min-sm:hidden flex flex-col">
		<EditMobileCourse open={open} onClose={() => setOpen(false)} />
	  </div>
	);
  } else {
	return (
	  <div className="flex flex-col max-sm:hidden">
		<CreateCourseEdit
		  open={open}
		  onClose={() =>setOpen(false)}
		/>
	  </div>
	);
  }
};
export default EditCourse;

