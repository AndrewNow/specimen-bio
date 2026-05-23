import { ArrowRight } from 'lucide-react';
import { BlurFade } from '../motion/BlurFade';
import { Button } from '../ui/Button';
import { SectionWrapper } from '../ui/SectionWrapper';

export function ClosingCTA() {
	return (
		<section className="bg-foreground text-background">
			<SectionWrapper className="text-center">
				<BlurFade>
					<h2 className="text-3xl tracking-tight md:text-4xl">Get in touch</h2>
				</BlurFade>
				<BlurFade delay={0.1}>
					<p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
						Need samples for a study or want to join the provider network? Email or call.
					</p>
				</BlurFade>
				<BlurFade delay={0.2}>
					<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
						<Button
							variant="solid"
							size="lg"
							className="bg-white text-foreground hover:bg-white/90 hover:opacity-100"
							trailingIcon={<ArrowRight size={18} aria-hidden="true" />}
						>
							Request Biospecimens
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="border-white/30 text-white hover:bg-white/10 hover:opacity-100"
						>
							Contact Us
						</Button>
					</div>
					<p className="mt-6 text-sm text-white/40">
						Or reach us directly at
						<a
							href="mailto:info@specimenbio.com"
							className="ml-1 text-white/70 underline underline-offset-4 hover:text-white"
						>
							info@specimenbio.com
						</a>
					</p>
				</BlurFade>
			</SectionWrapper>
		</section>
	);
}
