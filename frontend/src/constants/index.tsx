/** @format */

import {
	BundleSvg,
	CommunitySvg,
	CourseSvg,
	Dashboard1Svg,
	SchoolSvg,
	SubscriptionSvg,
	ZoomSvg,
} from '@/app/components/svg';
import image1 from '@/assets/c1.jpg';
import image4 from '@/assets/c4.jpg';
import image3 from '@/assets/c3.jpg';
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
	| 'School'

// Define the transaction item type
interface TransactionItem {
	id: string; // Added unique ID for each transaction
	product_id: string;
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
interface TimePeriodData {
	label: string;
	total_amount: number;
	transactions: number;
	rows: TransactionItem[];
}
export const PRODUCT_CREATE_MENU_ITEMS = [
	{
		icon: <SchoolSvg className='w-4 h-4 fill-gray-800' />,
		title: 'New School',
		id: 'school',
	},
	{
		icon: <CourseSvg className='w-4 h-4 fill-gray-800' />,
		title: 'New Course',
		id: 'course',
	},
	{
		icon: <ZoomSvg className='w-4 h-4 fill-gray-800' />,
		title: 'New Session',
		id: 'session',
	},
	{
		icon: <CommunitySvg className='w-4 h-4 fill-gray-800' />,
		title: 'New Community',
		id: 'community',
	},
	{
		icon: <BundleSvg className='w-4 h-4 fill-gray-800' />,
		title: 'New Bundle',
		id: 'bundle',
	},
];

export const PRODUCTS_MENU_ITEMS = [
	{
		icon: <Dashboard1Svg className='w-3.5 h-3.5' />,
		title: 'All Products',
		count: 255,
	},
	{
		icon: <SchoolSvg className='w-4 h-4 fill-black' />,
		title: 'Schools',
		count: 9,
	},
	{
		icon: <CourseSvg className='w-4 h-4 fill-black' />,
		title: 'Courses',
		count: 25,
	},
	{
		icon: <ZoomSvg className='w-4 h-4 fill-black' />,
		title: 'Sessions',
		count: 55,
	},
	{
		icon: <CommunitySvg className='w-4 h-4 fill-black' />,
		title: 'Communities',
		count: 12,
	},
	{
		icon: <BundleSvg className='w-4 h-4 fill-black' />,
		title: 'Bundles',
		count: 15,
	},
	{
		icon: <SubscriptionSvg className='w-4 h-4 fill-black' />,
		title: 'Subscriptions',
		count: 12,
	},
];

export const PRODUCT_DATA = [
	{
		id: 1,
		image: 'https://i.ibb.co/jZjZ7ZRd/butterfly.webp',
		type: 'course',
		status: 'published',
		title: 'How to Write Better Prompts',
		price: '5',
		students: '695',
		lastActivity: 'Created Nov 1, 2024',
		enrolled: 2543,
		action: 'View Outline',
		createdAt: '2024-11-01T10:00:00Z',
		updatedAt: '2024-11-10T10:00:00Z',
	},
	{
		id: 2,
		image: 'https://i.ibb.co/BHcDXgQt/product5.webp',
		type: 'course',
		status: 'published',
		title: 'How to Write Better Prompts',
		price: '14.99',
		students: '695',
		lastActivity: 'Created Nov 1, 2024',
		enrolled: 2543,
		action: 'View Outline',
		createdAt: '2024-11-02T10:00:00Z',
		updatedAt: '2024-11-11T10:00:00Z',
	},
	{
		id: 3,
		image: 'https://i.ibb.co/5NTkykV/product3.jpg',
		type: 'session',
		status: 'draft',
		title: 'Prompt Mastery 1:1 Coaching',
		price: '85.00',
		students: '125',
		lastActivity: 'Next Session: Nov 25, 2024',
		enrolled: 2543,
		action: 'View RSVP',
		createdAt: '2024-11-03T10:00:00Z',
		updatedAt: '2024-11-12T10:00:00Z',
	},
	{
		id: 4,
		image: 'https://i.ibb.co/XkdtT1Yj/product2.png',
		type: 'group-session',
		status: 'pending',
		title: 'Group Prompt Engineering Workshop',
		price: '49.00',
		students: '78',
		lastActivity: 'Next Session: Dec 5, 2024',
		enrolled: 2543,
		action: 'View RSVP',
		createdAt: '2024-11-04T10:00:00Z',
		updatedAt: '2024-11-13T10:00:00Z',
	},
	{
		id: 5,
		image: 'https://i.ibb.co/60MjrnYw/product1.webp',
		type: 'community',
		status: 'rejected',
		title: 'The Prompt Collective',
		price: '85.00',
		students: '78',
		members: '3.2k',
		posts: '697',
		spaces: '10',
		lastActivity: 'Created Jan 25, 2024',
		enrolled: 2543,
		action: 'View Sales History',
		createdAt: '2024-11-05T10:00:00Z',
		updatedAt: '2024-11-14T10:00:00Z',
	},
	{
		id: 6,
		image: 'https://i.ibb.co/jZjZ7ZRd/butterfly.webp',
		type: 'certificate',
		status: 'rejected',
		students: '78',
		title: 'Certificate of Prompt Mastery',
		price: '10.00',
		certificates: '67',
		lastActivity: 'Updated Oct 15, 2024',
		enrolled: 2543,
		action: 'View Sales History',
		createdAt: '2024-11-06T10:00:00Z',
		updatedAt: '2024-11-15T10:00:00Z',
	},
	{
		id: 7,
		image: 'https://i.ibb.co/BHcDXgQt/product5.webp',
		type: 'bundle',
		status: 'pending',
		students: '78',
		title: 'The Prompt Mastery Bundle',
		price: '89.00',
		subscribers: '269',
		products: '30',
		lastActivity: 'Modified Nov 15, 2024',
		enrolled: 2543,
		action: 'View Sales History',
		createdAt: '2024-11-07T10:00:00Z',
		updatedAt: '2024-11-16T10:00:00Z',
	},
	{
		id: 8,
		image: 'https://i.ibb.co/5NTkykV/product3.jpg',
		type: 'subscription',
		status: 'draft',
		students: '78',
		title: 'The Prompt Mastery Subscription',
		price: '89.00',
		subscribers: '269',
		products: '30',
		lastActivity: 'Modified Nov 15, 2024',
		enrolled: 2543,
		action: 'View Sales History',
		createdAt: '2024-11-08T10:00:00Z',
		updatedAt: '2024-11-17T10:00:00Z',
	},
	{
		id: 9,
		image: 'https://i.ibb.co/XkdtT1Yj/product2.png',
		type: 'school',
		status: 'rejected',
		title: 'Advanced Prompt Engineering',
		price: '199.00',
		students: '0',
		lastActivity: 'Created Nov 20, 2024',
		enrolled: 2543,
		action: 'View Outline',
		createdAt: '2024-11-09T10:00:00Z',
		updatedAt: '2024-11-18T10:00:00Z',
	},
];

export const All_SALES_HISTORY_DATA: TimePeriodData[] = [
	{
		label: 'Today',
		total_amount: 798,
		transactions: 2,
		rows: [
			{
				id: 't1',
				product_id: '1',
				type: ['Course'],
				image: image1.src,
				title: 'How to Write Better Prompts',
				amount: 5,
				status: 'Completed',
				payout: 'Paid',
				date: 'Today, 2:30 PM',
				customer: 'John Smith',
			},
		],
	},
	{
		label: 'Yesterday',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't2',
				product_id:'2',
				type: ['Certificate', 'Community'],
				image: image4.src,
				title: 'How to Write Better Prompts',
				amount: 499,
				status: 'Completed',
				payout: 'Pending',
				date: 'Yesterday, 3:45 PM',
				customer: 'Michael Brown',
			},
			
		],
	},
	{
		label: 'Past Week',
		total_amount: 1297,
		transactions: 4,
		rows: [
			{
				id: 't3',
				product_id: '3',
				type: ['Event'],
				image: image1.src,
				title: 'Prompt Mastery 1:1 Coaching',
				amount: -199,
				status: 'Refunded',
				payout: 'Not Eligible',
				date: 'May 3, 2025',
				customer: 'David Wilson',
			},
			{
				id: 't4',
				product_id: '4',
				type: ['Subscription'],
				image: image3.src,
				title: 'Monthly Pro Acess - December 2024',
				amount: 895,
				status: 'Completed',
				payout: 'Requested',
				date: 'May 2, 2025',
				customer: 'Jennifer Taylor',
			},
		],
	},
	{
		label: 'Past Month',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't5',
				product_id: '5',
				type: ['Bundle', 'Premium Certificate'],
				image: image4.src,
				title: 'Ultimate Developer Bundle 2025',
				amount: 1299,
				status: 'Completed',
				payout: 'Rejected',
				date: 'April 15, 2025',
				customer: 'Thomas Clark',
			}
		],
	},
	{
		label: 'All Time',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't6',
				product_id: '6',
				type: ['Certificate'],
				image: image1.src,
				title: 'Certificate of Prompt Mastery',
				amount: 799,
				status: 'Completed',
				payout: 'Paid',
				date: 'April 15, 2025',
				customer: 'Thomas Clark',
			}
		],
	},
	{
		label: 'All Time',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't7',
				product_id: '7',
				type: ['Bundle'],
				image: image1.src,
				title: 'The Prompt Mastery Bundle',
				amount: 89.00,
				status: 'Completed',
				payout: 'Paid',
				date: 'April 15, 2025',
				customer: 'Thomas Clark',
			}
		],
	},
	{
		label: 'All Time',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't8',
				product_id: '8',
				type: ['Subscription'],
				image: image1.src,
				title: 'The Prompt Mastery Subscription',
				amount: 89.00,
				status: 'Completed',
				payout: 'Paid',
				date: 'April 15, 2025',
				customer: 'Thomas Clark',
			}
		],
	},
	{
		label: 'All Time',
		total_amount: 1297,
		transactions: 3,
		rows: [
			{
				id: 't9',
				product_id: '9',
				type: ['Event'],
				image: image1.src,
				title: 'Machine Learning Fundamentals',
				amount: 799,
				status: 'Completed',
				payout: 'Paid',
				date: 'April 15, 2025',
				customer: 'Thomas Clark',
			}
		],
	},
];
