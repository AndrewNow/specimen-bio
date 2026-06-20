'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Drawer } from 'vaul';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { contactFormConfig, type ContactFormType } from './types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface ContactDrawerProps {
	activeType: ContactFormType | null;
	onOpenChange: (open: boolean) => void;
}

export function ContactDrawer({ activeType, onOpenChange }: ContactDrawerProps) {
	// Retain the last type so content stays rendered during the close animation.
	const [renderedType, setRenderedType] = useState<ContactFormType>('request');
	const [status, setStatus] = useState<Status>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => {
		if (activeType) {
			setRenderedType(activeType);
			setStatus('idle');
			setErrorMessage('');
		}
	}, [activeType]);

	useEffect(() => () => clearTimeout(closeTimer.current), []);

	const config = contactFormConfig[renderedType];

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);

		setStatus('submitting');
		setErrorMessage('');

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: renderedType,
					name: data.get('name'),
					email: data.get('email'),
					organization: data.get('organization'),
					message: data.get('message'),
					website: data.get('website'),
				}),
			});

			if (!response.ok) {
				const body = await response.json().catch(() => null);
				throw new Error(body?.error ?? 'Something went wrong. Please try again.');
			}

			setStatus('success');
			form.reset();
			closeTimer.current = setTimeout(() => onOpenChange(false), 2200);
		} catch (error) {
			setStatus('error');
			setErrorMessage(
				error instanceof Error ? error.message : 'Something went wrong. Please try again.',
			);
		}
	}

	return (
		<Drawer.Root open={activeType !== null} onOpenChange={onOpenChange} repositionInputs>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40" />
				<Drawer.Content className="bg-background fixed inset-x-0 bottom-0 z-[70] mx-auto flex max-h-[90vh] max-w-2xl flex-col rounded-t-2xl outline-none">
					<div className="bg-muted mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full" />
					<div className="overflow-y-auto px-6 pt-4 pb-8">
						<Drawer.Title className="text-foreground text-2xl tracking-tight">
							{config.title}
						</Drawer.Title>
						<Drawer.Description className="text-foreground-secondary mt-2 text-sm leading-relaxed">
							{config.description}
						</Drawer.Description>

						{status === 'success' ? (
							<div className="mt-8 flex flex-col items-center justify-center py-8 text-center">
								<div className="bg-foreground text-background flex h-12 w-12 items-center justify-center rounded-full">
									<Check size={24} aria-hidden="true" />
								</div>
								<p className="text-foreground mt-4 text-base font-medium">Message sent</p>
								<p className="text-foreground-secondary mt-1 text-sm">
									Thanks for reaching out. We will be in touch shortly.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="mt-6 space-y-4">
								<input
									type="text"
									name="website"
									tabIndex={-1}
									autoComplete="off"
									aria-hidden="true"
									className="hidden"
								/>

								<div className="space-y-1.5">
									<Label htmlFor="contact-name">Name</Label>
									<Input id="contact-name" name="name" required placeholder="Your name" />
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="contact-email">Email</Label>
									<Input
										id="contact-email"
										name="email"
										type="email"
										required
										placeholder="you@company.com"
									/>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="contact-organization">
										Organization <span className="text-foreground-secondary">(optional)</span>
									</Label>
									<Input
										id="contact-organization"
										name="organization"
										placeholder="Company or institution"
									/>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="contact-message">Message</Label>
									<Textarea
										id="contact-message"
										name="message"
										required
										placeholder={config.messagePlaceholder}
									/>
								</div>

								{status === 'error' && (
									<p className="text-orange text-sm" role="alert">
										{errorMessage}
									</p>
								)}

								<Button
									type="submit"
									variant="solid"
									size="lg"
									className="w-full justify-center"
									disabled={status === 'submitting'}
								>
									{status === 'submitting' ? 'Sending...' : config.submitLabel}
								</Button>
							</form>
						)}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
