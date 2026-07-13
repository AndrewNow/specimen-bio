import { sanityClient } from './client';
import type { SiteContent } from './types';

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
		paragraphs,
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
		paragraphs,
		ctaLabel,
		teamMember{
			name,
			role,
			"photo": photo${imageProjection},
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
