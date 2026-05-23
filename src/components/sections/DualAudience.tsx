import { ArrowRight, Check } from 'lucide-react';
import { Hospital01Icon, MicroscopeIcon } from 'hugeicons-react';
import { BlurFade } from '../motion/BlurFade';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionWrapper } from '../ui/SectionWrapper';

const demandFeatures = [
	'Biomarker discovery',
	'Drug development & disease research',
	'FDA and regulatory endpoints',
	'IVD verification and validation',
];

const supplyFeatures = [
	'Provider network development',
	'Process and compliance advisory',
	'Audit and certification support',
];

function FeatureList({ items }: { items: string[] }) {
	return (
		<ul className="mt-6 space-y-2">
			{items.map((item) => (
				<li key={item} className="text-foreground-primary flex items-start gap-2 text-sm">
					<Check
						size={16}
						className="text-foreground mt-0.5 shrink-0"
						aria-hidden="true"
						strokeWidth={2}
					/>
					{item}
				</li>
			))}
		</ul>
	);
}

export function DualAudience() {
	return (
		<section className="bg-background">
			<SectionWrapper>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<BlurFade>
						<Card
							id="demand"
							className="flex h-full flex-col transition-transform duration-200 hover:-translate-y-1"
						>
							<MicroscopeIcon
								size={48}
								className="text-foreground mb-6"
								strokeWidth={1}
								aria-hidden="true"
							/>
							<h3 className="text-foreground text-3xl tracking-tight">For sponsors</h3>
							<p className="text-foreground-secondary mt-4 text-base leading-relaxed">
								Pharma, diagnostic, biotech, and device companies use us to source samples from
								biomarker work through regulatory filings.
							</p>
							<FeatureList items={demandFeatures} />
							<div className="mt-auto w-full pt-8">
								<Button
									className="w-full justify-center"
									variant="solid"
									size="md"
									trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
								>
									Request Biospecimens
								</Button>
							</div>
						</Card>
					</BlurFade>

					<BlurFade delay={0.1}>
						<Card
							id="supply"
							className="flex h-full flex-col transition-transform duration-200 hover:-translate-y-1"
						>
							<Hospital01Icon
								size={48}
								className="text-foreground mb-6"
								strokeWidth={1}
								aria-hidden="true"
							/>
							<h3 className="text-foreground text-3xl tracking-tight">For providers</h3>
							<p className="text-foreground-secondary mt-4 text-base leading-relaxed">
								We work with clinics, hospitals, pathology and diagnostic labs, biobanks, and
								biorepositories. We connect qualified sites with end users and help them run
								compliant collections.
							</p>
							<FeatureList items={supplyFeatures} />
							<div className="mt-auto w-full pt-8">
								<Button
									className="w-full justify-center"
									variant="outline"
									size="md"
									trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
								>
									Join as Provider
								</Button>
							</div>
						</Card>
					</BlurFade>
				</div>
			</SectionWrapper>
		</section>
	);
}
