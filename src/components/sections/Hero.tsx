import { BorderBeam } from 'border-beam';
import { ArrowRight } from 'lucide-react';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SwissGrid } from '../SwissGrid';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function Hero() {
	return (
		<section className="relative flex min-h-[85vh] pb-[10vh] mt-[2.5vh] items-center justify-center overflow-hidden bg-background pt-16">
			<SwissGrid />
			<div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
				<BlurFade>
					<Badge className="mb-8">Professional biospecimen services</Badge>
				</BlurFade>

				<h1 className="text-foreground text-6xl leading-[1.05] tracking-tight">
					<TextReveal text="Biospecimen procurement" per="word" />
					<br />
					<span className="underline decoration-border underline-offset-[6px]">
						<TextReveal text="done right." per="word" delay={0.3} />
					</span>
				</h1>

				<BlurFade delay={0.4}>
					<p className="text-foreground-secondary mx-auto mt-6 max-w-2xl text-lg leading-relaxed md:text-xl">
						We are not a marketplace or a broker. We run procurement end to end with providers and sponsors on
						complex collections.
					</p>
				</BlurFade>

				<BlurFade delay={0.6}>
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<BorderBeam 
						className="inline-flex rounded-full"
						theme="dark"
						colorVariant="sunset" duration={2.4} strength={1}
						>
							<Button variant="solid" size="lg" trailingIcon={<ArrowRight size={18} aria-hidden="true" />}>
								Request Biospecimens
							</Button>
						</BorderBeam>
						<Button variant="outline" size="lg">
							Become a Provider
						</Button>
					</div>
				</BlurFade>
			</div>
		</section>
	);
}
