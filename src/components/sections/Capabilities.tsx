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
	'Buffy Coat · Cord Blood · FFPE · FFPE (NAT) · Fresh Frozen · Fresh Frozen Tissue · PBMCs · Plasma · Red Cells · Saliva · Semen · Serum · Sputum · Stool · Swabs · Synovial Fluid · Synovial Tissue · Urine · Whole Blood';

const countries =
	'Armenia · Bulgaria · Canada · France · India · Kazakhstan · Poland · Roamnia · Tajikistan · Turkey · Ukraine · United States · Vietnam';

const capabilityCards = [
	{ icon: Activity, title: 'Disease areas', body: diseaseAreas },
	{ icon: TestTube2, title: 'Sample types', body: sampleTypes },
	{ icon: Globe, title: 'Source countries', body: countries },
];

const stats = [
	{ value: 16, label: 'Disease areas' },
	{ value: 19, label: 'Sample types' },
	{ value: 13, label: 'Source countries' },
];

export function Capabilities() {
	return (
		<section className="border-border bg-surface relative overflow-hidden border-y">
			<SwissGrid />
			<SectionWrapper className="relative z-10">
				<div className="max-w-xl">
					<Badge>Global network</Badge>
					<h2 className="text-foreground mt-6 text-3xl tracking-tight md:text-4xl">
						Sourcing: What and Where
					</h2>
					<p className="text-foreground-secondary mt-4 text-base leading-relaxed md:text-lg">
						Any geography, any disease area, any sample type.
					</p>
				</div>

				<div className="border-border mt-12 grid grid-cols-3 gap-4 border-t pt-12 md:gap-8">
					{stats.map((stat, i) => (
						<BlurFade key={stat.label} delay={0.1 * i}>
							<div>
								<AnimatedCounter
									value={stat.value}
									suffix="+"
									className="text-foreground text-4xl tracking-tight md:text-6xl"
								/>
								<p className="text-secondary mt-1 text-xs md:text-sm">{stat.label}</p>
							</div>
						</BlurFade>
					))}
				</div>

				<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
					{capabilityCards.map((card, i) => (
						<BlurFade key={card.title} delay={0.1 * i} className="h-full">
							<Card variant="outline" className="h-full">
								<card.icon size={20} className="text-foreground mb-4" aria-hidden="true" />
								<h3 className="text-foreground">{card.title}</h3>
								<p className="text-foreground-secondary mt-3 text-sm leading-relaxed">
									{card.body}
								</p>
							</Card>
						</BlurFade>
					))}
				</div>
			</SectionWrapper>
		</section>
	);
}
