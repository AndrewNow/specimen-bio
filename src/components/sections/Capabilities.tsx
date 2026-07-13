import type { CapabilitiesContent } from '../../lib/sanity/types';
import { getIcon } from '../../lib/icons';
import { AnimatedCounter } from '../motion/AnimatedCounter';
import { BlurFade } from '../motion/BlurFade';
import { SwissGrid } from '../SwissGrid';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionWrapper } from '../ui/SectionWrapper';

/** Splits a display value like "16+" into its numeric part and trailing suffix. */
function parseStatValue(value: string): { count: number; suffix: string } {
	const match = value.match(/^(\d+)(.*)$/);
	if (!match) return { count: 0, suffix: value };
	return { count: Number(match[1]), suffix: match[2] };
}

export function Capabilities({ content }: { content: CapabilitiesContent }) {
	return (
		<section className="border-border bg-surface relative overflow-hidden border-y">
			<SwissGrid />
			<SectionWrapper className="relative z-10">
				<div className="max-w-xl">
					{content.badge && <Badge>{content.badge}</Badge>}
					<h2 className="text-foreground mt-6 text-3xl tracking-tight md:text-4xl">
						{content.heading}
					</h2>
					{content.subtext && (
						<p className="text-foreground-secondary mt-4 text-base leading-relaxed md:text-lg">
							{content.subtext}
						</p>
					)}
				</div>

				<div className="border-border mt-12 grid grid-cols-3 gap-4 border-t pt-12 md:gap-8">
					{content.stats.map((stat, i) => {
						const { count, suffix } = parseStatValue(stat.value);
						return (
							<BlurFade key={stat.label} delay={0.1 * i}>
								<div>
									<AnimatedCounter
										value={count}
										suffix={suffix}
										className="text-foreground text-4xl tracking-tight md:text-6xl"
									/>
									<p className="text-secondary mt-1 text-xs md:text-sm">{stat.label}</p>
								</div>
							</BlurFade>
						);
					})}
				</div>

				<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
					{content.cards.map((card, i) => {
						const Icon = getIcon(card.icon);
						return (
							<BlurFade key={card.title} delay={0.1 * i} className="h-full">
								<Card variant="outline" className="h-full">
									<Icon size={20} className="text-foreground mb-4" aria-hidden="true" />
									<h3 className="text-foreground">{card.title}</h3>
									<p className="text-foreground-secondary mt-3 text-sm leading-relaxed">
										{card.items.join(' · ')}
									</p>
								</Card>
							</BlurFade>
						);
					})}
				</div>
			</SectionWrapper>
		</section>
	);
}
