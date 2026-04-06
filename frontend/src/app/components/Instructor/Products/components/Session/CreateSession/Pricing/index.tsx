/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import MobilePricing from './Mobile';
import DesktopPricing from './Desktop';


const Pricing = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobilePricing />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopPricing/>
			</div>
		);
	}
};
export default Pricing;
