import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

const cardVariants = cva('rounded-2xl p-6 md:p-8', {
	variants: {
		variant: {
			solid: 'bg-surface',
			outline: 'bg-transparent border border-border',
		},
	},
	defaultVariants: {
		variant: 'solid',
	},
});

export interface CardProps
	extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
	featured?: boolean;
}

export function Card({ className, variant, featured, ...props }: CardProps) {
	return (
		<div
			className={cn(cardVariants({ variant }), featured && 'rounded-3xl', className)}
			{...props}
		/>
	);
}
