import { ArrowRight, Check } from 'lucide-react';
import { Hospital01Icon, MicroscopeIcon } from 'hugeicons-react';
import { useContactDrawer } from '../contact/useContactDrawer';
import { BlurFade } from '../motion/BlurFade';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionWrapper } from '../ui/SectionWrapper';

const demandFeatures = [
	'Access to a global Provider Network',
	'Retrospective and prospective collections',
	'Collaborative approach',
	'Transparent project management',
];

const supplyFeatures = [
	"Access to end users' biospecimen requests",
	'Advice and guidance if needed',
	'Transparent project management',
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
	const { open } = useContactDrawer();

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
							<h3 className="text-foreground text-3xl tracking-tight">For biospecimen end users</h3>
							<p className="text-foreground-secondary mt-4 text-base leading-relaxed">
								We work with pharma, biotech, in-vitro diagnostic, and device companies who have us
								source human biospecimens for their R&D needs which often include biomarker
								discovery, drug development & disease research, regulatory submissions, verification
								and validation.
							</p>
							<FeatureList items={demandFeatures} />
							<div className="mt-auto w-full pt-8">
								<Button
									className="w-full justify-center"
									variant="solid"
									size="md"
									trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
									onClick={() => open('request')}
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
							<h3 className="text-foreground text-3xl tracking-tight">For biospecimen providers</h3>
							<p className="text-foreground-secondary mt-4 text-base leading-relaxed">
							We work with clinics, hospitals, institutes, pathology and diagnostic
							labs, biobanks, and biorepositories, as well as CROs and others, connecting qualified Providers with End User needs.
							</p>
							<FeatureList items={supplyFeatures} />
							<div className="mt-auto w-full pt-8">
								<Button
									className="w-full justify-center"
									variant="outline"
									size="md"
									trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
									onClick={() => open('provider')}
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
