/** @format */

'use client';
import {useState, useEffect} from 'react';
import {SalesCard} from './SalesCard';

import Image from 'next/image';
import {Check, ChevronLeft, ChevronRight, X} from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/app/components/ui/dialog';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
} from '@/app/components/ui/drawer';
import {useMediaQuery} from '@/app/components/ui/use-media-query';
import {All_SALES_HISTORY_DATA} from '@/constants';
import {useSearchParams, useRouter} from 'next/navigation';

// Define types for our data structure
type PayoutStatus =
	| 'Rejected'
	| 'Paid'
	| 'Requested'
	| 'Not Eligible'
	| 'Pending';
type TransactionStatus = 'Completed' | 'Refunded';
type ProductType =
	| 'Certificate'
	| 'Community'
	| 'Event'
	| 'Subscription'
	| 'Bundle'
	| 'Premium Certificate'
	| 'Course'
	| 'School';

// Define the transaction item type
interface TransactionItem {
	id: string; // Added unique ID for each transaction
	type: ProductType[];
	image: string;
	title: string;
	amount: number;
	status: TransactionStatus;
	payout: PayoutStatus;
	date?: string; // Optional date field for detailed view
	customer?: string; // Optional customer field for detailed view
}

// Define the time period data type

// Centralized data object - added more transactions for pagination demo

// Helper function to get product type icon
const getProductTypeIcon = (type: ProductType) => {
	switch (type) {
		case 'Course':
			return (
				<svg
					className='h-3.5 w-3.5'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<path
						fill='#193cb8'
						d='M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
			);
		case 'Certificate':
			return (
				<svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 32 32'>
					<path
						fill='currentColor'
						d='M6.66667 7.66406C5.75228 7.66406 5 8.41635 5 9.33073V22.6641C5 23.1061 5.17559 23.53 5.48816 23.8426C5.80072 24.1551 6.22464 24.3307 6.66667 24.3307H13.3333C13.8856 24.3307 14.3333 24.7784 14.3333 25.3307C14.3333 25.883 13.8856 26.3307 13.3333 26.3307H6.66667C5.69421 26.3307 4.76157 25.9444 4.07394 25.2568C3.38631 24.5692 3 23.6365 3 22.6641V9.33073C3 7.31178 4.64772 5.66406 6.66667 5.66406H25.3333C26.3058 5.66406 27.2384 6.05037 27.9261 6.738C28.6137 7.42564 29 8.35827 29 9.33073V22.6651C28.9993 23.3081 28.8296 23.9396 28.5078 24.4963C28.186 25.053 27.7235 25.5153 27.1667 25.8368C26.6884 26.1129 26.0768 25.949 25.8006 25.4707C25.5245 24.9924 25.6884 24.3808 26.1667 24.1047C26.4198 23.9586 26.63 23.7484 26.7763 23.4954C26.9226 23.2424 26.9997 22.9553 27 22.663V9.33073C27 8.8887 26.8244 8.46478 26.5118 8.15222C26.1993 7.83966 25.7754 7.66406 25.3333 7.66406H6.66667ZM7 11.9974C7 11.4451 7.44772 10.9974 8 10.9974H24C24.5523 10.9974 25 11.4451 25 11.9974C25 12.5497 24.5523 12.9974 24 12.9974H8C7.44772 12.9974 7 12.5497 7 11.9974ZM7 15.9974C7 15.4451 7.44772 14.9974 8 14.9974H12C12.5523 14.9974 13 15.4451 13 15.9974C13 16.5497 12.5523 16.9974 12 16.9974H8C7.44772 16.9974 7 16.5497 7 15.9974ZM20 16.9974C18.3431 16.9974 17 18.3405 17 19.9974C17 21.6543 18.3431 22.9974 20 22.9974C21.6569 22.9974 23 21.6543 23 19.9974C23 18.3405 21.6569 16.9974 20 16.9974ZM15 19.9974C15 17.236 17.2386 14.9974 20 14.9974C22.7614 14.9974 25 17.236 25 19.9974C25 21.3101 24.4941 22.5047 23.6667 23.3968V29.3307C23.6667 29.7095 23.4527 30.0558 23.1139 30.2252C22.7751 30.3946 22.3697 30.358 22.0667 30.1307L20 28.5807L17.9333 30.1307C17.6303 30.358 17.2249 30.3946 16.8861 30.2252C16.5473 30.0558 16.3333 29.7095 16.3333 29.3307V23.3968C15.5059 22.5047 15 21.3101 15 19.9974ZM18.3333 24.7129V27.3307L19.4 26.5307C19.7556 26.2641 20.2444 26.2641 20.6 26.5307L21.6667 27.3307V24.7129C21.1454 24.8971 20.5844 24.9974 20 24.9974C19.4156 24.9974 18.8546 24.8971 18.3333 24.7129ZM7 19.9974C7 19.4451 7.44772 18.9974 8 18.9974H10.6667C11.219 18.9974 11.6667 19.4451 11.6667 19.9974C11.6667 20.5497 11.219 20.9974 10.6667 20.9974H8C7.44772 20.9974 7 20.5497 7 19.9974Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
			);
		case 'Event':
			return (
				<svg className='h-3.5 w-3.5' fill='none' viewBox='0 0 24 24'>
					<path
						fill='currentColor'
						d='M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
			);
		case 'Premium Certificate':
			return (
				<svg
					viewBox='0 0 32 32'
					fill='currentColor'
					xmlns='http://www.w3.org/2000/svg'
					className='size-6'
				>
					<path
						fill='currentColor            '
						fillRule='evenodd'
						clipRule='evenodd'
						d='M6.66667 7.66406C5.75228 7.66406 5 8.41635 5 9.33073V22.6641C5 23.1061 5.17559 23.53 5.48816 23.8426C5.80072 24.1551 6.22464 24.3307 6.66667 24.3307H13.3333C13.8856 24.3307 14.3333 24.7784 14.3333 25.3307C14.3333 25.883 13.8856 26.3307 13.3333 26.3307H6.66667C5.69421 26.3307 4.76157 25.9444 4.07394 25.2568C3.38631 24.5692 3 23.6365 3 22.6641V9.33073C3 7.31178 4.64772 5.66406 6.66667 5.66406H25.3333C26.3058 5.66406 27.2384 6.05037 27.9261 6.738C28.6137 7.42564 29 8.35827 29 9.33073V22.6651C28.9993 23.3081 28.8296 23.9396 28.5078 24.4963C28.186 25.053 27.7235 25.5153 27.1667 25.8368C26.6884 26.1129 26.0768 25.949 25.8006 25.4707C25.5245 24.9924 25.6884 24.3808 26.1667 24.1047C26.4198 23.9586 26.63 23.7484 26.7763 23.4954C26.9226 23.2424 26.9997 22.9553 27 22.663V9.33073C27 8.8887 26.8244 8.46478 26.5118 8.15222C26.1993 7.83966 25.7754 7.66406 25.3333 7.66406H6.66667ZM7 11.9974C7 11.4451 7.44772 10.9974 8 10.9974H24C24.5523 10.9974 25 11.4451 25 11.9974C25 12.5497 24.5523 12.9974 24 12.9974H8C7.44772 12.9974 7 12.5497 7 11.9974ZM7 15.9974C7 15.4451 7.44772 14.9974 8 14.9974H12C12.5523 14.9974 13 15.4451 13 15.9974C13 16.5497 12.5523 16.9974 12 16.9974H8C7.44772 16.9974 7 16.5497 7 15.9974ZM20 16.9974C18.3431 16.9974 17 18.3405 17 19.9974C17 21.6543 18.3431 22.9974 20 22.9974C21.6569 22.9974 23 21.6543 23 19.9974C23 18.3405 21.6569 16.9974 20 16.9974ZM15 19.9974C15 17.236 17.2386 14.9974 20 14.9974C22.7614 14.9974 25 17.236 25 19.9974C25 21.3101 24.4941 22.5047 23.6667 23.3968V29.3307C23.6667 29.7095 23.4527 30.0558 23.1139 30.2252C22.7751 30.3946 22.3697 30.358 22.0667 30.1307L20 28.5807L17.9333 30.1307C17.6303 30.358 17.2249 30.3946 16.8861 30.2252C16.5473 30.0558 16.3333 29.7095 16.3333 29.3307V23.3968C15.5059 22.5047 15 21.3101 15 19.9974ZM18.3333 24.7129V27.3307L19.4 26.5307C19.7556 26.2641 20.2444 26.2641 20.6 26.5307L21.6667 27.3307V24.7129C21.1454 24.8971 20.5844 24.9974 20 24.9974C19.4156 24.9974 18.8546 24.8971 18.3333 24.7129ZM7 19.9974C7 19.4451 7.44772 18.9974 8 18.9974H10.6667C11.219 18.9974 11.6667 19.4451 11.6667 19.9974C11.6667 20.5497 11.219 20.9974 10.6667 20.9974H8C7.44772 20.9974 7 20.5497 7 19.9974Z'
					/>
				</svg>
			);

		case 'Bundle':
			return (
				<svg viewBox='0 0 24 24' fill='currentColor' className='size-3'>
					<path
						d='M3 1h18a3 3 0 0 1 3 3v8H2v5a1 1 0 0 0 1 1h7v2H3a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3ZM2 4v2h20V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Zm11.8 10.81a2.7 2.7 0 0 1 4.2.43 2.7 2.7 0 0 1 4.2-.43 2.8 2.8 0 0 1 0 3.92L18 23l-4.2-4.27a2.8 2.8 0 0 1 0-3.92Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
			);
		case 'Community':
			return (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					className='size-3.5'
					fill='currentColor'
				>
					<path
						d='M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
					<path
						d='M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
			);
		default:
			return null;
	}
};

// Helper function to get status badge color
const getStatusBadgeStyles = (status: TransactionStatus) => {
	return status === 'Completed'
		? 'bg-[#dcfce7] text-[#166534]'
		: 'bg-[#fee2e2] text-[#991b1b]';
};

// Helper function to get payout badge color
const getPayoutBadgeStyles = (payout: PayoutStatus) => {
	switch (payout) {
		case 'Paid':
			return 'bg-[#E5FEF0] text-[#12B76A]';
		case 'Pending':
			return 'bg-[#F3E8FF] text-[#7E22CE]';
		case 'Rejected':
			return 'bg-[#fee2e2] text-[#991b1b]';
		case 'Not Eligible':
			return 'bg-[#fee2e2] text-[#991b1b]';
		case 'Requested':
			return 'bg-[#E0F2FE] text-[#0369A1]';
		default:
			return 'bg-gray-100 text-gray-600';
	}
};

// Helper function to format payout text for display
const formatPayoutText = (payout: PayoutStatus) => {
	switch (payout) {
		case 'Not Eligible':
			return 'NOT ELIGIBLE';
		case 'Pending':
			return 'PEND.';
		default:
			return payout.toUpperCase();
	}
};

// Transaction detail component that works for both dialog and drawer
const TransactionDetail = ({
	transaction,
}: {
	transaction: TransactionItem | null;
}) => {
	if (!transaction) return null;

	return (
		<div className='space-y-6'>
			<div className='flex items-start gap-4'>
				<Image
					src={transaction.image || '/placeholder.svg'}
					alt={transaction.title}
					width={80}
					height={80}
					className='h-20 w-20 rounded-lg object-cover'
				/>
				<div className='flex-1'>
					<h3 className='text-lg font-semibold'>{transaction.title}</h3>
					<div className='mt-1 flex flex-wrap gap-2'>
						{transaction.type.map((type, index) => (
							<span
								key={index}
								className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
									type === 'Event'
										? 'bg-[#fee2e2] text-[#991b1b]'
										: type === 'Certificate'
										? 'bg-[#E5FEF0] text-[#12B76A]'
										: 'bg-[#E0F2FE] text-[#0369A1]'
								}`}
							>
								{getProductTypeIcon(type)}
								{type}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className='grid gap-4 sm:grid-cols-2'>
				<div className='space-y-1'>
					<p className='text-sm text-gray-500'>Amount</p>
					<p
						className={`text-lg font-semibold ${
							transaction.amount < 0 ? '' : 'text-gray-900'
						}`}
					>
						{transaction.amount < 0 ? '-' : ''}$
						{Math.abs(transaction.amount).toFixed(2)}
					</p>
				</div>
				<div className='space-y-1'>
					<p className='text-sm text-gray-500'>Date</p>
					<p className='text-lg font-semibold'>{transaction.date || 'N/A'}</p>
				</div>
				<div className='space-y-1'>
					<p className='text-sm text-gray-500'>Status</p>
					<div
						className={`inline-flex items-center gap-1.5 rounded-full ${getStatusBadgeStyles(
							transaction.status
						)} px-2 py-1 text-xs font-semibold`}
					>
						<span className='flex h-3.5 w-3.5 items-center justify-center'>
							{transaction.status === 'Completed' ? (
								<Check className='h-3 w-3 stroke-[3]' />
							) : (
								<X className='h-3 w-3 stroke-[3]' />
							)}
						</span>
						{transaction.status}
					</div>
				</div>
				<div className='space-y-1'>
					<p className='text-sm text-gray-500'>Payout</p>
					<div
						className={`inline-flex items-center rounded-full ${getPayoutBadgeStyles(
							transaction.payout
						)} px-2 py-1 text-xs font-semibold`}
					>
						{formatPayoutText(transaction.payout)}
					</div>
				</div>
				<div className='space-y-1 sm:col-span-2'>
					<p className='text-sm text-gray-500'>Customer</p>
					<p className='text-lg font-semibold'>
						{transaction.customer || 'Anonymous'}
					</p>
				</div>
			</div>
		</div>
	);
};

const SalesHistory = () => {
	// State for pagination
	const [currentPage, setCurrentPage] = useState(1);
	const searchParams = useSearchParams();
	const router = useRouter();
	const product_id = searchParams.get('product_id');
	const itemsPerPage = 5;


// Filter out transactions of type 'School'

const FILTERED_SALES_HISTORY_DATA = All_SALES_HISTORY_DATA.map((period) => ({
	...period,
	rows: period.rows
		.filter((row) => !row.type.includes('School')) // Exclude "School" type
		.filter((row) => {
			// If product_id is present, match it; otherwise keep all
			if (product_id) {
				return row.product_id === product_id;
			}
			return true;
		}),
}));

	// Calculate total items based on filtered data
	const totalItems = FILTERED_SALES_HISTORY_DATA.reduce((acc, period) => {
		return (
			acc +
			period.rows.filter((row) => !product_id || row.product_id === product_id)
				.length
		);
	}, 0);
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	// State for transaction detail modal/drawer
	const [selectedTransaction, setSelectedTransaction] =
		useState<TransactionItem | null>(null);
	const [isDetailOpen, setIsDetailOpen] = useState(false);

	// Check if we're on mobile
	const isMobile = useMediaQuery('(max-width: 640px)');

	// Handle view all products
	const handleViewAllProducts = () => {
		const newSearchParams = new URLSearchParams(searchParams);
		newSearchParams.delete('product_id');
		router.push(`/instructor/sales-history?${newSearchParams.toString()}`);
	};

	// Calculate which items to display based on pagination
	const paginatedData = () => {
		const flattenedData: TransactionItem[] = [];
		FILTERED_SALES_HISTORY_DATA.forEach((period) => {
			period.rows.forEach((row) => {
				// Only add row if there's no product_id filter or if it matches
				if (!product_id || row.product_id === product_id) {
					flattenedData.push(row);
				}
			});
		});

		if (product_id) {
			return flattenedData;
		}

		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return flattenedData.slice(startIndex, endIndex);
	};

	// Group paginated data by time period
	const groupedPaginatedData = () => {
		const paginated = paginatedData();
		const grouped: Record<string, TransactionItem[]> = {};

		// Find which period each transaction belongs to
		paginated.forEach((transaction) => {
			const period = FILTERED_SALES_HISTORY_DATA.find((period) =>
				period.rows.some(
					(row) =>
						row.id === transaction.id &&
						(!product_id || row.product_id === product_id)
				)
			);

			if (period) {
				if (!grouped[period.label]) {
					grouped[period.label] = [];
				}
				grouped[period.label].push(transaction);
			}
		});

		return Object.entries(grouped).map(([label, rows]) => {
			// Calculate total amount for this group
			const total_amount = rows.reduce((sum, row) => sum + row.amount, 0);

			return {
				label,
				total_amount,
				transactions: rows.length,
				rows,
			};
		});
	};

	// Reset to first page when product_id changes
	useEffect(() => {
		setCurrentPage(1);
	}, [product_id]);

	// Handle transaction click to open details
	const handleTransactionClick = (transaction: TransactionItem) => {
		setSelectedTransaction(transaction);
		setIsDetailOpen(true);
	};

	// Handle pagination
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPrevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<>
			<div className='bg-white rounded-xl overflow-hidden border border-[#e5e7eb] xs:py-4 xs:px-6'>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-[20px] font-bold text-[#111827] max-xs:mt-2.5 max-xs:pl-4'>
						Sales History
					</h2>
					{product_id && (
						<button
							onClick={handleViewAllProducts}
							className='px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-[#EEE] rounded-lg transition-colors'
						>
							View All Products
						</button>
					)}
				</div>

				{/* Desktop View */}
				<div className='max-xs:hidden flex flex-col gap-[8px]'>
					<div className='flex flex-col gap-6'>
						{groupedPaginatedData().map((period, index) => (
							<SalesCard.Desktop
								key={index}
								time={period.label}
								total_amount={period.total_amount}
								transactions={period.transactions}
								rows={period.rows}
								// onRowClick={handleTransactionClick}
							/>
						))}
					</div>
					{}

					<div className='flex justify-between items-center mt-6 pt-6 border-t-[1px] border-[#e0e0e0] max-sm:hidden'>
						<div className='flex items-center gap-6'>
							<div className='text-[#666] text-sm'>
								Showing{' '}
								<strong className='text-[#333] font-semibold'>
									{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}-
									{Math.min(currentPage * itemsPerPage, totalItems)}
								</strong>{' '}
								of{' '}
								<strong className='text-[#333] font-semibold'>
									{totalItems}
								</strong>{' '}
								transactions
							</div>
							{/* <PaginationMenu currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} /> */}
						</div>
						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<ChevronLeft className='w-4 h-4' />
							</button>
							{Array.from({length: Math.min(totalPages, 3)}, (_, i) => {
								// Show current page and adjacent pages
								let pageToShow = currentPage;
								if (i === 0) pageToShow = Math.max(1, currentPage - 1);
								if (i === 2) pageToShow = Math.min(totalPages, currentPage + 1);
								if (totalPages <= 3) pageToShow = i + 1;

								return (
									<button
										key={i}
										className={`w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer transition-all duration-200 ${
											pageToShow === currentPage
												? 'bg-[#333] text-white border-[#333]'
												: 'bg-[#fff] border-[#e0e0e0] hover:bg-[#f5f5f5]'
										}`}
										onClick={() => goToPage(pageToShow)}
									>
										{pageToShow}
									</button>
								);
							})}
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<ChevronRight className='w-4 h-4' />
							</button>
						</div>
					</div>
				</div>

				{/* Mobile View */}
				<div className='min-xs:hidden flex flex-col'>
					<div className='overflow-hidden bg-white'>
						{groupedPaginatedData().map((period, periodIndex) => (
							<div key={periodIndex}>
								{/* Period Header */}
								<div className='border-b border-gray-200 bg-gray-50 border-t p-3'>
									<div className='mb-1 flex items-center justify-between'>
										<span className='text-sm font-semibold text-gray-900'>
											{period.label}
										</span>
										<span className='text-base font-semibold text-gray-900'>
											${period.total_amount.toFixed(2)}
										</span>
									</div>
									<span className='text-xs text-gray-500'>
										{period.transactions} transactions
									</span>
								</div>

								{/* Transaction Cards */}
								{period.rows.map((transaction, transactionIndex) => (
									<div
										key={transactionIndex}
										className={`border-b border-gray-200 p-4 ${
											transactionIndex === period.rows.length - 1 &&
											periodIndex === groupedPaginatedData().length - 1
												? ''
												: 'border-b'
										}`}
										onClick={() => handleTransactionClick(transaction)}
									>
										<div className='flex gap-3'>
											<Image
												src={transaction.image || '/placeholder.svg'}
												alt={transaction.title}
												width={48}
												height={48}
												className='h-12 w-12 rounded-lg object-cover'
											/>
											<div className='flex flex-1 flex-col justify-between overflow-hidden'>
												<div className='mb-1 flex flex-1 items-start justify-between gap-2'>
													<span className='flex-1 w-35 truncate text-sm font-semibold text-gray-900'>
														{transaction.title}
													</span>
													<span
														className={`whitespace-nowrap text-sm font-semibold ${
															transaction.amount < 0 ? '' : 'text-gray-900'
														}`}
													>
														{transaction.amount < 0 ? '-' : ''}$
														{Math.abs(transaction.amount).toFixed(2)}
													</span>
												</div>

												<div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
													{transaction.type.map((type, typeIndex) => (
														<div
															key={typeIndex}
															className={`flex items-center gap-1 rounded-full ${
																type === 'Event'
																	? 'bg-[#fee2e2] text-[#991b1b]'
																	: type === 'Certificate'
																	? 'bg-[#E5FEF0] text-[#12B76A]'
																	: 'bg-[#E0F2FE] text-[#0369A1]'
															} px-2 py-1 text-xs font-semibold`}
														>
															{getProductTypeIcon(type)}
															{type}
														</div>
													))}

													<div
														className={`flex items-center gap-1.5 rounded-full ${getStatusBadgeStyles(
															transaction.status
														)} px-2 py-1 text-xs font-semibold`}
													>
														<span className='flex h-3.5 w-3.5 items-center justify-center'>
															{transaction.status === 'Completed' ? (
																<Check className='h-3 w-3 stroke-[3]' />
															) : (
																<X className='h-3 w-3 stroke-[3]' />
															)}
														</span>
														{transaction.status}
													</div>

													<div
														className={`rounded-full ${getPayoutBadgeStyles(
															transaction.payout
														)} px-2 py-1 text-xs font-semibold`}
													>
														{formatPayoutText(transaction.payout)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						))}
					</div>

					{/* Mobile Pagination */}
					<div className='flex justify-center items-center mt-4 pb-2'>
						<div className='flex items-center gap-2'>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={goToPrevPage}
								disabled={currentPage === 1}
							>
								<ChevronLeft className='w-4 h-4' />
							</button>
							<span className='text-sm font-medium'>
								Page {currentPage} of {totalPages}
							</span>
							<button
								className='w-8 h-8 border border-[#e0e0e0] rounded-md flex items-center justify-center cursor-pointer bg-white text-[#333] transition-all duration-200 hover:bg-[#f5f5f5] disabled:opacity-50 disabled:cursor-not-allowed'
								onClick={goToNextPage}
								disabled={currentPage === totalPages}
							>
								<ChevronRight className='w-4 h-4' />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop: Dialog for transaction details */}
			{!isMobile && (
				<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
					<DialogContent className='sm:max-w-[500px]'>
						<DialogHeader>
							<DialogTitle>Transaction Details</DialogTitle>
						</DialogHeader>
						<TransactionDetail transaction={selectedTransaction} />
					</DialogContent>
				</Dialog>
			)}

			{/* Mobile: Drawer for transaction details */}
			{isMobile && (
				<Drawer open={isDetailOpen} onOpenChange={setIsDetailOpen}>
					<DrawerContent>
						<DrawerHeader className='border-b border-gray-200'>
							<DrawerTitle>Transaction Details</DrawerTitle>
						</DrawerHeader>
						<div className='px-4 py-6'>
							<TransactionDetail transaction={selectedTransaction} />
						</div>
					</DrawerContent>
				</Drawer>
			)}
		</>
	);
};

export default SalesHistory;
