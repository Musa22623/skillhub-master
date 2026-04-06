/** @format */

import {default as DesktopStudentAlsoBought} from './Desktop';
import {default as MobileStudentAlsoBought} from './Mobile';

const StudentsAlsoBought = () => {
  return (
    <div>
      <div className='flex flex-col max-sm:hidden'>
        <DesktopStudentAlsoBought />
      </div>
      <div className='min-sm:hidden flex flex-col'>
        <MobileStudentAlsoBought />
      </div>
    </div>
  );
};
export default StudentsAlsoBought;
