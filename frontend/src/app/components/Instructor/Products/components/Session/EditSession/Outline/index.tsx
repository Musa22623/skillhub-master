/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import DesktopOutline from './Desktop';
import MobileOutline from './Mobile';

const Outline = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobileOutline />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopOutline />
			</div>
		);
	}
};
export default Outline;
