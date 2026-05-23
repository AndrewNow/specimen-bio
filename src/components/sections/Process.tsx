import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { SectionWrapper } from '../ui/SectionWrapper';
import { cn } from '../../lib/utils';

const steps = [
	{
		title: 'Discovery',
		body: 'We learn your science, timeline, and constraints first.',
	},
	{
		title: 'Definition',
		body: 'We write the project spec. That document drives the rest of the work.',
	},
	{
		title: 'Feasibility',
		body: 'We pick providers from our network based on direct experience, not a database search.',
	},
	{
		title: 'Partnering',
		body: 'We connect buyer and provider and handle introductions, contracts, and terms.',
	},
	{
		title: 'Collection',
		body: 'We manage or oversee collection so samples match your spec from day one.',
	},
	{
		title: 'Logistics',
		body: 'We arrange shipping with qualified couriers so samples arrive on time and intact.',
	},
	{
		title: 'Acceptance',
		body: 'You sign off when samples meet spec. We close the project then.',
	},
];

export function Process() {
	return (
		<section id="context" className="bg-background">
			<SectionWrapper>
				<div className="mx-auto mb-16 max-w-2xl text-center">
					<Badge>Our process</Badge>
					<h2 className="text-foreground mt-6 text-5xl tracking-tight">
						From the first call
						<br />
						to samples in hand
					</h2>
					<p className="text-foreground-secondary mt-4 text-base leading-relaxed md:text-lg">
						Same seven steps on a single-site study or a multi-country program.
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
										"after:bg-border after:pointer-events-none after:absolute after:top-8 after:left-4 after:w-px after:content-[''] after:h-[calc(100%-2rem+2.5rem)]",
								)}
							>
								<span className="outline-2 outline-white border-border bg-background text-secondary absolute top-0 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm">
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
