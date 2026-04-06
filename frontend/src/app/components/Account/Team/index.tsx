/** @format */

import {default as DesktopTeamPage} from './Desktop';
import {default as MobileTeamPage} from './Mobile';

const TeamPage = () => {
	return (
		<div>
			<div className='flex flex-col gap-4 max-xs:hidden'>
				<DesktopTeamPage />
			</div>
			<div className='min-xs:hidden flex flex-col gap-1 max-xs:gap-3'>
				<MobileTeamPage />
			</div>
		</div>
	);
};

export default TeamPage;
