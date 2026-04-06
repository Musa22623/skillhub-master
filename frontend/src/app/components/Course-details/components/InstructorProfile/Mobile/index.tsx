/** @format */

import Image from 'next/image';
import React, {useState} from 'react';
import {Button} from '@/app/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import { CourseSvg, StudentSvg } from '@/app/components/svg';

export default function InstructorProfile() {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<div className=' bg-white rounded-xl p-4 lg:p-8 shadow-md relative'>
			<div className='flex items-center justify-between mb-4 lg:mb-8'>
				<h2 className='text-[28px] text-[#1C1D1F] font-bold '>Instructor</h2>
				<div className='flex items-center gap-4'>
					<Button variant='outline' className='rounded-full size-8'>
						<ChevronLeft />
					</Button>
					<Button variant='outline' className='rounded-full size-8'>
						<ChevronRight />
					</Button>
				</div>
			</div>

			<div className='flex flex-col gap-6 lg:mb-6 relative'>
				<div className='flex gap-4 border-b'>
					<div className='relative size-[80px] lg:size-[110px] rounded-full overflow-hidden'>
						<Image
							src='https://i.ibb.co/BKststd4/AVATAR-Dribble.jpg'
							alt='Jose Portilla'
							width={110}
							height={110}
							className='w-full h-full object-cover'
						/>
					</div>

					<div className=''>
						<h3 className='text-[#2CBEC6] text-xl lg:text-2xl font-bold mb-2 flex items-center gap-2'>
							Jose Portilla
							<svg
								className='w-5 h-5 text-[#2CBEC6]'
								viewBox='0 0 24 24'
								fill='none'
							>
								<path
									d='M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</h3>

						<div className='text-base lg:text-lg text-[#1C1D1F] font-semibold mb-4'>
							Head of Data Science at Pierian Training
						</div>

						<div className='flex flex-col gap-2 mb-4'>
							<div className='flex items-center gap-2 text-[#6A6F73] text-sm'>
								<svg className='w-6 h-6' viewBox='0 0 18.079 18.084'>
									<g
										transform='translate(-170.87 -100.777)'
										data-name='Group 818'
										id='Group_818'
									>
										<path
											fill='#2CBEC6'
											transform='translate(0 0)'
											d='M179.865,100.778a.567.567,0,0,0-.239.079L177.8,101.9l-2.128.018a.565.565,0,0,0-.486.283l-1.06,1.819-1.837,1.078a.565.565,0,0,0-.283.486L172,107.693l-1.051,1.846a.566.566,0,0,0,0,.565l1.042,1.828.018,2.128a.565.565,0,0,0,.283.486l1.819,1.06,1.078,1.837a.565.565,0,0,0,.486.283l2.111.009,1.846,1.051a.566.566,0,0,0,.565,0l1.828-1.042,2.128-.018a.565.565,0,0,0,.486-.283l1.06-1.819,1.837-1.078a.565.565,0,0,0,.283-.486l.009-2.111,1.051-1.846a.566.566,0,0,0,0-.565l-1.042-1.828-.018-2.128a.565.565,0,0,0-.283-.486l-1.819-1.06-1.078-1.837a.565.565,0,0,0-.486-.283l-2.111-.009-1.846-1.051a.566.566,0,0,0-.327-.079Zm.044,1.21,1.7.971a.563.563,0,0,0,.282.08l1.934.009.989,1.687a.565.565,0,0,0,.2.2l1.669.971.017,1.952a.564.564,0,0,0,.071.283l.971,1.678-.971,1.7a.564.564,0,0,0-.08.282l-.009,1.934-1.687.989a.565.565,0,0,0-.2.2l-.971,1.669-1.952.018a.564.564,0,0,0-.283.071l-1.678.971-1.7-.971a.564.564,0,0,0-.282-.08L176,116.6l-.989-1.687a.566.566,0,0,0-.2-.2l-1.669-.971-.018-1.952a.564.564,0,0,0-.071-.283l-.971-1.678.971-1.7a.563.563,0,0,0,.08-.283l.009-1.934,1.687-.989a.565.565,0,0,0,.2-.2l.971-1.669,1.952-.018a.564.564,0,0,0,.283-.071Zm0,1.616a6.217,6.217,0,1,0,6.217,6.217A6.226,6.226,0,0,0,179.91,103.6Zm0,1.13a5.087,5.087,0,1,1-5.087,5.087A5.078,5.078,0,0,1,179.91,104.735Z'
										></path>
									</g>
								</svg>
								Top Rated
							</div>

							<div className='flex items-center gap-1.5 text-[#6A6F73] text-sm'>
								<svg className='w-5.5 h-5.5 fill-[#6A6F73]' viewBox='0 0 24 24'>
									<rect fill='none' height='24' width='24'></rect>
									<path d='M12,2C8.13,2,5,5.13,5,9c0,5.34,4.21,6.79,6.03,12.28C11.17,21.7,11.55,22,12,22s0.83-0.3,0.97-0.72 C14.79,15.79,19,14.34,19,9C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5c0-1.38,1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5 C14.5,10.38,13.38,11.5,12,11.5z' />
								</svg>
								Indore, India
							</div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-4 mb-4'>
					<div className='flex items-center gap-3 text-[#1C1D1F] bg-accent p-2 rounded-md'>
						<svg className='w-6 h-6' viewBox='0 0 19.445 25.641'>
							<path
								d='M174.989,32.883l0-.006-.923-1.679a10.8,10.8,0,0,1-.605-1.5l-.531-1.845,0-.011a2.311,2.311,0,0,0-1.394-1.394l-.011,0-1.85-.533-.024-.006a7.475,7.475,0,0,1-1.474-.6l-1.679-.923-.006,0a2.282,2.282,0,0,0-1.985,0l-.006,0-1.679.924a10.815,10.815,0,0,1-1.5.605l-1.845.531-.011,0a2.311,2.311,0,0,0-1.394,1.394l0,.011-.533,1.85-.006.024a7.475,7.475,0,0,1-.6,1.474L156,32.877l0,.006a2.289,2.289,0,0,0,0,1.985l0,.006.923,1.679a10.812,10.812,0,0,1,.606,1.5l.531,1.845,0,.011a2.311,2.311,0,0,0,1.394,1.394l.011,0,.346.1-2.356,6.02a.5.5,0,0,0,.613.661l3.319-1.021,2.03,2.537a.5.5,0,0,0,.868-.161l.977-3.07,2.05,3.189a.5.5,0,0,0,.421.23h0a.5.5,0,0,0,.421-.232l1.8-2.828,3.062.255a.5.5,0,0,0,.469-.759l-2.844-4.67.872-.251.011,0a2.311,2.311,0,0,0,1.394-1.394l0-.011.533-1.85c0-.008,0-.016.006-.024a7.483,7.483,0,0,1,.6-1.474l.924-1.679,0-.006A2.289,2.289,0,0,0,174.989,32.883ZM163.618,48.25l-1.658-2.073a.5.5,0,0,0-.538-.166l-2.653.816,2.012-5.141.537.155.024.006a7.478,7.478,0,0,1,1.474.6l1.679.923.006,0a1.959,1.959,0,0,0,.607.2Zm6.122-2.539a.5.5,0,0,0-.464.23l-1.542,2.423-2.075-3.227.522-1.64a1.773,1.773,0,0,0,.3-.125l.006,0,1.679-.924a10.793,10.793,0,0,1,1.479-.6l2.473,4.062Zm4.368-11.316-.923,1.679,0,.006a8.414,8.414,0,0,0-.687,1.706l-.528,1.832a1.325,1.325,0,0,1-.731.731l-1.844.531-.011,0a11.6,11.6,0,0,0-1.684.681l-.006,0-1.679.923a1.3,1.3,0,0,1-1.038,0l-1.679-.923-.006,0a8.414,8.414,0,0,0-1.706-.687l-1.832-.528a1.326,1.326,0,0,1-.731-.731l-.531-1.844,0-.011a11.6,11.6,0,0,0-.681-1.684l0-.006-.923-1.679a1.3,1.3,0,0,1,0-1.038l.923-1.679,0-.006a8.416,8.416,0,0,0,.687-1.706l.528-1.833a1.325,1.325,0,0,1,.731-.731l1.844-.531.011,0a11.6,11.6,0,0,0,1.684-.681l.006,0,1.679-.923a1.3,1.3,0,0,1,1.038,0l1.679.923.006,0a8.411,8.411,0,0,0,1.706.687l1.832.528a1.326,1.326,0,0,1,.731.731l.531,1.844,0,.011a11.6,11.6,0,0,0,.681,1.684l0,.006.923,1.679A1.3,1.3,0,0,1,174.107,34.394Z'
								transform='translate(-155.77 -24.152)'
								fill='#13c4cc'
							></path>
							<path
								id='Path_3040'
								data-name='Path 3040'
								d='M281.993,147.787l-1.149-2.186-1.149,2.186-2.495.392,1.794,1.71-.392,2.439,2.243-1.121,2.243,1.121-.392-2.439,1.794-1.71Z'
								transform='translate(-271.121 -139.521)'
								fill='#13c4cc'
							></path>
							<path
								d='M218.148,79.606a6.948,6.948,0,1,0,6.948,6.948A6.956,6.956,0,0,0,218.148,79.606Zm0,12.894a5.947,5.947,0,1,1,5.947-5.947A5.953,5.953,0,0,1,218.148,92.5Z'
								transform='translate(-208.425 -76.83)'
								fill='#13c4cc'
							></path>
						</svg>
						<div>
							<div className='text-sm leading-tight font-semibold'>4.8 </div>
							<div>Instructor Rating</div>
						</div>
					</div>

					<div className='flex items-center gap-3 text-[#1C1D1F] bg-accent p-2 rounded-md'>
						<svg className='w-6 h-6' viewBox='0 0 25.548 15.169'>
							<path
								d='M-548,63.808a1.115,1.115,0,0,0,.284-1.149,1.114,1.114,0,0,0-.905-.763l-4.044-.588a.132.132,0,0,1-.1-.072l-1.809-3.664,0,0a1.114,1.114,0,0,0-1-.622,1.114,1.114,0,0,0-1.005.625l-1.808,3.664a.132.132,0,0,1-.1.072l-4.044.588a1.114,1.114,0,0,0-.905.763,1.114,1.114,0,0,0,.284,1.149l2.926,2.852a.132.132,0,0,1,.038.117l-.691,4.028a1.114,1.114,0,0,0,.446,1.1,1.112,1.112,0,0,0,.658.215,1.127,1.127,0,0,0,.523-.13l3.617-1.9a.134.134,0,0,1,.122,0l3.617,1.9a1.128,1.128,0,0,0,.523.13,1.113,1.113,0,0,0,.658-.215,1.114,1.114,0,0,0,.446-1.1l-.691-4.028a.132.132,0,0,1,.038-.116Zm-11.908,7.164.691-4.028a1.121,1.121,0,0,0-.322-.992l-2.926-2.852a.124.124,0,0,1-.033-.135.124.124,0,0,1,.106-.089l4.044-.588a1.121,1.121,0,0,0,.844-.613l1.809-3.665a.125.125,0,0,1,.118-.073.124.124,0,0,1,.117.071v0l1.809,3.664a1.121,1.121,0,0,0,.844.613l4.044.588a.124.124,0,0,1,.106.09.124.124,0,0,1-.033.134l-2.926,2.853a1.121,1.121,0,0,0-.324.986v.007l.691,4.028a.125.125,0,0,1-.052.128.137.137,0,0,1-.078.027.131.131,0,0,1-.061-.017l-3.617-1.9a1.125,1.125,0,0,0-.522-.129,1.123,1.123,0,0,0-.522.129l-3.617,1.9a.132.132,0,0,1-.062.017.135.135,0,0,1-.077-.026A.125.125,0,0,1-559.906,70.972Z'
								transform='translate(568.351 -56.947)'
								fill='#13c4cc'
							></path>
							<g
								id='Group_820'
								data-name='Group 820'
								transform='translate(0 0.87)'
							>
								<path
									id='Path_3043'
									data-name='Path 3043'
									d='M-696.547,85.058l1.228-2.489,1,2.049a.4.4,0,0,0,.382.226.7.7,0,0,0,.2-.033.432.432,0,0,0,.3-.255.4.4,0,0,0-.03-.324l-1.05-2.142a.9.9,0,0,0-.813-.506.9.9,0,0,0-.813.505l-1.251,2.535-2.8.407a.9.9,0,0,0-.732.617.9.9,0,0,0,.229.929l2.025,1.973-.478,2.787a.9.9,0,0,0,.36.886.9.9,0,0,0,.532.174h0a.91.91,0,0,0,.423-.1l2.5-1.316,1.189.624a.215.215,0,0,0,.048.018.541.541,0,0,0,.123.013.451.451,0,0,0,.452-.337.43.43,0,0,0-.22-.546l-1.17-.614a.909.909,0,0,0-.422-.1.908.908,0,0,0-.422.1l-2.457,1.292.469-2.736a.907.907,0,0,0-.261-.8l-1.988-1.937,2.747-.4A.906.906,0,0,0-696.547,85.058Z'
									transform='translate(700.958 -81.585)'
									fill='#13c4cc'
								></path>
								<path
									d='M-188.48,85.058l-1.228-2.489-1,2.049a.4.4,0,0,1-.382.226.7.7,0,0,1-.2-.033.431.431,0,0,1-.3-.255.4.4,0,0,1,.03-.324l1.05-2.142a.9.9,0,0,1,.813-.506.9.9,0,0,1,.813.505l1.251,2.535,2.8.407a.9.9,0,0,1,.732.617.9.9,0,0,1-.229.929l-2.025,1.973.478,2.787a.9.9,0,0,1-.36.886.9.9,0,0,1-.532.174h0a.911.911,0,0,1-.423-.1l-2.5-1.316-1.189.624a.215.215,0,0,1-.048.018.541.541,0,0,1-.123.013.451.451,0,0,1-.452-.337.43.43,0,0,1,.22-.546l1.17-.614a.91.91,0,0,1,.422-.1.908.908,0,0,1,.422.1l2.457,1.292-.469-2.736a.907.907,0,0,1,.261-.8l1.988-1.937-2.747-.4A.906.906,0,0,1-188.48,85.058Z'
									transform='translate(209.618 -81.585)'
									fill='#13c4cc'
								></path>
							</g>
						</svg>
						<div>
							<div className='text-sm leading-tight font-semibold'>135,182 </div>
							<div>Reviews</div>
						</div>
					</div>

					<div className='flex items-center gap-3 text-[#1C1D1F] bg-accent p-2 rounded-md'>
					<StudentSvg className='size-6 fill-[#13c4cc]'/>
						<div>
							<div className='text-sm leading-tight font-semibold'>263,854</div>
							<div>Students</div>
						</div>
					</div>

					<div className='flex items-center gap-3 text-[#1C1D1F] bg-accent p-2 rounded-md'>
					<CourseSvg className='size-6 fill-[#13c4cc]'/>
						<div>
							<div className='text-sm leading-tight font-semibold'>36</div>
							<div>Courses</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={`text-[#1C1D1F] text-[15px] leading-relaxed lg:mt-12 ${
					!expanded ? 'max-h-20 overflow-hidden' : ''
				}`}
			>
				Passages des Lorem Ipsum, aber der Hauptteil erlitt Ände rungen in
				irgendeiner Form, durch Humor oder zufällige Wörter wel che nicht einmal
				ansatzweise glaubwdurch Humor oder zufällige Wörter wel che nicht einmal
				ansatzweisürdig aussehen. Wenn du eine Passage des Lorem Ipsum nutzt,
				solltest du aufpassen dass in der Mitte des Textes keine ungewollten
				Wörter stehen...
			</div>

			<div
				className='text-[#2CBEC6] text-sm font-semibold cursor-pointer flex items-center gap-1 lg:mt-4'
				onClick={toggleExpand}
			>
				SHOW MORE
				<svg
					className={`w-4 h-4 transition-transform duration-200 ${
						expanded ? 'rotate-180' : ''
					}`}
					viewBox='0 0 24 24'
					fill='none'
				>
					<path
						d='M19 9L12 16L5 9'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</div>
		</div>
	);
}
