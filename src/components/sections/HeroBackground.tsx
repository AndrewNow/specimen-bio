'use client';

import { GrainGradient } from '@paper-design/shaders-react';

export function HeroBackground() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			<GrainGradient
				className="h-full w-full"
				width="100%"
				height="100%"
				colors={['#a3a3a34f', '#ffffff0a', '#d1d2d04a', '#a56a5563']}
				colorBack="#ffffff"
				softness={0.56}
				intensity={1}
				noise={0.21}
				shape="blob"
				speed={0.44}
				scale={2.56}
				rotation={192}
				offsetX={-0.52}
			/>
		</div>
	);
}
