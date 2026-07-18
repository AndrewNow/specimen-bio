import { useEffect, useRef, type ReactNode } from 'react';

const DESKTOP_MQ = '(min-width: 1280px)';

/** Pins end-of-page chrome (CTA + footer) from xl up and sizes body padding for the reveal. */
export function FixedRevealEnd({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const mq = window.matchMedia(DESKTOP_MQ);

		function syncHeight() {
			if (!mq.matches) {
				document.documentElement.style.removeProperty('--footer-height');
				return;
			}
			document.documentElement.style.setProperty('--footer-height', `${el!.offsetHeight}px`);
		}

		syncHeight();
		const observer = new ResizeObserver(syncHeight);
		observer.observe(el);
		mq.addEventListener('change', syncHeight);

		return () => {
			observer.disconnect();
			mq.removeEventListener('change', syncHeight);
			document.documentElement.style.removeProperty('--footer-height');
		};
	}, []);

	return (
		<div ref={ref} className="xl:fixed xl:inset-x-0 xl:bottom-0 xl:z-0">
			{children}
		</div>
	);
}
