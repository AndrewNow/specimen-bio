import type { CapabilitiesContent } from '../../lib/sanity/types';
import { getIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
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

/** Trailing catch-all phrases like "and more…" / "etc." stay at the end after alphabetical sort. */
function isTrailingItem(item: string): boolean {
	const normalized = item.trim().replace(/[.…]+$/u, '');
	return /^(and more|etc)$/i.test(normalized);
}

function sortCardItems(items: string[]): string[] {
	const trailing = items.filter(isTrailingItem);
	const rest = items
		.filter((item) => !isTrailingItem(item))
		.sort((a, b) => a.localeCompare(b));
	return [...rest, ...trailing];
}

export function Capabilities({ content }: { content: CapabilitiesContent }) {
	const isFourUp = content.cards.length === 4;

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

				<div
					className={cn(
						'mt-12 grid grid-cols-1 gap-4 md:items-stretch',
						isFourUp ? 'md:grid-cols-2' : 'md:grid-cols-3',
					)}
				>
					{content.cards.map((card, i) => {
						const Icon = getIcon(card.icon);
						const stat =
							content.stats.find(
								(s) => s.label.toLowerCase() === card.title.toLowerCase(),
							) ?? content.stats[i];
						const parsed = stat ? parseStatValue(stat.value) : null;

						return (
							<BlurFade key={card.title} delay={0.1 * i} className="h-full">
								<Card variant="outline" className="h-full">
									<Icon size={24} className="text-foreground mb-4" aria-hidden="true" />
									{parsed && (
										<AnimatedCounter
											value={parsed.count}
											suffix={parsed.suffix}
											className="text-foreground text-4xl tracking-tight md:text-5xl"
										/>
									)}
									<h3 className={cn('text-foreground', parsed ? 'mt-1' : undefined)}>
										{card.title}
									</h3>
									<p className="text-foreground-secondary mt-3 text-sm leading-relaxed">
										{sortCardItems(card.items).join(' · ')}
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
