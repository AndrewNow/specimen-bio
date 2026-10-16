/**
 * Downscales a Sanity CDN image URL. `auto=format` negotiates WebP/AVIF.
 * Unrecognized URLs are returned unchanged.
 */
export function sanityImageUrl(
	url: string,
	{ width, height, quality = 75 }: { width: number; height?: number; quality?: number },
): string {
	try {
		const parsed = new URL(url);
		parsed.searchParams.set('auto', 'format');
		parsed.searchParams.set('q', String(quality));
		parsed.searchParams.set('w', String(width));
		parsed.searchParams.set('fit', height ? 'crop' : 'max');
		if (height) parsed.searchParams.set('h', String(height));
		return parsed.toString();
	} catch {
		return url;
	}
}
