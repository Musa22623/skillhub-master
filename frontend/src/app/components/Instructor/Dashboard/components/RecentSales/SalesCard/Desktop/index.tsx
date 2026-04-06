/** @format */

import React from 'react';
import Image from 'next/image';
// import Tooltip from '@/app/components/ui/tooltips';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from '@/app/components/ui/tooltip';
import {CommunitySvg, VideoSvg} from '@/app/components/svg';

interface SalesCardProps {
	type: 'course' | 'event' | 'community';
	image: string;
	title: string;
	amount: number;
	status: 'completed' | 'refunded';
	date: string;
}

const SalesCard: React.FC<SalesCardProps> = ({
	type,
	image,
	title,
	amount,
	status,
	date,
}) => {
	const classNames = {
		root: 'gap-[8px] grid lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-[24px] sm:grid-cols-[2fr_1fr] sm:gap-[16px] items-start p-4 bg-white rounded-[12px] border border-[#e5e7eb]',
		product: {
			root: 'flex gap-[16px]',
			image: 'w-21 h-15 rounded-[8px] object-cover',
			content: {
				root: 'flex flex-col gap-[8px] justify-between min-h-[60px]',
				type: 'inline-flex items-center gap-[6px] py-1 px-2.5 rounded-[20px] text-[13px] font-semibold w-fit',
			},
		},
		amount:
			'font-semibold text-[#1a1a1a] mt-auto flex items-center gap-[8px] pb-[2px]',
		status:
			'rounded-[20px] text-[13px] font-semibold inline-flex items-center gap-[6px] w-fit mt-auto py-[6px] px-[12px] pt-[2px]',
		date: 'flex items-center gap-[8px] text-[#1a1a1a] font-semibold relative mt-auto pb-[2px] cursor-pointer',
	};

	const typeColor =
		type === 'course'
			? 'bg-[#dbe9fe] text-[#1c4ed8]'
			: type === 'event'
			? 'bg-[#fee2e1] text-[#991b1b]'
			: 'bg-[#fff3c6] text-[#db7303]';
	const statusColor =
		status === 'completed'
			? 'bg-[#dcfce7] text-[#166534]'
			: status === 'refunded'
			? 'bg-[#fee2e2] text-[#991b1b]'
			: '';

	// Format date for display (date only without time)
	const formatDateForDisplay = (dateString: string) => {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}).format(date);
	};

	// Get the formatted date for display
	const displayDate = formatDateForDisplay(date);

	// Full timestamp for tooltip
	const fullTimestamp = date;

	return (
		<div className={classNames.root}>
			<div className={classNames.product.root}>
				<Image
					className={classNames.product.image}
					src={image}
					alt={title}
					width={84}
					height={60}
				/>
				<div className={classNames.product.content.root}>
					<div className={`${classNames.product.content.type} ${typeColor}`}>
						{type === 'course' ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='w-[16px] h-[16px]'
							>
								<path
									fill='currentColor'
									d='M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z'
									clipRule='evenodd'
									fillRule='evenodd'
								></path>
							</svg>
						) : type === 'event' ? (
							<VideoSvg className='size-4 fill-[#991b1b]' />
						) : (
							<CommunitySvg className={`size-4 fill-[#db7303]`} />
						)}
						{type.charAt(0).toUpperCase() + type.slice(1)}
					</div>
					<h3 className='text-[15px] font-semibold text-[#1a1a1a] mt-auto'>
						{title}
					</h3>
				</div>
			</div>

			<div className={classNames.amount}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 20 20'
					className='w-[18px] h-[18px] text-[#4d4d4c]'
				>
					<path
						fill='currentColor'
						d='M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
					<path
						fill='currentColor'
						d='M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(amount)}
			</div>

			<div className={`${classNames.status} ${statusColor}`}>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</div>

			{/* <Tooltips
				title={fullTimestamp}
				classNames='flex items-center gap-[8px] text-[#1a1a1a] font-semibold mt-auto pb-[2px]'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 32 32'
					className='w-[18px] h-[18px] text-[#4d4d4c]'
				>
					<path
						fill='#828282'
						d='M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z'
						clipRule='evenodd'
						fillRule='evenodd'
					></path>
				</svg>
				{displayDate}
			</Tooltips> */}

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger className='flex items-center gap-[8px] text-[#1a1a1a] font-semibold mt-auto pb-[2px]'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 32 32'
							className='w-[18px] h-[18px] text-[#4d4d4c]'
						>
							<path
								fill='#828282'
								d='M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z'
								clipRule='evenodd'
								fillRule='evenodd'
							></path>
						</svg>
						{displayDate}
					</TooltipTrigger>
					<TooltipContent arrowClass='-translate-x-[47px] bg-black fill-black' align='end' alignOffset={80} className='bg-black'>{fullTimestamp}</TooltipContent>
				</Tooltip>
			</TooltipProvider>


		</div>
	);
};

export default SalesCard;
