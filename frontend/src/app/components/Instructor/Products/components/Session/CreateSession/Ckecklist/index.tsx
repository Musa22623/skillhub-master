import {useIsMobile} from '@/hooks/use-mobile';
import MobileSession from "./mobile";
import DesktopSession from "./Dasktop"
 
const CheckList = () => {
  const isMobile = useIsMobile();
 
  if (isMobile) {
    return (
      <div className='min-sm:hidden flex flex-col'>
        <MobileSession />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col max-sm:hidden'>
        <DesktopSession />
      </div>
    );
  }
 
};
export default CheckList;

// {
//     open,
//     setOpen,
//   }: {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   }