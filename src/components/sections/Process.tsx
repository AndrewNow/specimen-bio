import type { ProcessContent } from '../../lib/sanity/types';
import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { SectionWrapper } from '../ui/SectionWrapper';
import { cn } from '../../lib/utils';

export function Process({ content }: { content: ProcessContent }) {
	const { steps } = content;

	return (
		<section id="context">
			<SectionWrapper>
				<div className="mx-auto mb-16 max-w-2xl text-center">
					{content.badge && <Badge>{content.badge}</Badge>}
					<h2 className="text-foreground mt-6 text-3xl md:text-5xl tracking-tight">
						{content.headingLine1}
						{content.headingLine2 && (
							<>
								<br />
								{content.headingLine2}
							</>
						)}
					</h2>
					{content.subtext && (
						<p className="text-foreground-secondary mt-4 text-base leading-relaxed text-balance md:text-lg">
							{content.subtext}
						</p>
					)}
				</div>

				<div className="relative mx-auto max-w-3xl">
					<ol className="space-y-10">
						{steps.map((step, i) => (
							<li
								key={step.title}
								className={cn(
									'relative pl-12 md:pl-14',
									i < steps.length - 1 &&
										"after:bg-border after:pointer-events-none after:absolute after:top-8 after:left-4 after:h-[calc(100%-2rem+2.5rem)] after:w-px after:content-['']",
								)}
							>
								<span className="border-border bg-background text-secondary absolute top-0 left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm outline-2 outline-white">
									{i + 1}
								</span>
								<BlurFade delay={i * 0.05}>
									<div>
										<h3 className="text-foreground">{step.title}</h3>
										<p className="text-foreground-secondary mt-2 text-base leading-relaxed">
											{step.description}
										</p>
									</div>
								</BlurFade>
							</li>
						))}
					</ol>
				</div>
			</SectionWrapper>
		</section>
	);
}
