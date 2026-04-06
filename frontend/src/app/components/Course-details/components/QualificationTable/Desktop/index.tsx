/** @format */

import React, {useState} from 'react';
import {X, Check, ChevronDown} from 'lucide-react';

const QualificationsTable = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [foundMatch, setFoundMatch] = useState(true);

	const qualifications = [
		{
			name: 'Auditing for Certified Public Accountants (CPA-US)',
			credits: '4 CPE',
			status: 'Approved',
		},
		{
			name: 'Internal Auditing for Certified Internal Auditors (CIA)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Management Accountants (CMA)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Delaware Licensed Public Accountant (DE-LPA)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Government Financial Manager (CGFM)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Fraud Examiner (CFE)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Internal Audit Practitioner (IAP)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certification in Risk Management Assurance (CRMA)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Internal Controls Auditor (CICA)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Controls Specialist (CCS)',
			credits: '4 CPE',
			status: 'Eligible',
		},
		{
			name: 'Auditing for Certified Government Auditing Professional (CGAP)',
			credits: '4 CPE',
			status: 'Eligible',
		},
	];

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toLowerCase();
		setSearchValue(value);

		const found = qualifications.some((qual) =>
			qual.name.toLowerCase().includes(value)
		);

		setFoundMatch(found);
	};

	const handleSearch = () => {
		setSearchValue('');
	};

	return (
		<div className=' bg-gray-100 flex '>
			<div className='w-full bg-white rounded-xl shadow-md overflow-hidden'>
				<div className='p-6 border-b border-gray-200'>
					<h1 className='text-xl font-semibold mb-4 text-gray-800'>
						On Demand Credits for All Qualifications
					</h1>
					<div className='flex items-center gap-4 bg-gray-100 p-3 rounded-lg'>
						<input
							type='text'
							className='flex-1 border-none bg-transparent text-base text-gray-700 outline-none placeholder-gray-400'
							placeholder='Enter qualification...'
							value={searchValue}
							onChange={handleSearchChange}
						/>
						<button
							onClick={handleSearch}
							className={`w-6 h-6 flex items-center justify-center rounded-full ${
								foundMatch
									? 'bg-green-100 text-green-800'
									: 'bg-red-100 text-red-600'
							}`}
						>
							{foundMatch ? <Check size={16} /> : <X size={16} />}
						</button>
					</div>
				</div>

				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='bg-gray-100'>
								<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
									License details
								</th>
								<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
									Credits
								</th>
								<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{qualifications.slice(0, 3).map((qual, index) => (
								<tr key={index}>
									<td className='p-4 border-b border-gray-200 text-sm text-gray-700 font-semibold'>
										{qual.name}
									</td>
									<td className='p-4 border-b border-gray-200 text-sm font-semibold text-gray-800'>
										{qual.credits}
									</td>
									<td className='p-4 border-b border-gray-200'>
										<span
											className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
												qual.status === 'Approved'
													? 'bg-green-100 text-green-800'
													: 'bg-amber-100 text-amber-700'
											}`}
										>
											{qual.status}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<button
					className='w-full p-4 bg-white border-t border-gray-200 text-gray-700 font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-200'
					onClick={() => setModalOpen(true)}
				>
					View All
					<ChevronDown size={16} />
				</button>
			</div>

			{modalOpen && (
				<div
					className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'
					onClick={() => setModalOpen(false)}
				>
					<div
						className='bg-white w-11/12 max-w-2xl max-h-[90vh] rounded-xl overflow-hidden'
						onClick={(e) => e.stopPropagation()}
					>
						<div className='p-4 border-b border-gray-200 flex justify-between items-center'>
							<h2 className='font-semibold'>All Qualifications</h2>
							<button
								className='p-2 text-gray-700'
								onClick={() => setModalOpen(false)}
							>
								<X size={16} />
							</button>
						</div>
						<div className='overflow-y-auto max-h-[calc(90vh-4rem)]'>
							<div className='overflow-x-auto'>
								<table className='w-full'>
									<thead>
										<tr className='bg-gray-100'>
											<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
												License details
											</th>
											<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
												Credits
											</th>
											<th className='text-left p-4 text-sm text-gray-700 font-semibold'>
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{qualifications.map((qual, index) => (
											<tr key={index}>
												<td className='p-4 border-b border-gray-200 text-sm text-gray-700 font-semibold'>
													{qual.name}
												</td>
												<td className='p-4 border-b border-gray-200 text-sm font-semibold text-gray-800'>
													{qual.credits}
												</td>
												<td className='p-4 border-b border-gray-200'>
													<span
														className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
															qual.status === 'Approved'
																? 'bg-green-100 text-green-800'
																: 'bg-amber-100 text-amber-700'
														}`}
													>
														{qual.status}
													</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default QualificationsTable;
