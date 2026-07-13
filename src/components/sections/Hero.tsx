import { BorderBeam } from 'border-beam';
import { ArrowRight } from 'lucide-react';
import type { HeroContent } from '../../lib/sanity/types';
import { ctaOnClick } from '../../lib/cta';
import { useContactDrawer } from '../contact/useContactDrawer';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SwissGrid } from '../SwissGrid';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HeroBackground } from './HeroBackground';

export function Hero({ content }: { content: HeroContent }) {
	const { open } = useContactDrawer();

	return (
		<section className="bg-background relative mt-[2.5vh] flex min-h-[75vh] md:min-h-[85vh] items-center justify-center overflow-hidden pt-16 pb-[7vh] md:pb-[10vh]">
			<HeroBackground />
			<SwissGrid className="z-1" />
			<div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
				{content.badge && (
					<BlurFade>
						<Badge className="mb-3">{content.badge}</Badge>
					</BlurFade>
				)}

				<h1 className="text-foreground text-3xl md:text-6xl leading-[1.05] tracking-tight">
					<TextReveal text={content.headingLine1} per="word" />
					<br />
					<span className="decoration-border underline underline-offset-[6px]">
						<TextReveal text={content.headingLine2} per="word" delay={0.3} />
					</span>
				</h1>

				<BlurFade delay={0.4}>
					<p className="text-foreground-secondary mx-auto mt-6 max-w-2xl text-md leading-relaxed md:text-xl">
						{content.subheading}
					</p>
				</BlurFade>

				<BlurFade delay={0.6}>
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<BorderBeam
							className="inline-flex rounded-full"
							theme="dark"
							colorVariant="sunset"
							duration={2.4}
							strength={1}
						>
							<Button
								variant="solid"
								size="lg"
								trailingIcon={<ArrowRight size={18} aria-hidden="true" />}
								onClick={ctaOnClick(content.primaryCta, open)}
							>
								{content.primaryCta.label}
							</Button>
						</BorderBeam>
						{content.secondaryCta && (
							<Button
								variant="outline"
								size="lg"
								onClick={ctaOnClick(content.secondaryCta, open)}
							>
								{content.secondaryCta.label}
							</Button>
						)}
					</div>
				</BlurFade>
			</div>
		</section>
	);
}
