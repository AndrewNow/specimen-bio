import { X } from 'lucide-react';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SectionWrapper } from '../ui/SectionWrapper';

const callouts = ['Not a marketplace', 'Not traders', 'Not marketers'];

export function WhoWeAre() {
	return (
		<section id="about" className=" bg-surface max-w-8xl mx-auto">
			<SectionWrapper>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
					<BlurFade>
						<div>
							<p className="text-xs font-medium tracking-wide text-muted">About Specimen Bio</p>
							<h2 className="text-foreground mt-4 text-3xl tracking-tight md:text-4xl">
								We've worked with these providers.
								<br />
								We recommend them from that experience.
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

						<div className="mt-8 flex flex-wrap gap-6 border-t border-border pt-8">
							{callouts.map((item, i) => (
								<BlurFade key={item} delay={0.1 * i}>
									<div className="flex items-center gap-2">
										<X size={14} className="text-muted" aria-hidden="true" />
										<span className="text-sm font-medium text-muted">{item}</span>
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
