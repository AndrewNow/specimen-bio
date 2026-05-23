'use client';

import { animate, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
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
	const isInView = useInView(ref, { once: true, margin: '-80px' });
	const motionValue = useMotionValue(0);
	const rounded = useTransform(motionValue, (latest) => Math.round(latest));
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (!isInView) return;
		if (prefersReducedMotion) {
			motionValue.set(value);
			return;
		}
		const controls = animate(motionValue, value, { duration, ease: 'easeOut' });
		return () => controls.stop();
	}, [isInView, motionValue, value, duration, prefersReducedMotion]);

	useEffect(() => {
		const unsubscribe = rounded.on('change', (latest) => {
			if (ref.current) {
				ref.current.textContent = `${latest}${suffix}`;
			}
		});
		return unsubscribe;
	}, [rounded, suffix]);

	return (
		<span ref={ref} className={cn(className)}>
			0{suffix}
		</span>
	);
}
