import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function SectionWrapper({ className, ...props }: HTMLAttributes<HTMLElement>) {
	return (
		<section
			className={cn('mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-32 lg:px-16', className)}
			{...props}
		/>
	);
}
