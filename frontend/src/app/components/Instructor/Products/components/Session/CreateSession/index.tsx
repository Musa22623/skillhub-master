/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import {default as DesktopCreateSession} from './Desktop';
import {default as MobileCreateSession} from './Mobile';

const CreateSession = ({
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
				<MobileCreateSession open={open} setOpen={setOpen} />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopCreateSession open={open} setOpen={setOpen} />
			</div>
		);
	}

};
export default CreateSession;
