import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={cn(
				'inline-flex py-1 text-xs uppercase tracking-wider text-orange',
				className,
			)}
			{...props}
		/>
	);
}
