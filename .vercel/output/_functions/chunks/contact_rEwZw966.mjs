import 'resend';
import { z } from 'zod';

const prerender = false;
const contactSchema = z.object({
  type: z.enum(["request", "provider"]),
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  organization: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please add a little more detail to your message."),
  // Honeypot: real users never fill this in.
  website: z.string().optional()
});
function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
const POST = async ({ request }) => {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return json({ error: firstIssue?.message ?? "Invalid form submission." }, 400);
  }
  const { type, name, email, organization, message, website } = parsed.data;
  if (website && website.trim() !== "") {
    return json({ ok: true }, 200);
  }
  {
    console.error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL environment variable.");
    return json({ error: "Email service is not configured." }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
