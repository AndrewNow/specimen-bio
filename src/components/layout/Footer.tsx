import { Linkedin01Icon } from 'hugeicons-react';
import type { SiteSettings } from '../../lib/sanity/types';
import { ctaOnClick } from '../../lib/cta';
import { useContactDrawer } from '../contact/useContactDrawer';

const linkClass = 'text-sm text-white/60 transition-colors hover:text-white';

export function Footer({ settings }: { settings: SiteSettings }) {
	const { open } = useContactDrawer();

	const {
		siteName,
		footerTagline,
		linkedinUrl,
		footerCompanyLinks,
		footerServiceLinks,
		footerLegalLinks,
		contactEmail,
		copyrightName,
	} = settings;

	return (
		<footer id="site-footer" className="bg-foreground text-background border-t border-white/10">
			<div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<p>{siteName}</p>
						{footerTagline && <p className="mt-2 text-sm text-white/50">{footerTagline}</p>}
						{linkedinUrl && (
							<div className="mt-4 flex gap-3">
								<a
									href={linkedinUrl}
									className="text-white/50 transition-colors hover:text-white"
									aria-label="LinkedIn"
								>
									<Linkedin01Icon size={18} strokeWidth={1.5} />
								</a>
							</div>
						)}
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Company</p>
						<ul className="mt-4 space-y-2">
							{footerCompanyLinks.map((link) => (
								<li key={link.label}>
									<a href={link.href} className={linkClass}>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Services</p>
						<ul className="mt-4 space-y-2">
							{footerServiceLinks.map((link) =>
								link.action === 'link' ? (
									<li key={link.label}>
										<a href={link.href ?? '#'} className={linkClass}>
											{link.label}
										</a>
									</li>
								) : (
									<li key={link.label}>
										<button
											type="button"
											onClick={ctaOnClick(link, open)}
											className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white"
										>
											{link.label}
										</button>
									</li>
								),
							)}
						</ul>
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Contact</p>
						<ul className="mt-4 space-y-2 text-sm text-white/60">
							<li>
								<a href={`mailto:${contactEmail}`} className="transition-colors hover:text-white">
									{contactEmail}
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
					<p className="text-sm text-white/40">
						© {new Date().getFullYear()} {copyrightName ?? siteName}. All rights reserved.
					</p>
					{footerLegalLinks.length > 0 && (
						<div className="flex gap-6 text-sm text-white/50">
							{footerLegalLinks.map((link) => (
								<a key={link.label} href={link.href} className="transition-colors hover:text-white">
									{link.label}
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}
