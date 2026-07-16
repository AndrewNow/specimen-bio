export const GA_MEASUREMENT_ID = 'G-J0TS7Y44FD';

export const COOKIE_CONSENT_KEY = 'specimenbio-cookie-consent';

export type CookieConsentValue = 'granted' | 'denied';

export const OPEN_COOKIE_CONSENT_EVENT = 'open-cookie-consent';

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag: (...args: unknown[]) => void;
	}
}

export function getStoredConsent(): CookieConsentValue | null {
	if (typeof window === 'undefined') return null;
	const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
	if (value === 'granted' || value === 'denied') return value;
	return null;
}

export function setStoredConsent(value: CookieConsentValue) {
	window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
}

export function updateAnalyticsConsent(value: CookieConsentValue) {
	if (typeof window.gtag !== 'function') return;
	window.gtag('consent', 'update', {
		analytics_storage: value,
	});
}

export function openCookieConsent() {
	window.dispatchEvent(new CustomEvent(OPEN_COOKIE_CONSENT_EVENT));
}
