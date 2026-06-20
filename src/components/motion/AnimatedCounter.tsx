'use client';

import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface AnimatedCounterProps {
	value: number;
	suffix?: string;
	className?: string;
	duration?: number;
}

export function AnimatedCounter({
	value,
	suffix = '',
	className,
	duration = 1.2,
}: AnimatedCounterProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });
	const motionValue = useMotionValue(0);
	const display = useTransform(motionValue, (latest) => `${Math.round(latest)}${suffix}`);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (!isInView) return;

		if (prefersReducedMotion) {
			motionValue.set(value);
			return;
		}

		motionValue.set(0);
		const controls = animate(motionValue, value, { duration, ease: 'easeOut' });
		return () => controls.stop();
	}, [isInView, motionValue, value, duration, prefersReducedMotion]);

	return (
		<motion.span ref={ref} className={cn(className)}>
			{display}
		</motion.span>
	);
}
