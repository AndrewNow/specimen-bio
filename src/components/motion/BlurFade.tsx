'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BlurFadeProps {
	children: ReactNode;
	className?: string;
	delay?: number;
	duration?: number;
	direction?: 'up' | 'down' | 'left' | 'right';
	blur?: string;
	inView?: boolean;
	inViewMargin?: string;
}

export function BlurFade({
	children,
	className,
	delay = 0,
	duration = 0.5,
	direction = 'up',
	blur = '6px',
	inView = true,
	inViewMargin = '-50px',
}: BlurFadeProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: inViewMargin as `${number}px` });
	const shouldAnimate = !inView || isInView;
	const prefersReducedMotion = useReducedMotion();

	const offset = 12;
	const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
	const value =
		direction === 'right' || direction === 'down' ? -offset : offset;

	if (prefersReducedMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			ref={ref}
			className={cn(className)}
			initial={{ opacity: 0, filter: `blur(${blur})`, [axis]: value }}
			animate={
				shouldAnimate
					? { opacity: 1, filter: 'blur(0px)', [axis]: 0 }
					: { opacity: 0, filter: `blur(${blur})`, [axis]: value }
			}
			transition={{ delay, duration, ease: 'easeOut' }}
		>
			{children}
		</motion.div>
	);
}
