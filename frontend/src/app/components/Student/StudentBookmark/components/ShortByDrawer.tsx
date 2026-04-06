/** @format */

import { Button } from '@/app/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import { X } from 'lucide-react';
import {Dispatch, SetStateAction} from 'react';

interface ShortByDrawerProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const ShortByDrawer = ({isOpen, setIsOpen}: ShortByDrawerProps) => {
	return (
		<>
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerContent>
					<DrawerHeader className='flex-row items-center justify-between border-b'>
						<DrawerTitle>Short By</DrawerTitle>
            <Button onClick={() => setIsOpen(false)} variant={'secondary'} size={'default'} className='w-fit'>
              <X className='size-4'/>
            </Button>
					</DrawerHeader>

					<ul className='space-y-4 px-8 font-semibold font-sm my-5'>
						<li>Recently Added</li>
						<li>Most Popular</li>
						<li>Highest Rated</li>
					</ul>
				</DrawerContent>
			</Drawer>
		</>
	);
};
export default ShortByDrawer;
