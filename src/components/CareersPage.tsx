import type { CareersPageContent, JobListingSummary, SiteChromeContent } from '../lib/sanity/types';
import { formatJobDate, jobMetaParts } from '../lib/careers';
import { ContactDrawerProvider } from './contact/ContactDrawerProvider';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';

export function CareersPage({
	chrome,
	page,
	jobs,
}: {
	chrome: SiteChromeContent;
	page: CareersPageContent;
	jobs: JobListingSummary[];
}) {
	return (
		<ContactDrawerProvider forms={chrome.contactForms}>
			<Navbar settings={chrome.siteSettings} />
			<main className="bg-background min-h-dvh pt-24 pb-20 md:pt-28 md:pb-28">
				<section className="mx-auto max-w-2xl px-6 text-left md:px-10">
					<h1 className="text-foreground text-3xl tracking-tight md:text-5xl">
						{page.title}
					</h1>
					{page.intro && (
						<p className="text-foreground-secondary mt-8 text-base leading-relaxed md:text-lg">
							{page.intro}
						</p>
					)}

					<div className="mt-14">
						{jobs.length === 0 ? (
							<p className="text-foreground-secondary text-base leading-relaxed md:text-lg">
								{page.emptyState ??
									'We do not have any open roles right now. Check back soon.'}
							</p>
						) : (
							<ul className="divide-y divide-border border-y border-border">
								{jobs.map((job) => {
									const meta = jobMetaParts(job);
									return (
										<li key={job.slug}>
											<a
												href={`/careers/${job.slug}`}
												className="block py-8 transition-opacity hover:opacity-70"
											>
												<div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
													<h2 className="text-foreground text-xl tracking-tight md:text-2xl">
														{job.title}
													</h2>
													{job.postedAt && (
														<p className="text-foreground-secondary shrink-0 text-sm">
															{formatJobDate(job.postedAt)}
														</p>
													)}
												</div>
												{meta.length > 0 && (
													<p className="text-secondary mt-2 text-sm tracking-wide">
														{meta.join(' · ')}
													</p>
												)}
												<p className="text-foreground-secondary mt-3 text-base leading-relaxed">
													{job.summary}
												</p>
												<span className="text-foreground mt-4 inline-block text-sm underline underline-offset-4">
													View role
												</span>
											</a>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</section>
			</main>
			<Footer settings={chrome.siteSettings} />
		</ContactDrawerProvider>
	);
}
