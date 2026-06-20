import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false;

const RECIPIENTS = {
	request: {
		from: 'Specimen Bio <requests@specimenbio.com>',
		to: 'requests@specimenbio.com',
		subjectPrefix: 'Biospecimen Request',
	},
	provider: {
		from: 'Specimen Bio <info@specimenbio.com>',
		to: 'info@specimenbio.com',
		subjectPrefix: 'Provider Inquiry',
	},
} as const;

const contactSchema = z.object({
	type: z.enum(['request', 'provider']),
	name: z.string().trim().min(2, 'Please enter your name.'),
	email: z.string().trim().email('Please enter a valid email address.'),
	organization: z.string().trim().optional(),
	message: z.string().trim().min(10, 'Please add a little more detail to your message.'),
	// Honeypot: real users never fill this in.
	website: z.string().optional(),
});

function escapeHtml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function json(body: unknown, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export const POST: APIRoute = async ({ request }) => {
	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return json({ error: 'Invalid request body.' }, 400);
	}

	const parsed = contactSchema.safeParse(payload);
	if (!parsed.success) {
		const firstIssue = parsed.error.issues[0];
		return json({ error: firstIssue?.message ?? 'Invalid form submission.' }, 400);
	}

	const { type, name, email, organization, message, website } = parsed.data;

	// Silently accept honeypot hits so bots get a success response.
	if (website && website.trim() !== '') {
		return json({ ok: true }, 200);
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('Missing RESEND_API_KEY environment variable.');
		return json({ error: 'Email service is not configured.' }, 500);
	}

	const { from, to, subjectPrefix } = RECIPIENTS[type];
	const org = organization?.trim() ? organization.trim() : 'Not provided';

	const text = [
		`Name: ${name}`,
		`Email: ${email}`,
		`Organization: ${org}`,
		'',
		'Message:',
		message,
	].join('\n');

	const html = `
		<h2>${escapeHtml(subjectPrefix)}</h2>
		<p><strong>Name:</strong> ${escapeHtml(name)}</p>
		<p><strong>Email:</strong> ${escapeHtml(email)}</p>
		<p><strong>Organization:</strong> ${escapeHtml(org)}</p>
		<p><strong>Message:</strong></p>
		<p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
	`;

	try {
		const resend = new Resend(apiKey);
		const { error } = await resend.emails.send({
			from,
			to,
			replyTo: email,
			subject: `${subjectPrefix} from ${name}`,
			text,
			html,
		});

		if (error) {
			console.error('Resend error:', error);
			return json({ error: 'Could not send your message. Please try again.' }, 500);
		}
	} catch (error) {
		console.error('Unexpected error sending email:', error);
		return json({ error: 'Could not send your message. Please try again.' }, 500);
	}

	return json({ ok: true }, 200);
};
