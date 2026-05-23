import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
	'inline-flex cursor-pointer items-center gap-2 rounded-full font-medium transition-all duration-150',
	{
		variants: {
			variant: {
				solid: 'bg-foreground text-background hover:opacity-85',
				outline: 'border border-muted bg-transparent text-foreground hover:bg-surface',
				ghost: 'bg-transparent text-foreground hover:bg-surface',
			},
			size: {
				sm: 'h-8 px-4 py-1.5 text-sm',
				md: 'h-10 px-5 py-2 text-sm',
				lg: 'h-12 px-7 py-3 text-base',
			},
		},
		defaultVariants: {
			variant: 'solid',
			size: 'md',
		},
	},
);

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	icon?: ReactNode;
	trailingIcon?: ReactNode;
}

export function Button({
	className,
	variant,
	size,
	icon,
	trailingIcon,
	children,
	...props
}: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, size }), className)} type="button" {...props}>
			{icon}
			{children}
			{trailingIcon}
		</button>
	);
}
