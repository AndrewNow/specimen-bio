import { ArrowRight, Check } from 'lucide-react';
import { Hospital01Icon, MicroscopeIcon } from 'hugeicons-react';
import type { ComponentType } from 'react';
import type { AudienceCard, AudienceContent } from '../../lib/sanity/types';
import { ctaOnClick } from '../../lib/cta';
import { useContactDrawer } from '../contact/useContactDrawer';
import { BlurFade } from '../motion/BlurFade';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SectionWrapper } from '../ui/SectionWrapper';

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

interface AudienceCardProps {
	card: AudienceCard;
	id: string;
	icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>;
	buttonVariant: 'solid' | 'outline';
	onCta: () => void;
}

function AudienceCardView({ card, id, icon: Icon, buttonVariant, onCta }: AudienceCardProps) {
	return (
		<Card
			id={id}
			className="flex h-full flex-col scroll-mt-24 transition-transform duration-200 hover:-translate-y-1"
		>
			<Icon size={48} className="text-foreground mb-6" strokeWidth={1} aria-hidden={true} />
			<h3 className="text-foreground text-3xl tracking-tight">{card.heading}</h3>
			<p className="text-foreground-secondary mt-4 text-base leading-relaxed">{card.body}</p>
			<FeatureList items={card.features} />
			<div className="mt-auto w-full pt-8">
				<Button
					className="w-full justify-center"
					variant={buttonVariant}
					size="md"
					trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
					onClick={onCta}
				>
					{card.cta.label}
				</Button>
			</div>
		</Card>
	);
}

export function DualAudience({ content }: { content: AudienceContent }) {
	const { open } = useContactDrawer();

	return (
		<section className="bg-background">
			<SectionWrapper>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<BlurFade>
						<AudienceCardView
							card={content.demandCard}
							id="demand"
							icon={MicroscopeIcon}
							buttonVariant="solid"
							onCta={ctaOnClick(content.demandCard.cta, open)}
						/>
					</BlurFade>

					<BlurFade delay={0.1}>
						<AudienceCardView
							card={content.supplyCard}
							id="supply"
							icon={Hospital01Icon}
							buttonVariant="outline"
							onCta={ctaOnClick(content.supplyCard.cta, open)}
						/>
					</BlurFade>
				</div>
			</SectionWrapper>
		</section>
	);
}
