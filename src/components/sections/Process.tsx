import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { SectionWrapper } from '../ui/SectionWrapper';
import { cn } from '../../lib/utils';

const steps = [
	{
		title: 'Orientation',
		body: 'We take time to understand your scienctific needs, timeline, and constraints.',
	},
	{
		title: 'Definition',
		body: 'We develop and have you approve a detailed project spec, which drives the rest of the work.',
	},
	{
		title: 'Feasibility',
		body: 'We match your needs to suitable providers from our global network.',
	},
	{
		title: 'Matching',
		body: 'We propose selected Provier(s) to you, handle agreements, and all other logistics to start collection.',
	},
	{
		title: 'Collection',
		body: 'We coordinate and oversee the project from inception to collection, keeping you up-to-date of the progress.',
	},
	{
		title: 'Logistics',
		body: 'We arrange shipping with qualified couriers so samples arrive safely and on time.',
	},
	{
		title: 'Acceptance',
		body: 'You sign off when samples meet spec so we can close the project.',
	},
];

export function Process() {
	return (
		<section id="context" className="bg-background">
			<SectionWrapper>
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<Badge>Our process</Badge>
					<h2 className="text-foreground mt-6 text-3xl md:text-5xl tracking-tight">
						From the first call
						<br />
						to samples in hand
					</h2>
					<p className="text-foreground-secondary mt-4 text-base leading-relaxed text-balance md:text-lg">
						Same seven steps on a single-site collection or a multi-site prospective collection
						program.
					</p>
				</div>

				<div className="relative mx-auto max-w-3xl">
					<ol className="space-y-10">
						{steps.map((step, i) => (
							<li
								key={step.title}
								className={cn(
									'relative pl-12 md:pl-14',
									i < steps.length - 1 &&
										"after:bg-border after:pointer-events-none after:absolute after:top-8 after:left-4 after:h-[calc(100%-2rem+2.5rem)] after:w-px after:content-['']",
								)}
							>
								<span className="border-border bg-background text-secondary absolute top-0 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm outline-2 outline-white">
									{i + 1}
								</span>
								<BlurFade delay={i * 0.05}>
									<div>
										<h3 className="text-foreground">{step.title}</h3>
										<p className="text-foreground-secondary mt-2 text-base leading-relaxed">
											{step.body}
										</p>
									</div>
								</BlurFade>
							</li>
						))}
					</ol>
				</div>
			</SectionWrapper>
		</section>
	);
}
