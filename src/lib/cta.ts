import type { CtaContent } from './sanity/types';
import type { ContactFormType } from '../components/contact/types';

type OpenDrawer = (type: ContactFormType) => void;

/**
 * Resolves a CMS call-to-action into an onClick handler. Form actions open the
 * matching contact drawer; link actions navigate (anchors scroll in-page).
 */
export function ctaOnClick(cta: CtaContent | null | undefined, open: OpenDrawer): () => void {
	if (!cta) return () => {};
	if (cta.action === 'providerForm') return () => open('provider');
	if (cta.action === 'requestForm') return () => open('request');
	return () => {
		if (cta.href) window.location.href = cta.href;
	};
}
