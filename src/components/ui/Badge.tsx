import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn('text-orange inline-flex py-1 text-xs tracking-wider uppercase', className)}
			{...props}
		/>
	);
}
