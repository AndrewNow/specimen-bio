import { BorderBeam } from 'border-beam';
import { ArrowRight } from 'lucide-react';
import { useContactDrawer } from '../contact/useContactDrawer';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SwissGrid } from '../SwissGrid';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { HeroBackground } from './HeroBackground';

export function Hero() {
	const { open } = useContactDrawer();

	return (
		<section className="bg-background relative mt-[2.5vh] flex min-h-[75vh] md:min-h-[85vh] items-center justify-center overflow-hidden pt-16 pb-[7vh] md:pb-[10vh]">
			<HeroBackground />
			<SwissGrid className="z-1" />
			<div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
				<BlurFade>
					<Badge className="mb-3">Professional biospecimen sourcing services</Badge>
				</BlurFade>

				<h1 className="text-foreground text-3xl md:text-6xl leading-[1.05] tracking-tight">
					<TextReveal text="Biospecimen procurement" per="word" />
					<br />
					<span className="decoration-border underline underline-offset-[6px]">
						<TextReveal text="done right." per="word" delay={0.3} />
					</span>
				</h1>

				<BlurFade delay={0.4}>
					<p className="text-foreground-secondary mx-auto mt-6 max-w-2xl text-md leading-relaxed md:text-xl">
						We are not a marketplace or a broker. We run procurement end to end with providers and
						match end users' needs to qualified providers globally.
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
								onClick={() => open('request')}
							>
								Request Biospecimens
							</Button>
						</BorderBeam>
						<Button variant="outline" size="lg" onClick={() => open('provider')}>
							Become a Provider
						</Button>
					</div>
				</BlurFade>
			</div>
		</section>
	);
}
