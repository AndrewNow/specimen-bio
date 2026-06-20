'use client';

import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import { ContactDrawer } from './ContactDrawer';
import type { ContactFormType } from './types';

export interface ContactDrawerContextValue {
	isOpen: boolean;
	activeType: ContactFormType | null;
	open: (type: ContactFormType) => void;
	close: () => void;
}

export const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(null);

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
	const [activeType, setActiveType] = useState<ContactFormType | null>(null);

	const open = useCallback((type: ContactFormType) => setActiveType(type), []);
	const close = useCallback(() => setActiveType(null), []);

	const value = useMemo<ContactDrawerContextValue>(
		() => ({ isOpen: activeType !== null, activeType, open, close }),
		[activeType, open, close],
	);

	return (
		<ContactDrawerContext.Provider value={value}>
			{children}
			<ContactDrawer activeType={activeType} onOpenChange={(next) => !next && close()} />
		</ContactDrawerContext.Provider>
	);
}
