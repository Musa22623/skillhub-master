/** @format */

import React, {useState} from 'react';
import MenuItem from './MenuItem';
import {PRODUCT_CREATE_MENU_ITEMS} from '@/constants';
import CourseDrawer from '../Courses/CreateCourse';
import CreateSchoolForm from '@/app/components/School/CreateSchool';

interface CreateMenuProps {
	open: boolean;
	setOpen: (value: boolean) => void;
}

type IMenuItem = {
	icon: React.ReactNode;
	title: string;
	id: string;
};

const CreateMenu: React.FC<CreateMenuProps> = ({open, setOpen}) => {
	// State to track which modal to show
	const [activeModal, setActiveModal] = useState<string | null>(null);

	const menuRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setOpen]);

	const handleItemClick = (itemId: string) => {
		// Open the modal for the selected item
		setActiveModal(itemId);
	};

	// Function to close the active modal
	const handleCloseModal = () => {
		setActiveModal(null);
	};

	return (
		<>
			<div
				ref={menuRef}
				className={`z-2 absolute top-full right-0 bg-white rounded-lg py-2 px-0 mt-2 min-w-[200px] opacity-0 invisible shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ${
					open ? 'visible opacity-100' : ''
				}`}
			>
				{PRODUCT_CREATE_MENU_ITEMS.map((item: IMenuItem, index: number) => (
					<MenuItem
						icon={item.icon}
						title={item.title}
						onClick={() => handleItemClick(item.id)}
						key={index}
					/>
				))}
			</div>

			{activeModal === 'school' && (
				<div className='flex text-start text-black'>
					<CreateSchoolForm onClose={handleCloseModal} />
				</div>
			)}

			{activeModal === 'course' && (
				<CourseDrawer onClose={handleCloseModal}/>
			)}

			{/*{activeModal === 'bundle' && (
					<CreateBundleForm onClose={handleCloseModal} />
			)} */}
		</>
	);
};

export default CreateMenu;
