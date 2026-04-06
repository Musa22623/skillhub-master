/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import DesktopSetting from './Desktop';
import MobileSetting from './Mobile';

const Setting = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobileSetting />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopSetting />
			</div>
		);
	}
};
export default Setting;
