import { ArrowRight } from 'lucide-react';
import type { ClosingCtaContent } from '../../lib/sanity/types';
import { ctaOnClick } from '../../lib/cta';
import { useContactDrawer } from '../contact/useContactDrawer';
import { BlurFade } from '../motion/BlurFade';
import { Button } from '../ui/Button';
import { SectionWrapper } from '../ui/SectionWrapper';

export function ClosingCTA({ content, email }: { content: ClosingCtaContent; email: string }) {
	const { open } = useContactDrawer();

	return (
		<section id="site-closing-cta" className="bg-foreground text-background">
			<SectionWrapper className="text-center">
				<BlurFade>
					<h2 className="text-3xl tracking-tight md:text-4xl">{content.heading}</h2>
				</BlurFade>
				{content.body && (
					<BlurFade delay={0.1}>
						<p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
							{content.body}
						</p>
					</BlurFade>
				)}
				<BlurFade delay={0.2}>
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<Button
							variant="solid"
							size="lg"
							className="text-foreground bg-white hover:bg-white/90 hover:opacity-100"
							trailingIcon={<ArrowRight size={18} aria-hidden="true" />}
							onClick={ctaOnClick(content.primaryCta, open)}
						>
							{content.primaryCta.label}
						</Button>
						{content.secondaryCta && (
							<Button
								variant="outline"
								size="lg"
								className="border-white/30 text-white hover:bg-white/10 hover:opacity-100"
								onClick={ctaOnClick(content.secondaryCta, open)}
							>
								{content.secondaryCta.label}
							</Button>
						)}
					</div>
					{email && (
						<p className="mt-6 text-sm text-white/40">
							{content.directContactText ?? 'Or reach us directly at'}
							<a
								href={`mailto:${email}`}
								className="ml-1 text-white/70 underline underline-offset-4 hover:text-white"
							>
								{email}
							</a>
						</p>
					)}
				</BlurFade>
			</SectionWrapper>
		</section>
	);
}
