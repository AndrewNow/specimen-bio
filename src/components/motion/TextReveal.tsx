'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '../../lib/utils';

interface TextRevealProps {
	text: string;
	className?: string;
	per?: 'word' | 'line';
	delay?: number;
}

export function TextReveal({ text, className, per = 'word', delay = 0 }: TextRevealProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, margin: '-50px' });
	const prefersReducedMotion = useReducedMotion();

	const parts = per === 'line' ? text.split('\n') : text.split(' ');

	if (prefersReducedMotion) {
		return <span className={className}>{text}</span>;
	}

	return (
		<span ref={ref} className={cn('inline', className)} aria-label={text}>
			{parts.map((part, i) => (
				<motion.span
					key={`${part}-${i}`}
					className="inline-block"
					initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
					animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
					transition={{
						delay: delay + i * 0.08,
						duration: 0.5,
						ease: 'easeOut',
					}}
				>
					{part}
					{per === 'word' && i < parts.length - 1 ? '\u00A0' : null}
					{per === 'line' && i < parts.length - 1 ? <br /> : null}
				</motion.span>
			))}
		</span>
	);
}
