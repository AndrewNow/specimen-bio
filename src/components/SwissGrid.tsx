import { cn } from '../lib/utils';

export function SwissGrid({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				'pointer-events-none absolute inset-0 z-0 grid grid-cols-12 opacity-30',
				className,
			)}
			aria-hidden="true"
		>
			{Array.from({ length: 12 }).map((_, i) => (
				<div key={i} className="border-border/40 border-l" />
			))}
		</div>
	);
}
