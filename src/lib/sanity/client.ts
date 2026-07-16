import { createClient } from '@sanity/client';

/**
 * Read-only Sanity client used to hydrate the site's content at request time.
 * The production dataset is public, so no token is required for published reads.
 * Project id / dataset can be overridden via env for other environments.
 */
export const sanityClient = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? 'gos2rlzf',
	dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
	apiVersion: '2024-01-01',
	// Skip the CDN in local dev so Studio edits show up immediately.
	useCdn: import.meta.env.PROD,
	perspective: 'published',
});
