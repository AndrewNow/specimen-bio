import { Activity, Globe, TestTube2 } from 'lucide-react';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { BlurFade } from '../motion/BlurFade';
import { SwissGrid } from '../SwissGrid';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionWrapper } from '../ui/SectionWrapper';

const diseaseAreas =
	'Allergology · Autoimmune Disorders · Cardiology · Dermatology · Endocrinology · Gastroenterology · Gynecology & Urology · Hematology · Infectious Disease · Neurology · Oncology · Ophthalmology · Pulmonology · Reproductology · Rheumatology · Traumatology & Intensive Care';

const sampleTypes =
	'Plasma · Serum · Whole Blood · PBMCs · Buffy Coat · Cord Blood · FFPE · FFPE (NAT) · Fresh Frozen · Fresh Frozen Tissue · Red Cells · Saliva · Semen · Sputum · Stool · Swabs · Synovial Fluid · Synovial Tissue · Urine';

const countries =
	'United States · Canada · France · India · Poland · Turkey · Ukraine · Bulgaria · Armenia · Kazakhstan · Tajikistan · United Arab Emirates · Vietnam';

const capabilityCards = [
	{ icon: Activity, title: 'Disease areas', body: diseaseAreas },
	{ icon: TestTube2, title: 'Sample types', body: sampleTypes },
	{ icon: Globe, title: 'Source countries', body: countries },
];

export function Capabilities() {
	return (
		<section className="relative overflow-hidden border-y border-border bg-surface">
			<SwissGrid />
			<SectionWrapper className="relative z-10">
				<div className="max-w-xl">
					<Badge>Global network</Badge>
					<h2 className="text-foreground mt-6 text-3xl tracking-tight md:text-4xl">
						What we source
					</h2>
					<p className="text-foreground-secondary mt-4 text-base leading-relaxed md:text-lg">
						13 countries, 16 disease areas, 19+ sample types.
					</p>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-8 border-t border-border pt-12 sm:grid-cols-3">
					<BlurFade>
						<div>
							<AnimatedCounter value={16} className="text-foreground text-5xl tracking-tight md:text-6xl" />
							<p className="mt-1 text-sm text-muted">Disease areas</p>
						</div>
					</BlurFade>
					<BlurFade delay={0.1}>
						<div>
							<AnimatedCounter value={19} suffix="+" className="text-foreground text-5xl tracking-tight md:text-6xl" />
							<p className="mt-1 text-sm text-muted">Sample types</p>
						</div>
					</BlurFade>
					<BlurFade delay={0.2}>
						<div>
							<AnimatedCounter value={13} className="text-foreground text-5xl tracking-tight md:text-6xl" />
							<p className="mt-1 text-sm text-muted">Source countries</p>
						</div>
					</BlurFade>
				</div>

				<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
					{capabilityCards.map((card, i) => (
						<BlurFade key={card.title} delay={0.1 * i}>
							<Card variant="outline">
								<card.icon size={20} className="text-foreground mb-4" aria-hidden="true" />
								<h3 className="text-foreground">{card.title}</h3>
								<p className="text-foreground-secondary mt-3 text-sm leading-relaxed">{card.body}</p>
							</Card>
						</BlurFade>
					))}
				</div>
			</SectionWrapper>
		</section>
	);
}
