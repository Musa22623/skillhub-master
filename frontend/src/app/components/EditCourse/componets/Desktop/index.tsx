/** @format */

'use client';
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import React, {useState} from 'react';
import Image from 'next/image';
import {ChevronDown, EyeIcon} from 'lucide-react';
import Outline from '../Outline';
import Setting from '../Setting';
import {Button} from '@/app/components/ui/button';
import {Tabs, TabsList, TabsTrigger} from '@/app/components/ui/tabs';
import myImage from '@/assets/img5.jpg';
import CheckList from '../Ckecklist';
import Landing from '../Landing';
import Pricing from '../Pricing';
import { CircleHelpIcon } from "@/app/components/svg";

interface EditCourseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateCourseEdit({
  onClose,

}: EditCourseModalProps) {
  const [activeTab, setActiveTab] = useState('landing');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isOpen, setIsOpen] = useState(true);
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
		  <Dialog
	  open={isOpen}
	  onOpenChange={() =>  onClose()}
    >
      <DialogContent
        closeButtonClassName="top-0 right-6 shadow-lg -mt-4 z-100 size-8 bg-white rounded-full opacity-100 flex items-center justify-center"
        className="bg-gray-100 mt-5 sm:max-w-[100%] mx-auto p-0 gap-0 h-[100vh] max-h-[100vh] rounded-none flex flex-col px-4 xl:px-0"
      >
		<div className='max-w-6xl mx-auto w-full h-full no-scrollbar'>
			<div className='max-w-6xl xs:mx-auto w-full max-xs:fixed left-0 top-16 max-xs:border-t max-xs:bg-white z-10'>
				<div className='flex flex-col max-xs:px-3 max-xs:pt-4 xs:py-4'>
					{/* Header */}
					<div className='flex items-center justify-between w-full mx-auto xs:pt-8 '>
						<div className='flex gap-3 max-xs:items-center'>
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
					</div>
				</div>

				{/* Below section for Tabs */}
				<div className='w-full mx-auto max-xs:px-3 xs:px-33 border-b '>
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
			</div>

			{/* Render the tab content */}
		 <div className="flex-1 overflow-y-auto overflow-x-hidden h-full no-scrollbar pb-48">{renderTabContent()}</div>

			{/* Footer Save Button */}
		</div>
		</DialogContent>
			</Dialog>
	);
};


