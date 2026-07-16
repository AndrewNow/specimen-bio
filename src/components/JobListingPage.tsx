import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { JobListingContent, SiteChromeContent } from '../lib/sanity/types';
import { formatJobDate, jobMetaParts } from '../lib/careers';
import { ContactDrawerProvider } from './contact/ContactDrawerProvider';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';

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

const primaryButtonClass =
	'inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85';
const secondaryButtonClass =
	'inline-flex items-center justify-center rounded-full border border-muted bg-transparent px-5 py-3 text-sm font-medium text-foreground transition-opacity hover:bg-surface';

export function JobListingPage({
	chrome,
	job,
}: {
	chrome: SiteChromeContent;
	job: JobListingContent;
}) {
	const meta = jobMetaParts(job);
	const mailto = job.applyEmail
		? `mailto:${job.applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`
		: null;

	return (
		<ContactDrawerProvider forms={chrome.contactForms}>
			<Navbar settings={chrome.siteSettings} />
			<main className="bg-background min-h-dvh pt-24 pb-20 md:pt-28 md:pb-28">
				<article className="mx-auto max-w-2xl px-6 text-left md:px-10">
					<a
						href="/careers"
						className="text-secondary text-xs tracking-wide uppercase transition-opacity hover:opacity-70"
					>
						← Careers
					</a>
					<h1 className="text-foreground mt-4 text-3xl tracking-tight md:text-5xl">
						{job.title}
					</h1>
					{meta.length > 0 && (
						<p className="text-secondary mt-4 text-sm tracking-wide">{meta.join(' · ')}</p>
					)}
					{job.postedAt && (
						<p className="text-foreground-secondary mt-2 text-sm">
							Posted {formatJobDate(job.postedAt)}
						</p>
					)}
					{job.summary && (
						<p className="text-foreground-secondary mt-8 text-base leading-relaxed md:text-lg">
							{job.summary}
						</p>
					)}

					{(job.applyUrl || mailto) && (
						<div className="mt-10 flex flex-wrap gap-3">
							{job.applyUrl && (
								<a
									href={job.applyUrl}
									target="_blank"
									rel="noopener noreferrer"
									className={primaryButtonClass}
								>
									Apply
								</a>
							)}
							{mailto && (
								<a
									href={mailto}
									className={job.applyUrl ? secondaryButtonClass : primaryButtonClass}
								>
									{job.applyUrl ? 'Email to apply' : 'Apply by email'}
								</a>
							)}
						</div>
					)}

					<div className="mt-12 space-y-5">
						<PortableText value={job.body} components={proseComponents} />
					</div>

					{(job.applyUrl || mailto) && (
						<div className="mt-14 border-t border-border pt-10">
							<h2 className="text-foreground text-xl tracking-tight md:text-2xl">
								Interested?
							</h2>
							<p className="text-foreground-secondary mt-3 text-base leading-relaxed">
								Apply using the options below. Include a brief note on relevant experience.
							</p>
							<div className="mt-6 flex flex-wrap gap-3">
								{job.applyUrl && (
									<a
										href={job.applyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className={primaryButtonClass}
									>
										Apply
									</a>
								)}
								{mailto && (
									<a
										href={mailto}
										className={job.applyUrl ? secondaryButtonClass : primaryButtonClass}
									>
										{job.applyUrl ? 'Email to apply' : 'Apply by email'}
									</a>
								)}
							</div>
						</div>
					)}
				</article>
			</main>
			<Footer settings={chrome.siteSettings} />
		</ContactDrawerProvider>
	);
}
