export type ContactFormType = 'request' | 'provider';

interface ContactFormConfig {
	title: string;
	description: string;
	submitLabel: string;
	messagePlaceholder: string;
}

export const contactFormConfig: Record<ContactFormType, ContactFormConfig> = {
	request: {
		title: 'Request biospecimens',
		description:
			'Tell us what you need and our team will get back to you to scope the collection.',
		submitLabel: 'Send request',
		messagePlaceholder:
			'Sample types, quantities, donor criteria, timelines, regulatory needs...',
	},
	provider: {
		title: 'Become a provider',
		description:
			'Share a few details about your site and we will reach out about joining our network.',
		submitLabel: 'Send inquiry',
		messagePlaceholder:
			'Your site type, collection capabilities, certifications, sample availability...',
	},
};
