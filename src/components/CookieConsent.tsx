import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
	getStoredConsent,
	OPEN_COOKIE_CONSENT_EVENT,
	setStoredConsent,
	updateAnalyticsConsent,
	type CookieConsentValue,
} from '../lib/analytics';
import { Button } from './ui/Button';

const SHOW_DELAY_MS = 2500;

export function CookieConsent() {
	const [visible, setVisible] = useState(false);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout> | undefined;

		const show = () => setVisible(true);

		const stored = getStoredConsent();
		if (!stored) {
			timeoutId = setTimeout(show, SHOW_DELAY_MS);
		}

		const onOpen = () => {
			if (timeoutId) clearTimeout(timeoutId);
			show();
		};

		window.addEventListener(OPEN_COOKIE_CONSENT_EVENT, onOpen);
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			window.removeEventListener(OPEN_COOKIE_CONSENT_EVENT, onOpen);
		};
	}, []);

	function choose(value: CookieConsentValue) {
		setStoredConsent(value);
		updateAnalyticsConsent(value);
		setVisible(false);
	}

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					role="dialog"
					aria-label="Cookie consent"
					aria-live="polite"
					className="border-border/40 bg-background fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-8px_20px_rgba(0,0,0,0.03)]"
					initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
					exit={
						prefersReducedMotion
							? undefined
							: { opacity: 0, y: 16, transition: { duration: 0.2, ease: 'easeIn' } }
					}
				>
					<div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-10 lg:px-16">
						<p className="text-foreground-secondary min-w-0 flex-1 text-[11px] leading-snug sm:text-xs">
							<span className="text-foreground font-medium">We use Cookies</span> for analytics.{' '}
							<a
								href="/legal/cookie-settings"
								className="text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
							>
								Details
							</a>
						</p>
						<div className="flex shrink-0 gap-1 sm:gap-2">
							<Button
								variant="ghost"
								size="sm"
								className="h-7 px-2.5 text-xs"
								onClick={() => choose('denied')}
							>
								Decline
							</Button>
							<Button
								variant="solid"
								size="sm"
								className="h-7 px-2.5 text-xs"
								onClick={() => choose('granted')}
							>
								Accept
							</Button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
