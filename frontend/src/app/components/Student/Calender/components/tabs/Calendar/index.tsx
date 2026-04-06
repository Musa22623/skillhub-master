/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import {default as CalenderDesktop} from './Desktop';
import {default as CalenderMobile} from './Mobile';

const Calender = ({}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='min-sm:hidden flex flex-col'>
        <CalenderMobile/>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col max-sm:hidden'>
        <CalenderDesktop />
      </div>
    );
  }

};
export default Calender;
