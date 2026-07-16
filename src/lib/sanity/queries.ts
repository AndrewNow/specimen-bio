import { sanityClient } from './client';
import type {
	CareersPageContent,
	JobListingContent,
	JobListingSummary,
	LegalPageContent,
	SiteChromeContent,
	SiteContent,
} from './types';

const ctaProjection = `{label, action, href}`;
const imageProjection = `{"url": asset->url, alt}`;
const iconItemProjection = `{icon, text}`;

/**
 * Fetches every section of the site in a single round-trip. Each section is a
 * singleton document keyed by a fixed `_id` (see the studio's desk structure),
 * so we can address them directly and resolve image assets to plain URLs.
 */
const SITE_CONTENT_QUERY = `{
	"siteSettings": *[_id == "siteSettings"][0]{
		siteName,
		"logo": logo${imageProjection},
		navLinks[]{label, href},
		"navProviderCta": navProviderCta${ctaProjection},
		"navRequestCta": navRequestCta${ctaProjection},
		footerTagline,
		footerCompanyLinks[]{label, href},
		footerServiceLinks[]${ctaProjection},
		footerLegalLinks[]{label, href},
		copyrightName,
		contactEmail,
		linkedinUrl,
		seo{metaTitle, metaDescription, "ogImage": ogImage${imageProjection}}
	},
	"hero": *[_id == "heroSection"][0]{
		badge,
		headingLine1,
		headingLine2,
		subheading,
		"primaryCta": primaryCta${ctaProjection},
		"secondaryCta": secondaryCta${ctaProjection}
	},
	"about": *[_id == "aboutSection"][0]{
		eyebrow,
		headingLine1,
		headingLine2,
		body,
		callouts[]${iconItemProjection}
	},
	"audiences": *[_id == "audienceSection"][0]{
		demandCard{heading, body, features, "cta": cta${ctaProjection}},
		supplyCard{heading, body, features, "cta": cta${ctaProjection}}
	},
	"process": *[_id == "processSection"][0]{
		badge,
		headingLine1,
		headingLine2,
		subtext,
		steps[]{title, description}
	},
	"capabilities": *[_id == "capabilitiesSection"][0]{
		badge,
		heading,
		subtext,
		stats[]{value, label},
		cards[]{title, icon, items}
	},
	"leadership": *[_id == "leadershipSection"][0]{
		badge,
		heading,
		body,
		ctaLabel,
		teamMembers[]{
			name,
			role,
			"photo": photo${imageProjection},
			pullquote,
			attributes[]${iconItemProjection},
			linkedinLabel,
			linkedinUrl
		}
	},
	"closingCta": *[_id == "closingCtaSection"][0]{
		heading,
		body,
		"primaryCta": primaryCta${ctaProjection},
		"secondaryCta": secondaryCta${ctaProjection},
		directContactText
	},
	"contactForms": *[_id == "contactForms"][0]{
		requestForm{title, description, submitLabel, messagePlaceholder},
		providerForm{title, description, submitLabel, messagePlaceholder},
		fields{
			name{label, placeholder},
			email{label, placeholder},
			organization{label, placeholder},
			messageLabel
		},
		successHeading,
		successBody,
		errorFallback
	}
}`;

export async function getSiteContent(): Promise<SiteContent> {
	return sanityClient.fetch<SiteContent>(SITE_CONTENT_QUERY);
}

const SITE_CHROME_QUERY = `{
	"siteSettings": *[_id == "siteSettings"][0]{
		siteName,
		"logo": logo${imageProjection},
		navLinks[]{label, href},
		"navProviderCta": navProviderCta${ctaProjection},
		"navRequestCta": navRequestCta${ctaProjection},
		footerTagline,
		footerCompanyLinks[]{label, href},
		footerServiceLinks[]${ctaProjection},
		footerLegalLinks[]{label, href},
		copyrightName,
		contactEmail,
		linkedinUrl,
		seo{metaTitle, metaDescription, "ogImage": ogImage${imageProjection}}
	},
	"contactForms": *[_id == "contactForms"][0]{
		requestForm{title, description, submitLabel, messagePlaceholder},
		providerForm{title, description, submitLabel, messagePlaceholder},
		fields{
			name{label, placeholder},
			email{label, placeholder},
			organization{label, placeholder},
			messageLabel
		},
		successHeading,
		successBody,
		errorFallback
	}
}`;

const LEGAL_PAGE_QUERY = `*[_type == "legalPage" && slug.current == $slug][0]{
	title,
	"slug": slug.current,
	lastUpdated,
	intro,
	body,
	seo{metaTitle, metaDescription, "ogImage": ogImage${imageProjection}}
}`;

const LEGAL_SLUGS_QUERY = `*[_type == "legalPage" && defined(slug.current)].slug.current`;

const CAREERS_PAGE_QUERY = `*[_id == "careersPage"][0]{
	title,
	intro,
	emptyState,
	seo{metaTitle, metaDescription, "ogImage": ogImage${imageProjection}}
}`;

const JOB_LISTINGS_QUERY = `*[_type == "jobListing" && isOpen != false && defined(slug.current)] | order(postedAt desc, title asc){
	title,
	"slug": slug.current,
	department,
	location,
	employmentType,
	postedAt,
	summary
}`;

const JOB_LISTING_QUERY = `*[_type == "jobListing" && slug.current == $slug && isOpen != false][0]{
	title,
	"slug": slug.current,
	department,
	location,
	employmentType,
	postedAt,
	summary,
	body,
	applyUrl,
	applyEmail,
	seo{metaTitle, metaDescription, "ogImage": ogImage${imageProjection}}
}`;

export async function getSiteChrome(): Promise<SiteChromeContent> {
	return sanityClient.fetch<SiteChromeContent>(SITE_CHROME_QUERY);
}

export async function getLegalPage(slug: string): Promise<LegalPageContent | null> {
	return sanityClient.fetch<LegalPageContent | null>(LEGAL_PAGE_QUERY, {slug});
}

export async function getLegalPageSlugs(): Promise<string[]> {
	return sanityClient.fetch<string[]>(LEGAL_SLUGS_QUERY);
}

export async function getCareersPage(): Promise<CareersPageContent | null> {
	return sanityClient.fetch<CareersPageContent | null>(CAREERS_PAGE_QUERY);
}

export async function getJobListings(): Promise<JobListingSummary[]> {
	return sanityClient.fetch<JobListingSummary[]>(JOB_LISTINGS_QUERY);
}

export async function getJobListing(slug: string): Promise<JobListingContent | null> {
	return sanityClient.fetch<JobListingContent | null>(JOB_LISTING_QUERY, {slug});
}
