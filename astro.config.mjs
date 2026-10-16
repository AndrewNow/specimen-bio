// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	adapter: vercel({
		// Cache server-rendered pages at the edge. The first request after
		// `expiration` regenerates in the background, so CMS edits show up
		// within about a minute without making every visit wait on Sanity.
		isr: {
			expiration: 60,
			exclude: [/^\/api(?:\/|$)/, /^\/studio(?:\/|$)/],
		},
	}),
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'hover',
	},
	integrations: [
		sanity({
			projectId: 'gos2rlzf',
			dataset: 'production',
			apiVersion: '2024-01-01',
			// Studio needs live authenticated APIs; the site CDN client stays elsewhere.
			useCdn: false,
			studioBasePath: '/studio',
		}),
		react(),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
