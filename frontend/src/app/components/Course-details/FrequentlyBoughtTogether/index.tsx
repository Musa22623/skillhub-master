/** @format */

import {default as DesktopFrequentlyBoughtTogether} from './Desktop';
import {default as MobileFrequentlyBoughtTogether} from './Mobile';

const FrequentlyBoughtTogether = () => {
  return (
    <div>
      <div className='flex flex-col max-sm:hidden'>
        <DesktopFrequentlyBoughtTogether />
      </div>
      <div className='min-sm:hidden flex flex-col'>
        <MobileFrequentlyBoughtTogether />
      </div>
    </div>
  );
};
export default FrequentlyBoughtTogether;
