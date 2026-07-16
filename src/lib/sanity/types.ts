export type CtaAction = 'requestForm' | 'providerForm' | 'link';

export interface CtaContent {
	label: string;
	action: CtaAction;
	href?: string | null;
}

export interface NavLinkContent {
	label: string;
	href: string;
}

export interface IconItemContent {
	icon: string;
	text: string;
}

export interface ImageContent {
	url: string | null;
	alt: string | null;
}

export interface SeoContent {
	metaTitle: string;
	metaDescription: string;
	ogImage: ImageContent | null;
}

export interface SiteSettings {
	siteName: string;
	logo: ImageContent | null;
	navLinks: NavLinkContent[];
	navProviderCta: CtaContent | null;
	navRequestCta: CtaContent | null;
	footerTagline: string | null;
	footerCompanyLinks: NavLinkContent[];
	footerServiceLinks: CtaContent[];
	footerLegalLinks: NavLinkContent[];
	copyrightName: string | null;
	contactEmail: string;
	linkedinUrl: string | null;
	seo: SeoContent | null;
}

export interface HeroContent {
	badge: string | null;
	headingLine1: string;
	headingLine2: string;
	subheading: unknown[];
	primaryCta: CtaContent;
	secondaryCta: CtaContent | null;
}

export interface AboutContent {
	eyebrow: string | null;
	headingLine1: string;
	headingLine2: string | null;
	body: unknown[];
	callouts: IconItemContent[];
}

export interface AudienceCard {
	heading: string;
	body: unknown[];
	features: string[];
	cta: CtaContent;
}

export interface AudienceContent {
	demandCard: AudienceCard;
	supplyCard: AudienceCard;
}

export interface ProcessStep {
	title: string;
	description: string;
}

export interface ProcessContent {
	badge: string | null;
	headingLine1: string;
	headingLine2: string | null;
	subtext: string | null;
	steps: ProcessStep[];
}

export interface StatContent {
	value: string;
	label: string;
}

export interface CapabilityCard {
	title: string;
	icon: string | null;
	items: string[];
}

export interface CapabilitiesContent {
	badge: string | null;
	heading: string;
	subtext: string | null;
	stats: StatContent[];
	cards: CapabilityCard[];
}

export interface TeamMember {
	name: string;
	role: string;
	photo: ImageContent | null;
	pullquote: string | null;
	attributes: IconItemContent[];
	linkedinLabel: string | null;
	linkedinUrl: string | null;
}

export interface LeadershipContent {
	badge: string | null;
	heading: string;
	body: unknown[];
	ctaLabel: string | null;
	teamMembers: TeamMember[];
}

export interface ClosingCtaContent {
	heading: string;
	body: string | null;
	primaryCta: CtaContent;
	secondaryCta: CtaContent | null;
	directContactText: string | null;
}

export interface ContactFormVariant {
	title: string;
	description: string;
	submitLabel: string;
	messagePlaceholder: string;
}

export interface ContactFieldLabel {
	label: string | null;
	placeholder: string | null;
}

export interface ContactFormsContent {
	requestForm: ContactFormVariant;
	providerForm: ContactFormVariant;
	fields: {
		name: ContactFieldLabel | null;
		email: ContactFieldLabel | null;
		organization: ContactFieldLabel | null;
		messageLabel: string | null;
	} | null;
	successHeading: string | null;
	successBody: string | null;
	errorFallback: string | null;
}

export interface LegalPageContent {
	title: string;
	slug: string;
	lastUpdated: string | null;
	intro: string | null;
	body: unknown[];
	seo: SeoContent | null;
}

export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'internship';

export interface JobListingSummary {
	title: string;
	slug: string;
	department: string | null;
	location: string | null;
	employmentType: EmploymentType | null;
	postedAt: string | null;
	summary: string;
}

export interface JobListingContent extends JobListingSummary {
	body: unknown[];
	applyUrl: string | null;
	applyEmail: string | null;
	seo: SeoContent | null;
}

export interface CareersPageContent {
	title: string;
	intro: string | null;
	emptyState: string | null;
	seo: SeoContent | null;
}

export interface SiteChromeContent {
	siteSettings: SiteSettings;
	contactForms: ContactFormsContent;
}

export interface SiteContent {
	siteSettings: SiteSettings;
	hero: HeroContent;
	about: AboutContent;
	audiences: AudienceContent;
	process: ProcessContent;
	capabilities: CapabilitiesContent;
	leadership: LeadershipContent;
	closingCta: ClosingCtaContent;
	contactForms: ContactFormsContent;
}
