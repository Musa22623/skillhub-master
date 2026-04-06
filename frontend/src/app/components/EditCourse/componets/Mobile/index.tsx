/** @format */

'use client';
import React, {useState} from 'react';
import Image from 'next/image';
import {ChevronDown,EyeIcon} from 'lucide-react';
import Outline from '../Outline';
import Setting from '../Setting';
import {Button} from '@/app/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/app/components/ui/tabs';
import myImage from '@/assets/img5.jpg';
import CheckList from '../Ckecklist';
import Landing from '../Landing';
import Pricing from '../Pricing';
import {Drawer, DrawerContent, DrawerHeader} from '@/app/components/ui/drawer';
import { CircleHelpIcon } from '@/app/components/svg';

interface EditCourseModalProps {
	open: boolean;
	onClose: () => void;
}
export default function EditMobileCourse({
	open,
	onClose,
}: EditCourseModalProps) {
	const [activeTab, setActiveTab] = useState('landing');

	// Render content based on active tab
	const renderTabContent = () => {
		switch (activeTab) {
			case 'outline':
				return <Outline />;
			case 'Setting':
				return <Setting />;
			case 'landing':
				return <Landing />;
			case 'pricing':
				return <Pricing />;
			case 'checklist':
				return (
					<div>
						<CheckList />
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<Drawer open={open} onOpenChange={() => onClose()}>
			<DrawerContent className='h-full overflow-hidden'>
				<div className='overflow-hidden'>
					{/* Header */}
					<DrawerHeader className='flex  justify-between w-full   p-0 pt-4'>
						<div className='flex gap-3 px-4'>
							<div className='max-xs:size-12 xs:h-18 xs:w-30 xs:overflow-hidden rounded-md'>
								<Image
									src={myImage}
									alt='UX Design Hub'
									width={120}
									height={72}
									className='object-cover rounded-md'
								/>
							</div>

							<div className='flex gap-1 h-fit items-center'>
								<h2 className='text-base xs:text-xl font-semibold text-[#1a1a1a]'>
									UX Design Hub
								</h2>
										 <CircleHelpIcon className="h-5 w-5 fill-gray-500 hover:fill-black" />
							</div>
						</div>
						<div className='hidden xs:flex items-center gap-2 '>
							<div className='flex items-center gap-1 rounded-md border px-3 py-1'>
								<EyeIcon className='size-5 text-black ' />
								<span className='text-sm'>Preview</span>
								<ChevronDown className='h-4 w-4 text-muted-foreground' />
							</div>
							<Button size='sm' className='px-6'>
								Save
							</Button>
						</div>

						{/* Below section for Tabs */}
						<div className='w-full mx-auto max-xs:px-3 xs:px-33 border-b overflow-y-auto'>
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className='w-full  xs:-mt-12 max-sm:overflow-x-auto no-scrollbar'
							>
								<TabsList className='bg-transparent gap-6'>
									<TabsTrigger
										value='outline'
										className='text-[#333] rounded-none px-0 py-2 data-[state=active]:text-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
									>
										Outline
									</TabsTrigger>

									<TabsTrigger
										value='Setting'
										className='text-[#333] rounded-none px-0 py-2 data-[state=active]:text-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
									>
										Settings
									</TabsTrigger>
									<TabsTrigger
										value='landing'
										className='text-[#333] rounded-none px-0 py-2 data-[state=active]:text-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
									>
										Landing Page
									</TabsTrigger>
									<TabsTrigger
										value='pricing'
										className='text-[#333] rounded-none px-0 py-2 data-[state=active]:text-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
									>
										Pricing
									</TabsTrigger>
									<TabsTrigger
										value='checklist'
										className='text-[#333] rounded-none px-0 py-2 data-[state=active]:text-teal-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary'
									>
										Checklist
									</TabsTrigger>
								</TabsList>
							</Tabs>
						</div>
					</DrawerHeader>
				</div>

				{/* Render the tab content */}
				<div className='flex-1 overflow-y-auto overflow-x-hidden h-full '>
					{renderTabContent()}
				</div>
				{/* Footer Save Button */}
			</DrawerContent>
		</Drawer>
	);
}
