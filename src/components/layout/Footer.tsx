import { Linkedin01Icon } from 'hugeicons-react';
import { useContactDrawer } from '../contact/useContactDrawer';

const companyLinks = ['Home', 'About Us', 'Context', 'Contact Us'];
const serviceLinks = ['Supply', 'Demand', 'Request Biospecimens'];

export function Footer() {
	const { open } = useContactDrawer();

	return (
		<footer id="site-footer" className="bg-foreground text-background border-t border-white/10">
			<div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<p>Specimen Bio</p>
						<p className="mt-2 text-sm text-white/50">Biospecimen supply and demand</p>
						<div className="mt-4 flex gap-3">
							<a
								href="https://linkedin.com/in/peternowacki"
								className="text-white/50 transition-colors hover:text-white"
								aria-label="LinkedIn"
							>
								<Linkedin01Icon size={18} strokeWidth={1.5} />
							</a>
						</div>
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Company</p>
						<ul className="mt-4 space-y-2">
							{companyLinks.map((link) => (
								<li key={link}>
									<a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Services</p>
						<ul className="mt-4 space-y-2">
							{serviceLinks.map((link) =>
								link === 'Request Biospecimens' ? (
									<li key={link}>
										<button
											type="button"
											onClick={() => open('request')}
											className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white"
										>
											{link}
										</button>
									</li>
								) : (
									<li key={link}>
										<a
											href="#"
											className="text-sm text-white/60 transition-colors hover:text-white"
										>
											{link}
										</a>
									</li>
								),
							)}
						</ul>
					</div>
					<div>
						<p className="text-xs font-medium tracking-wide text-white/40">Contact</p>
						<ul className="mt-4 space-y-2 text-sm text-white/60">
							<li>
								<a
									href="mailto:info@specimenbio.com"
									className="transition-colors hover:text-white"
								>
									info@specimenbio.com
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
					<p className="text-sm text-white/40">© {new Date().getFullYear()} Specimen Bio. All rights reserved.</p>
					<div className="flex gap-6 text-sm text-white/50">
						<a href="#" className="transition-colors hover:text-white">
							Privacy Policy
						</a>
						<a href="#" className="transition-colors hover:text-white">
							Terms
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
