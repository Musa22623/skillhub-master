/** @format */

import React, {useState} from 'react';
import {Clock, Users, BookOpen, X} from 'lucide-react';
import Image, {StaticImageData} from 'next/image';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
import {useIsMobile} from '@/hooks/use-mobile';
import {
	Drawer,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {Button} from '@/app/components/ui/button';

interface Product {
	title: string;
	image: string | StaticImageData;
	level: string;
	type: 'course' | 'session';
	duration: string;
	students: string;
	units: string;
}

interface PaymentPlan {
	name: string;
	details: string;
}

interface BundlePopupProps {
	isOpen: boolean;
	onClose: React.Dispatch<React.SetStateAction<boolean>>;
	bundleTitle: string;
	bundleImage: string | StaticImageData;
	products: Product[];
	paymentPlans: PaymentPlan[];
}

export const BundlePopup: React.FC<BundlePopupProps> = ({
	isOpen,
	onClose,
	bundleTitle,
	bundleImage,
	products,
	paymentPlans,
}) => {

	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={onClose}>
				<DrawerContent className='w-full min-h-[90vh] '>
					<DrawerHeader className='border-b flex-row px-4 justify-between border-gray-200 flex gap-4'>
						<div className='flex gap-4'>
							<Image
								src={bundleImage}
								width={80}
								height={80}
								alt='Bundle cover'
								className='w-20 h-20 rounded-xl object-cover'
							/>
							<div>
								<DrawerTitle className='font-semibold line-clamp-2 text-gray-900 mb-2 font-inter'>
									{' '}
									{bundleTitle}
								</DrawerTitle>
								<div className='px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-xs inline-flex items-center gap-1.5'>
									<svg
										height='14'
										width='14'
										fill='none'
										viewBox='0 0 24 24'
										className='text-gray-800'
									>
										<path
											fill='currentColor'
											d='M3 1h18a3 3 0 0 1 3 3v8H2v5a1 1 0 0 0 1 1h7v2H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3ZM2 4v2h20V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm11.8 10.81a2.7 2.7 0 0 1 4.2.43 2.7 2.7 0 0 1 4.2-.43 2.8 2.8 0 0 1 0 3.92L18 23l-4.2-4.27a2.8 2.8 0 0 1 0-3.92Z'
											clipRule='evenodd'
											fillRule='evenodd'
										/>
									</svg>
									{products.length} Products
								</div>
							</div>
						</div>
						<Button
							variant={'outline'}
							onClick={() => onClose(false)}
							className='rounded-full size-8'
						>
							<X className='size-4' />
						</Button>
					</DrawerHeader>

					{/* Products Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto px-4 no-scrollbar py-4'>
						{products.map((product, index) => (
							<ProductCard key={index} product={product} />
						))}
					</div>

					<DrawerFooter className='border-t border-gray-200 bg-gray-50 rounded-b-xl p-2'>
						<div className='flex w-full gap-2 justify-between'>
							{paymentPlans.map((plan, index) => (
								<div
									key={index}
									className='bg-white p-2 rounded-xl text-xs border border-gray-200'
								>
									<div className='font-semibold text-gray-900 mb-1 text-xs'>
										{plan.name}
									</div>
									<div className='text-gray-600 text-xs'>{plan.details}</div>
								</div>
							))}
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className='w-full min-w-5xl max-h-[95vh] p-0'>
					<DialogHeader className='border-b border-gray-200 flex gap-5 p-4'>
						<div className='flex gap-6'>
							<Image
								src={bundleImage}
								width={80}
								height={80}
								alt='Bundle cover'
								className='w-20 h-20 rounded-xl object-cover'
							/>
							<div>
								<DialogTitle className='text-2xl font-semibold text-gray-900 mb-2 font-inter'>
									{' '}
									{bundleTitle}
								</DialogTitle>
								<div className='px-3 py-1 rounded-full bg-gray-200 text-gray-800 font-semibold text-xs inline-flex items-center gap-1.5'>
									<svg
										height='14'
										width='14'
										fill='none'
										viewBox='0 0 24 24'
										className='text-gray-800'
									>
										<path
											fill='currentColor'
											d='M3 1h18a3 3 0 0 1 3 3v8H2v5a1 1 0 0 0 1 1h7v2H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3ZM2 4v2h20V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm11.8 10.81a2.7 2.7 0 0 1 4.2.43 2.7 2.7 0 0 1 4.2-.43 2.8 2.8 0 0 1 0 3.92L18 23l-4.2-4.27a2.8 2.8 0 0 1 0-3.92Z'
											clipRule='evenodd'
											fillRule='evenodd'
										/>
									</svg>
									{products.length} Products
								</div>
							</div>
						</div>
					</DialogHeader>

					{/* Products Grid */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto px-4'>
						{products.map((product, index) => (
							<ProductCard key={index} product={product} />
						))}
					</div>

					<DialogFooter className='border-t border-gray-200 bg-gray-50 rounded-b-xl p-4'>
						<div className='flex w-full justify-between'>
							{paymentPlans.map((plan, index) => (
								<div
									key={index}
									className='bg-white p-4 rounded-xl border border-gray-200'
								>
									<div className='font-semibold text-gray-900 mb-1 text-sm'>
										{plan.name}
									</div>
									<div className='text-gray-600 text-xs'>{plan.details}</div>
								</div>
							))}
						</div>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}
};

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
	return (
		<div className='flex gap-4 p-4 border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'>
			<Image
				src={product.image}
				alt={product.title}
				width={64}
				height={48}
				className='w-16 h-12 rounded-lg object-cover'
			/>
			<div className='flex-1'>
				<h3 className='font-semibold text-[#13C4CC] text-sm mb-1'>
					{product.title}
				</h3>

				<div className='flex flex-col gap-2 mb-2'>
					<span className='font-semibold text-gray-900 text-xs'>
						{product.level}
					</span>
					<div
						className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold w-fit ${
							product.type === 'course'
								? 'bg-blue-100 text-blue-800'
								: 'bg-red-100 text-red-800'
						}`}
					>
						{product.type === 'course' ? (
							<>
								<svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.571183.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
								Course
							</>
						) : (
							<>
								<svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24'>
									<path
										fill='currentColor'
										d='M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z'
										clipRule='evenodd'
										fillRule='evenodd'
									/>
								</svg>
								1:1 Session
							</>
						)}
					</div>
				</div>
				<div className='flex gap-4 mt-3'>
					<StatItem
						icon={<Clock size={16} />}
						value={product.duration}
						tooltip='Course Duration'
					/>
					<StatItem
						icon={<Users size={16} />}
						value={product.students}
						tooltip='Total Students'
					/>
					<StatItem
						icon={<BookOpen size={16} />}
						value={product.units}
						tooltip={`${product.units} Learning Units`}
					/>
				</div>
			</div>
		</div>
	);
};

interface StatItemProps {
	icon: React.ReactNode;
	value: string;
	tooltip: string;
}

const StatItem: React.FC<StatItemProps> = ({icon, value, tooltip}) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	return (
		<div
			className='relative flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer group'
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			{icon}
			<span className='font-semibold text-gray-900'>{value}</span>
			{showTooltip && (
				<div className='absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap mb-2 z-10'>
					{tooltip}
					<div className='absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800'></div>
				</div>
			)}
		</div>
	);
};
