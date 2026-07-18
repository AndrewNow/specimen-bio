import { ArrowRight } from 'lucide-react';
import { Linkedin01Icon } from 'hugeicons-react';
import type { LeadershipContent, TeamMember } from '../../lib/sanity/types';
import { getIcon } from '../../lib/icons';
import { cn } from '../../lib/utils';
import { BlurFade } from '../motion/BlurFade';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { RichText } from '../ui/RichText';
import { SectionWrapper } from '../ui/SectionWrapper';

function TeamMemberCard({ member }: { member: TeamMember }) {
	return (
		<Card featured className="bg-surface flex h-full flex-col p-8">
			<div className="flex items-center gap-4">
				{member.photo?.url && (
					<img
						src={member.photo.url}
						alt={member.photo.alt ?? member.name}
						className="size-18 rounded-full object-cover object-center"
						width={56}
						height={56}
					/>
				)}
				<div className="flex flex-col">
					<p className="text-foreground text-xl">{member.name}</p>
					<p className="text-foreground-secondary text-sm">{member.role}</p>
				</div>
			</div>
			{member.pullquote && (
				<blockquote className="text-foreground border-orange/40 mt-6 py-2 border-l-2 pl-4 text-base my-3 leading-relaxed text-pretty">
					"{member.pullquote}"
				</blockquote>
			)}
			{(member.attributes?.length > 0 || member.linkedinUrl) && (
				<div className="mt-auto">
					{member.attributes?.length > 0 && (
						<>
							<ul>
								{member.attributes.map((attribute) => {
									const Icon = getIcon(attribute.icon);
									return (
										<li
											key={attribute.text}
											className="text-foreground-secondary border-border flex items-start gap-3 border-b py-3 text-sm last:border-0"
										>
											<Icon size={14} className="text-secondary mt-0.5 shrink-0" aria-hidden="true" />
											{attribute.text}
										</li>
									);
								})}
							</ul>
						</>
					)}
					{member.linkedinUrl && (
						<div className="pt-6">
							<Button
								variant="outline"
								size="sm"
								icon={<Linkedin01Icon size={14} strokeWidth={1.5} aria-hidden="true" />}
								className="w-full sm:w-auto"
								onClick={() => window.open(member.linkedinUrl!, '_blank')}
							>
								{member.linkedinLabel ?? 'LinkedIn'}
							</Button>
						</div>
					)}
				</div>
			)}
		</Card>
	);
}

function SectionIntro({ content }: { content: LeadershipContent }) {
	return (
		<div className="max-w-2xl">
			{content.badge && <Badge>{content.badge}</Badge>}
			<h2 className="text-foreground mt-6 text-4xl tracking-tight">{content.heading}</h2>
			<RichText
				value={content.body}
				className="mt-6"
				paragraphClassName="text-foreground-secondary text-base leading-relaxed md:text-lg"
			/>
			<div className="mt-8">
				<Button
					variant="ghost"
					size="md"
					className="-translate-x-3"
					trailingIcon={<ArrowRight size={16} aria-hidden="true" />}
					onClick={() => {
						window.location.href = '/careers';
					}}
				>
					{content.ctaLabel || 'View open roles'}
				</Button>
			</div>
		</div>
	);
}

export function Credibility({ content }: { content: LeadershipContent }) {
	const members = content.teamMembers ?? [];
	const isStacked = members.length >= 2;

	return (
		<section className="bg-background">
			<SectionWrapper>
				<div
					className={cn(
						isStacked
							? 'flex flex-col gap-12 md:gap-16'
							: 'grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16',
					)}
				>
					<BlurFade>
						<SectionIntro content={content} />
					</BlurFade>

					{members.length > 0 && (
						<div
							className={cn(
								isStacked && 'grid grid-cols-1 items-stretch gap-4 md:grid-cols-2',
							)}
						>
							{members.map((member, i) => (
								<BlurFade key={member.name} delay={0.1 * (i + 1)} className="h-full">
									<TeamMemberCard member={member} />
								</BlurFade>
							))}
						</div>
					)}
				</div>
			</SectionWrapper>
		</section>
	);
}
