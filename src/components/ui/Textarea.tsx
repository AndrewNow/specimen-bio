import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	return (
		<textarea
			className={cn(
				'border-border bg-background text-foreground placeholder:text-foreground-secondary min-h-28 w-full resize-y rounded-xl border px-3.5 py-2.5 text-sm transition-colors',
				'focus:border-foreground focus:ring-foreground/10 focus:ring-2 focus:outline-none',
				className,
			)}
			{...props}
		/>
	);
}
