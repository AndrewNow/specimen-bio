import { ArrowRight } from 'lucide-react';
import { Linkedin01Icon } from 'hugeicons-react';
import type { LeadershipContent } from '../../lib/sanity/types';
import { getIcon } from '../../lib/icons';
import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { SectionWrapper } from '../ui/SectionWrapper';

export function Credibility({ content }: { content: LeadershipContent }) {
	const member = content.teamMember;

	return (
		<section className="bg-background">
			<SectionWrapper>
				<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
					<BlurFade>
						<div>
							{content.badge && <Badge>{content.badge}</Badge>}
							<h2 className="text-foreground mt-6 text-4xl tracking-tight">{content.heading}</h2>
							{content.paragraphs.map((paragraph, i) => (
								<p
									key={i}
									className="text-foreground-secondary mt-6 text-base leading-relaxed first:mt-6 md:text-lg"
								>
									{paragraph}
								</p>
							))}
							{content.ctaLabel && (
								<div className="mt-8">
									<Button
										variant="ghost"
										size="md"
										className="-translate-x-3"
										trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
									>
										{content.ctaLabel}
									</Button>
								</div>
							)}
						</div>
					</BlurFade>

					{member && (
						<BlurFade delay={0.15}>
							<Card featured className="bg-surface p-8">
								<div className="flex items-center gap-4">
									{member.photo?.url && (
										<img
											src={member.photo.url}
											alt={member.photo.alt ?? member.name}
											className="h-14 w-14 rounded-full object-cover object-center"
											width={56}
											height={56}
										/>
									)}
									<div className="flex flex-col">
										<p className="text-foreground text-lg">{member.name}</p>
										<p className="text-foreground-secondary text-sm">{member.role}</p>
									</div>
								</div>
								{member.attributes.length > 0 && (
									<>
										<Divider className="my-6" />
										<ul>
											{member.attributes.map((attribute) => {
												const Icon = getIcon(attribute.icon);
												return (
													<li
														key={attribute.text}
														className="text-foreground-secondary border-border flex items-center gap-3 border-b py-3 text-sm last:border-0"
													>
														<Icon size={14} className="text-secondary shrink-0" aria-hidden="true" />
														{attribute.text}
													</li>
												);
											})}
										</ul>
									</>
								)}
								{member.linkedinUrl && (
									<div className="mt-6">
										<Button
											variant="outline"
											size="sm"
											icon={<Linkedin01Icon size={14} strokeWidth={1.5} aria-hidden="true" />}
											className="w-full sm:w-auto"
											onClick={() => window.open(member.linkedinUrl!, '_blank')}
										>
											{member.linkedinLabel ?? 'LinkedIn'}
										</Button>
									</div>
								)}
							</Card>
						</BlurFade>
					)}
				</div>
			</SectionWrapper>
		</section>
	);
}
