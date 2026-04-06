/** @format */

'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import {cn} from '@/lib/utils';

type CustomProgressProps = React.ComponentPropsWithoutRef<
	typeof ProgressPrimitive.Root
> & {
	indicatorColor?: string;
};

const Progress = ({
	className,
	value,
	indicatorColor,
	...props
}: CustomProgressProps) => (
	<ProgressPrimitive.Root
		className={cn(
			'relative h-4 w-full overflow-hidden rounded-full bg-white',
			className
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className={`h-full w-full flex-1 transition-all bg-primary ${indicatorColor}`}
			style={{transform: `translateX(-${100 - (value || 0)}%)`}}
		/>
	</ProgressPrimitive.Root>
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export {Progress};
