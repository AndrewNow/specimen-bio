import { ArrowRight, Briefcase, Building2, GraduationCap } from 'lucide-react';
import { Linkedin01Icon } from 'hugeicons-react';
import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { SectionWrapper } from '../ui/SectionWrapper';

const attributes = [
	{ icon: Briefcase, text: '25+ years in biospecimen & life sciences leadership' },
	{ icon: Building2, text: 'Former GM at Azenta Life Sciences' },
	{ icon: GraduationCap, text: "MBA, Queen's University · MSc McGill · BSc Concordia" },
];

export function Credibility() {
	return (
		<section className="bg-background">
			<SectionWrapper>
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
					<BlurFade>
						<div>
							<Badge>Leadership</Badge>
							<h2 className="text-foreground mt-6 text-4xl tracking-tight">
								25+ years in the field
							</h2>
							<p className="text-foreground-secondary mt-6 text-base leading-relaxed md:text-lg">
							Peter M. Nowacki founded Specimen Bio after twenty-plus years in biospecimen leadership, including General Manager of the Biospecimen Procurement Business Unit at Azenta Life Sciences and COO at Trans-Hit Biomarkers.
							</p>
							<p className="text-foreground-secondary mt-4 text-base leading-relaxed md:text-lg">
								Specimen Bio fills the gap he kept seeing: accountable ownership from first call to
								confirmed delivery.
							</p>
							<div className="mt-8">
								<Button
									variant="ghost"
									size="md"
									className='-translate-x-3'
									trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
								>
									About the team
								</Button>
							</div>
						</div>
					</BlurFade>

					<BlurFade delay={0.15}>
						<Card featured className="bg-surface p-8">
							<div className="flex items-center gap-4">
								<img
									src="/peter.jpg"
									alt="Peter M. Nowacki"
									className="h-14 w-14 rounded-full object-cover object-center"
									width={56}
									height={56}
								/>
								<div className="flex flex-col">
									<p className="text-foreground text-lg">Peter M. Nowacki</p>
									<p className="text-foreground-secondary text-sm">Founder & CEO, Specimen Bio</p>
								</div>
							</div>
							<Divider className="my-6" />
							<ul>
								{attributes.map(({ icon: Icon, text }) => (
									<li
										key={text}
										className="text-foreground-secondary border-border flex items-center gap-3 border-b py-3 text-sm last:border-0"
									>
										<Icon size={14} className="text-secondary shrink-0" aria-hidden="true" />
										{text}
									</li>
								))}
							</ul>
							<div className="mt-6">
								<Button
									variant="outline"
									size="sm"
									icon={<Linkedin01Icon size={14} strokeWidth={1.5} aria-hidden="true" />}
									className="w-full sm:w-auto"
									onClick={() => window.open('https://linkedin.com/in/peternowacki', '_blank')}
								>
									linkedin.com/in/peternowacki
								</Button>
							</div>
						</Card>
					</BlurFade>
				</div>
			</SectionWrapper>
		</section>
	);
}
