import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={cn(
				'border-border bg-background text-foreground placeholder:text-foreground-secondary h-10 w-full rounded-xl border px-3.5 text-sm transition-colors',
				'focus:border-foreground focus:ring-foreground/10 focus:ring-2 focus:outline-none',
				className,
			)}
			{...props}
		/>
	);
}
