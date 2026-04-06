/** @format */
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const trendingSearches = [
	'Alberto',
	'Ruka',
	'Benchmark',
	'Artificial Intelligence',
	'Latest version of super computer',
];

const searchResults = {
	courses: [
		{
			title: 'Advanced Machine Learning Techniques',
			author: 'Jonah Berger',
			duration: '23m',
			enrolled: '156',
			image: 'https://i.ibb.co/60MjrnYw/product1.webp',
		},
		{
			title: 'Data Science Fundamentals',
			author: 'Sarah Johnson',
			duration: '2.5hr',
			enrolled: '342',
			image: 'https://i.ibb.co/jZjZ7ZRd/butterfly.webp',
		},
	],
	sessions: [
		{
			title: 'Leadership Workshop',
			author: 'Michael Chen',
			enrolled: '89',
			image: 'https://i.ibb.co/BHcDXgQt/product5.webp',
		},
		{
			title: 'Team Building Strategies',
			author: 'Emily Wilson',
			enrolled: '124',
			image: 'https://i.ibb.co/5NTkykV/product3.jpg',
		},
	],
	communities: [
		{
			title: 'Tech Innovators Network',
			author: 'David Lee',
			enrolled: '567',
			image: 'https://i.ibb.co/XkdtT1Yj/product2.png',
		},
		{
			title: 'Digital Marketing Pros',
			author: 'Lisa Anderson',
			enrolled: '892',
			image: 'https://i.ibb.co/jZjZ7ZRd/butterfly.webp',
		},
	],
};

const topics = [
	'US relations',
	'Digital Marketing',
	'Data Science',
	'Leadership',
];

interface SearchInterfaceProps {
  searchValue: string;
  handleSearch: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  setSearchValue: (value: string) => void;
}

const SearchInterface: React.FC<SearchInterfaceProps> = ({
  searchValue,
  setShowSuggestions,
  setSearchValue,
}) => {

	const router = useRouter()

	const handleTrendingClick = (text: string) => {
		setSearchValue(text);
		setShowSuggestions(true);
	};

	const handleTopicClick = (text: string) => {
		setSearchValue(text);
		setShowSuggestions(false)

		router.push(`/search-result?q=${text}`)
	};

	return (
		<div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-lg opacity-100 visible z-10 p-4 transition-all duration-200 ease-in-out">
			{searchValue.length < 2 ? (
				<div className="mb-5">
					<h3 className="text-sm text-[#3B6E91] mb-3 font-semibold tracking-tight">Trending now</h3>
					<div className="flex flex-col gap-3">
						{trendingSearches.map((search, index) => (
							<div
								key={index}
								className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
								onClick={() => handleTrendingClick(search)}
							>
								<svg className="w-4 h-4 text-[#009ECB]" viewBox="0 0 20 20">
									<g fillRule="nonzero" fill="currentColor">
										<path d="M17.02 6.106a.5.5 0 0 1 .816.572l-.052.074-6.33 7.483a.5.5 0 0 1-.662.092l-.073-.06-3.933-3.918-3.932 3.933a.5.5 0 0 1-.638.058l-.07-.058a.5.5 0 0 1-.057-.638l.057-.069 4.286-4.286a.5.5 0 0 1 .637-.058l.07.058 3.9 3.886z"></path>
										<path d="M17.403 5.929a.5.5 0 0 1 .492.41l.008.09v3.214a.5.5 0 0 1-.992.09l-.008-.09-.001-2.714h-2.616a.5.5 0 0 1-.492-.41l-.008-.09a.5.5 0 0 1 .41-.492l.09-.008z"></path>
									</g>
								</svg>
								<span className="text-sm font-semibold tracking-tight">{search}</span>
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="border-t border-gray-200 pt-4 h-[60vh] px-2 overflow-y-auto">
					<SearchResults onClose={setShowSuggestions}/>
				</div>
			)}

			<div className="mt-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-[#13c4cc]"
							viewBox="0 0 24 24"
							strokeWidth="2"
							stroke="currentColor"
							fill="none"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 4h6v6h-6z" />
							<path d="M14 4h6v6h-6z" />
							<path d="M4 14h6v6h-6z" />
							<path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
						</svg>
					</div>
					<h3 className="text-sm text-[#3B6E91] font-semibold tracking-tight">Topics</h3>
				</div>
				<div className="flex flex-wrap gap-3">
					{topics.map((topic, index) => (
						<div
							key={index}
							className="inline-flex items-center justify-between px-3 py-1.5 bg-[#D8F0FC] border border-[#009ECB] border-opacity-40 rounded-lg min-w-[120px] max-w-fit gap-2 cursor-pointer transition-all duration-200 hover:bg-[#C5E8F9]"
							onClick={() => handleTopicClick(topic)}
						>
							<span className="text-sm font-normal tracking-tight text-[#262B3D]">{topic}</span>
							<div className="w-4.5 h-4.5 bg-[#4FBAE9] rounded-full flex items-center justify-center">
								<svg className="w-3 h-3" viewBox="0 0 448 512">
									<path
										d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
										fill="white"
									></path>
								</svg>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

// Search results component
function SearchResults({onClose}: {onClose: (state:boolean) => void}) {
	const router = useRouter();

	const handleViewClick = () => {
		onClose(false)
		router.push('/course');

	}

	return (
		<>
			{/* Courses Section */}
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
						<svg
							className="w-5 h-5 text-[#13c4cc]"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V15.5505C6.13355 15.3548 6.56137 15.25 7 15.25H18.25V4.75H7ZM19.75 4C19.75 3.58579 19.4142 3.25 19 3.25H7C6.27065 3.25 5.57118 3.53973 5.05546 4.05546C4.53973 4.57118 4.25 5.27065 4.25 6V18C4.25 18.7293 4.53973 19.4288 5.05546 19.9445C5.57118 20.4603 6.27065 20.75 7 20.75H19C19.4142 20.75 19.75 20.4142 19.75 20V4ZM18.25 16.75H7C6.66848 16.75 6.35054 16.8817 6.11612 17.1161C5.8817 17.3505 5.75 17.6685 5.75 18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H18.25V16.75ZM8.25 8C8.25 7.58579 8.58579 7.25 9 7.25H15C15.4142 7.25 15.75 7.58579 15.75 8C15.75 8.41421 15.4142 8.75 15 8.75H9C8.58579 8.75 8.25 8.41421 8.25 8Z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
						</svg>
					</div>
					<h3 className="text-base font-semibold text-[#3B6E91] tracking-tight">Courses</h3>
				</div>
				<div className="flex flex-col">
					{searchResults.courses.map((course, i) => (
						<div key={i} className="flex items-start py-3 gap-4 border-b border-gray-100">
							<Image
								className="w-[72px] h-12 rounded-md object-cover"
								src={course.image}
								width={72}
								height={48}
								alt={course.title}
							/>
							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-semibold text-[#262B3D] mb-1 leading-tight tracking-tight">{course.title}</h4>
								<div className="flex items-center gap-2 text-xs text-[#3B6E91]">
									<span>{course.author}</span>
									<div className="w-[3px] h-[3px] bg-[#3B6E91] rounded-full"></div>
									<span>{course.duration}</span>
									<div className="w-[3px] h-[3px] bg-[#3B6E91] rounded-full"></div>
									<span>{course.enrolled} enrolled</span>
								</div>
							</div>
							<button onClick={handleViewClick} className="px-4 py-1.5 bg-[#D8F0FC] text-[#009ECB] border border-[#009ECB] border-opacity-40 rounded-md text-xs font-semibold transition-all duration-200 hover:bg-[#C5E8F9] tracking-tight">
								VIEW
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Sessions Section */}
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
						<svg className="w-5 h-5 text-[#13c4cc]" fill="none" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5ZM15.75 8.78622V8C15.75 7.27065 15.4603 6.57118 14.9445 6.05546C14.4288 5.53973 13.7293 5.25 13 5.25H5C4.27065 5.25 3.57118 5.53973 3.05546 6.05546C2.53973 6.57118 2.25 7.27065 2.25 8V16C2.25 16.7293 2.53973 17.4288 3.05546 17.9445C3.57118 18.4603 4.27065 18.75 5 18.75H13C13.7293 18.75 14.4288 18.4603 14.9445 17.9445C15.4603 17.4288 15.75 16.7293 15.75 16V15.213L19.2176 16.9465C19.4844 17.0798 19.7809 17.1427 20.0787 17.1293C20.3766 17.1159 20.6661 17.0266 20.9198 16.8699C21.1735 16.7131 21.3829 16.4942 21.5282 16.2338C21.6735 15.9734 21.7498 15.6802 21.75 15.382V8.61763C21.7498 8.31945 21.6735 8.02585 21.5282 7.76546C21.3829 7.50506 21.1735 7.28612 20.9198 7.12939C20.6661 6.97266 20.3766 6.88335 20.0787 6.86994C19.7809 6.85652 19.4845 6.91944 19.2177 7.05273L15.75 8.78622ZM15.75 10.4632V13.5361L19.8883 15.6047C19.8882 15.6047 19.8883 15.6047 19.8883 15.6047C19.9263 15.6237 19.9687 15.6328 20.0112 15.6308C20.0538 15.6289 20.0952 15.6162 20.1314 15.5938C20.1676 15.5714 20.1976 15.5401 20.2183 15.5029C20.2391 15.4657 20.25 15.4238 20.25 15.3812V8.61803C20.25 8.57543 20.2391 8.53354 20.2183 8.49635C20.1976 8.45915 20.1676 8.42787 20.1314 8.40548C20.0952 8.38309 20.0538 8.37033 20.0112 8.36842C19.9687 8.3665 19.9264 8.37547 19.8884 8.39448C19.8883 8.3945 19.8884 8.39446 19.8884 8.39448L15.75 10.4632Z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
						</svg>
					</div>
					<h3 className="text-base font-semibold text-[#3B6E91] tracking-tight">Sessions</h3>
				</div>
				<div className="flex flex-col">
					{searchResults.sessions.map((session, i) => (
						<div key={i} className="flex items-start py-3 gap-4 border-b border-gray-100">
							<Image
								className="w-[72px] h-12 rounded-md object-cover"
								width={72}
								height={48}
								src={session.image}
								alt={session.title}
							/>
							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-semibold text-[#262B3D] mb-1 leading-tight tracking-tight">{session.title}</h4>
								<div className="flex items-center gap-2 text-xs text-[#3B6E91]">
									<span>{session.author}</span>
									<div className="w-[3px] h-[3px] bg-[#3B6E91] rounded-full"></div>
									<span>{session.enrolled} enrolled</span>
								</div>
							</div>
							<button onClick={handleViewClick} className="px-4 py-1.5 bg-[#D8F0FC] text-[#009ECB] border border-[#009ECB] border-opacity-40 rounded-md text-xs font-semibold transition-all duration-200 hover:bg-[#C5E8F9] tracking-tight">
								VIEW
							</button>
						</div>
					))}
				</div>
			</div>

			{/* Communities Section */}
			<div className="mb-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
						<svg className="w-5 h-5 text-[#13c4cc]" viewBox="0 0 20 20">
							<path
								fill="currentColor"
								d="M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659ZM8.047 2.21375C8.34393 1.91682 8.74666 1.75 9.16659 1.75H16.6666C17.0865 1.75 17.4892 1.91681 17.7862 2.21375C18.0831 2.51068 18.2499 2.91341 18.2499 3.33333V11.6667C18.2499 11.97 18.0672 12.2435 17.7869 12.3596C17.5067 12.4757 17.1841 12.4115 16.9696 12.197L14.6893 9.91667H9.16659C8.74666 9.91667 8.34393 9.74985 8.047 9.45292C7.75007 9.15599 7.58325 8.75326 7.58325 8.33333V3.33333C7.58325 2.91341 7.75007 2.51068 8.047 2.21375Z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
							<path
								fill="currentColor"
								d="M3.33333 9.08333C3.31123 9.08333 3.29004 9.09211 3.27441 9.10774C3.25878 9.12336 3.25 9.14456 3.25 9.16666V15.6893L4.46967 14.4697C4.61032 14.329 4.80109 14.25 5 14.25H10.8333C10.8554 14.25 10.8766 14.2412 10.8923 14.2256C10.9079 14.21 10.9167 14.1888 10.9167 14.1667V12.5C10.9167 12.0858 11.2525 11.75 11.6667 11.75C12.0809 11.75 12.4167 12.0858 12.4167 12.5V14.1667C12.4167 14.5866 12.2499 14.9893 11.9529 15.2862C11.656 15.5832 11.2533 15.75 10.8333 15.75H5.31066L3.03033 18.0303C2.81583 18.2448 2.49324 18.309 2.21299 18.1929C1.93273 18.0768 1.75 17.8033 1.75 17.5V9.16666C1.75 8.74674 1.91682 8.34401 2.21375 8.04708C2.51068 7.75014 2.91341 7.58333 3.33333 7.58333H5C5.41421 7.58333 5.75 7.91911 5.75 8.33333C5.75 8.74754 5.41421 9.08333 5 9.08333H3.33333Z"
								clipRule="evenodd"
								fillRule="evenodd"
							></path>
						</svg>
					</div>
					<h3 className="text-base font-semibold text-[#3B6E91] tracking-tight">Communities</h3>
				</div>
				<div className="flex flex-col">
					{searchResults.communities.map((community, i) => (
						<div key={i} className="flex items-start py-3 gap-4 border-b border-gray-100">
							<Image
								className="w-[72px] h-12 rounded-md object-cover"
								width={72}
								height={48}
								src={community.image}
								alt={community.title}
							/>
							<div className="flex-1 min-w-0">
								<h4 className="text-sm font-semibold text-[#262B3D] mb-1 leading-tight tracking-tight">{community.title}</h4>
								<div className="flex items-center gap-2 text-xs text-[#3B6E91]">
									<span>{community.author}</span>
									<div className="w-[3px] h-[3px] bg-[#3B6E91] rounded-full"></div>
									<span>{community.enrolled} enrolled</span>
								</div>
							</div>
							<button onClick={handleViewClick}  className="px-4 py-1.5 bg-[#D8F0FC] text-[#009ECB] border border-[#009ECB] border-opacity-40 rounded-md text-xs font-semibold transition-all duration-200 hover:bg-[#C5E8F9] tracking-tight">
								VIEW
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default SearchInterface;