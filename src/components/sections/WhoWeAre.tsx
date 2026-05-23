import type { LucideIcon } from 'lucide-react';
import { ClipboardCheck, Handshake, Microscope, Route } from 'lucide-react';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SectionWrapper } from '../ui/SectionWrapper';

const callouts: { icon: LucideIcon; text: string }[] = [
	{ icon: Handshake, text: 'Providers we know firsthand' },
	{ icon: Route, text: 'End-to-end ownership' },
	{ icon: ClipboardCheck, text: 'Samples confirmed in spec' },
	{ icon: Microscope, text: 'Science-first expertise' },
];

export function WhoWeAre() {
	return (
		<section id="about" className="bg-surface max-w-8xl mx-auto">
			<SectionWrapper>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
					<BlurFade>
						<div>
							<p className="text-secondary text-xs tracking-wide">About Specimen Bio</p>
							<h2 className="text-foreground mt-4 text-3xl tracking-tight md:text-4xl">
								Expert partners.
								<br />
								From scope to samples.
							</h2>
						</div>
					</BlurFade>

					<div>
						<TextReveal
							per="line"
							text={`Lots of sites list biospecimens. Few teams know the science, know the providers personally, and own the work through delivery.

We have spent decades on small specialist collections and large multi-site studies. We only recommend providers we have worked with. We stay on the project until your samples arrive and meet spec.`}
							className="text-foreground-secondary text-base leading-relaxed md:text-lg"
						/>

						<div className="border-border mt-8 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
							{callouts.map(({ icon: Icon, text }, i) => (
								<BlurFade key={text} delay={0.1 * i}>
									<div className="flex items-center gap-2">
										<Icon size={14} className="text-secondary shrink-0" aria-hidden="true" strokeWidth={2} />
										<span className="text-foreground-secondary text-sm font-medium">{text}</span>
									</div>
								</BlurFade>
							))}
						</div>
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
}
