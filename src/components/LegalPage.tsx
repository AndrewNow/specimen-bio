import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { LegalPageContent, SiteChromeContent } from '../lib/sanity/types';
import { openCookieConsent } from '../lib/analytics';
import { ContactDrawerProvider } from './contact/ContactDrawerProvider';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';
import { Button } from './ui/Button';

const proseComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="text-foreground-secondary text-base leading-relaxed md:text-lg">{children}</p>
		),
		h2: ({ children }) => (
			<h2 className="text-foreground mt-12 text-2xl tracking-tight first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-foreground mt-8 text-xl tracking-tight md:text-2xl">{children}</h3>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="text-foreground-secondary mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed md:text-lg">
				{children}
			</ul>
		),
		number: ({ children }) => (
			<ol className="text-foreground-secondary mt-4 list-decimal space-y-2 pl-6 text-base leading-relaxed md:text-lg">
				{children}
			</ol>
		),
	},
	marks: {
		strong: ({ children }) => <strong className="text-foreground font-medium">{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
		link: ({ children, value }) => (
			<a
				href={value?.href}
				className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
			>
				{children}
			</a>
		),
	},
};

function formatDate(iso: string) {
	const date = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function LegalPage({
	chrome,
	page,
}: {
	chrome: SiteChromeContent;
	page: LegalPageContent;
}) {
	const isCookieSettings = page.slug === 'cookie-settings';

	return (
		<ContactDrawerProvider forms={chrome.contactForms}>
			<Navbar settings={chrome.siteSettings} />
			<main className="bg-background min-h-dvh pt-24 pb-20 md:pt-28 md:pb-28">
				<article
					className={
						isCookieSettings
							? 'mx-auto max-w-2xl px-6 text-left md:px-10'
							: 'mx-auto max-w-2xl px-6 text-center md:px-10'
					}
				>
					<p className="text-secondary text-xs tracking-wide uppercase">Legal</p>
					<h1 className="text-foreground mt-4 text-3xl tracking-tight md:text-5xl">
						{page.title}
					</h1>
					{page.lastUpdated && (
						<p className="text-foreground-secondary mt-4 text-sm">
							Last updated {formatDate(page.lastUpdated)}
						</p>
					)}
					{page.intro && (
						<p
							className={
								isCookieSettings
									? 'text-foreground-secondary mt-8 max-w-xl text-base leading-relaxed md:text-lg'
									: 'text-foreground-secondary mx-auto mt-8 max-w-xl text-base leading-relaxed md:text-lg'
							}
						>
							{page.intro}
						</p>
					)}
					<div className="mt-12 space-y-5">
						<PortableText value={page.body} components={proseComponents} />
					</div>
					{isCookieSettings && (
						<div className="mt-12">
							<Button variant="solid" size="md" onClick={openCookieConsent}>
								Manage cookie preferences
							</Button>
						</div>
					)}
				</article>
			</main>
			<Footer settings={chrome.siteSettings} />
		</ContactDrawerProvider>
	);
}
