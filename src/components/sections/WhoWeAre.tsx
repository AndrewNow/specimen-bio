import type { AboutContent } from '../../lib/sanity/types';
import { getIcon } from '../../lib/icons';
import { BlurFade } from '../motion/BlurFade';
import { TextReveal } from '../motion/TextReveal';
import { SectionWrapper } from '../ui/SectionWrapper';

export function WhoWeAre({ content }: { content: AboutContent }) {
	return (
		<section id="about" className="bg-surface max-w-8xl mx-auto">
			<SectionWrapper>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
					<BlurFade>
						<div>
							{content.eyebrow && (
								<p className="text-secondary text-xs tracking-wide">{content.eyebrow}</p>
							)}
							<h2 className="text-foreground mt-4 text-3xl tracking-tight md:text-4xl">
								{content.headingLine1}
								{content.headingLine2 && (
									<>
										<br />
										{content.headingLine2}
									</>
								)}
							</h2>
						</div>
					</BlurFade>

					<div>
						<TextReveal
							per="line"
							text={content.paragraphs.join('\n\n')}
							className="text-foreground-secondary text-base leading-relaxed md:text-lg"
						/>

						{content.callouts.length > 0 && (
							<div className="border-border mt-8 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
								{content.callouts.map((callout, i) => {
									const Icon = getIcon(callout.icon);
									return (
										<BlurFade key={callout.text} delay={0.1 * i}>
											<div className="flex items-center gap-2">
												<Icon
													size={14}
													className="text-secondary shrink-0"
													aria-hidden="true"
													strokeWidth={2}
												/>
												<span className="text-foreground-secondary text-sm font-medium">
													{callout.text}
												</span>
											</div>
										</BlurFade>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</SectionWrapper>
		</section>
	);
}
