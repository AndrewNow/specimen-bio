import { useEffect, useState } from 'react';
import { scheduleIdle } from '../../lib/idle';

type GrainGradientComponent = typeof import('./grainGradient').GrainGradient;

const shaderProps = {
	className: 'h-full w-full',
	width: '100%',
	height: '100%',
	colors: ['#a3a3a34f', '#ffffff0a', '#d1d2d04a', '#a56a5563'],
	colorBack: '#ffffff',
	softness: 0.56,
	intensity: 1,
	noise: 0.21,
	shape: 'blob',
	speed: 0.44,
	scale: 2.56,
	rotation: 192,
	offsetX: -0.52,
} as const;

export function HeroBackground() {
	const [Grain, setGrain] = useState<GrainGradientComponent | null>(null);

	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
			.connection;
		if (connection?.saveData) return;

		return scheduleIdle(() => {
			void import('./grainGradient').then((mod) => {
				setGrain(() => mod.GrainGradient);
			});
		});
	}, []);

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			<div className="hero-shader-fallback absolute inset-0" />
			{Grain && (
				<div className="hero-shader absolute inset-0">
					<Grain {...shaderProps} />
				</div>
			)}
		</div>
	);
}
