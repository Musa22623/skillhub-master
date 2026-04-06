/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import {default as DesktopEditSession} from './Desktop';
import {default as MobileEditSession} from './Mobile';

const EditSession = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobileEditSession />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopEditSession/>
			</div>
		);
	}

};
export default EditSession;
