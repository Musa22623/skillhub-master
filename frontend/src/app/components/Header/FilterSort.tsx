/** @format */

import {useState} from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/app/components/ui/select';
import {FunnelX} from 'lucide-react';

const languages = [
	'English',
	'Chinese',
	'Hindi',
	'Spanish',
	'French',
	'Russian',
	'German',
	'Japanese',
	'Korean',
	'Hebrew',
];
const sortOptions = ['Popularity', 'Newest', 'Oldest'];
const titleOptions = ['Title', 'Content'];

const FilterAndSort = () => {
	// State for filters
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [selectedTitleFilter, setSelectedTitleFilter] = useState('');
	const [selectedSort, setSelectedSort] = useState('');

	// Reset all filters
	const handleReset = () => {
		setSelectedLanguage('');
		setSelectedTitleFilter('');
		setSelectedSort('');
	};
	return (
		<div className='flex items-center h-14 bg-accent rounded-sm justify-between max-w-3xl px-4 my-2 text-sm'>
			<h2 className='font-semibold'>Filter & Sort</h2>
			{/* Language Filter */}
			<Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
				<SelectTrigger className='w-40 bg-white rounded'>
					<SelectValue placeholder='All Languages' className='' />
				</SelectTrigger>
				<SelectContent className=' rounded-none border bg-accent '>
					<SelectGroup className=''>
						<SelectLabel className='bg-blue-500 text-white'>My Language</SelectLabel>
						{languages.map((lang) => (
							<SelectItem key={lang.toLowerCase()} value={lang.toLowerCase()}>
								{lang}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			{/* Title & Content Filter */}
			<Select
				value={selectedTitleFilter}
				onValueChange={setSelectedTitleFilter}
			>
				<SelectTrigger className='w-40 bg-white rounded'>
					<SelectValue placeholder='Title & Content' />
				</SelectTrigger>
				<SelectContent className='rounded-none border bg-accent'>
					<SelectGroup>
						<SelectLabel className='bg-blue-500 text-white'>Title & Content</SelectLabel>
						{titleOptions.map((option) => (
							<SelectItem
								key={option.toLowerCase()}
								value={option.toLowerCase()}
							>
								{option}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			{/* Sorting Options */}
			<Select value={selectedSort} onValueChange={setSelectedSort}>
				<SelectTrigger className='w-40 bg-white rounded'>
					<SelectValue placeholder='Best Match' />
				</SelectTrigger>
				<SelectContent className='rounded-none border bg-accent'>
					<SelectGroup>
						<SelectLabel className='bg-blue-500 text-white'>Best Match</SelectLabel>
						{sortOptions.map((option) => (
							<SelectItem
								key={option.toLowerCase()}
								value={option.toLowerCase()}
							>
								{option}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			<div
				className='flex items-center gap-1 cursor-pointer'
				onClick={handleReset}
			>
				<FunnelX className='size-4' />
				<span>Reset all</span>
			</div>
		</div>
	);
};

export default FilterAndSort;
