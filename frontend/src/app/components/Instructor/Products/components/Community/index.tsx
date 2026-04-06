/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import {default as DesktopCreateCommunity} from './Desktop';
import {default as MobileCreateCommunity} from './Mobile';

const CreateCommunity = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className='min-sm:hidden flex flex-col'>
        <MobileCreateCommunity open={open} setOpen={setOpen} />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col max-sm:hidden'>
        <DesktopCreateCommunity open={open} setOpen={setOpen} />
      </div>
    );
  }

};
export default CreateCommunity;
