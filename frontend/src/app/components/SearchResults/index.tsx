/** @format */

import {useIsMobile} from '@/hooks/use-mobile';
import {default as DesktopSearchResults} from './Desktop';
import {default as MobileSearchResults} from './Mobile';

const SearchResults = () => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className='min-sm:hidden flex flex-col'>
				<MobileSearchResults />
			</div>
		);
	} else {
		return (
			<div className='flex flex-col max-sm:hidden'>
				<DesktopSearchResults />
			</div>
		);
	}
};
export default SearchResults;
