/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import DesktopLanding from './Desktop';
import MobileLanding from './Mobile';

const Landing = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobileLanding />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopLanding />
			</div>
		);
	}
};
export default Landing;
