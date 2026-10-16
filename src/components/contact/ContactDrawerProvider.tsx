'use client';

import {
	createContext,
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { scheduleIdle } from '../../lib/idle';
import type { ContactFormsContent } from '../../lib/sanity/types';
import type { ContactFormType } from './types';

const ContactDrawer = lazy(() =>
	import('./ContactDrawer').then((mod) => ({ default: mod.ContactDrawer })),
);

export interface ContactDrawerContextValue {
	isOpen: boolean;
	activeType: ContactFormType | null;
	open: (type: ContactFormType) => void;
	close: () => void;
}

export const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(null);

export function ContactDrawerProvider({
	children,
	forms,
}: {
	children: ReactNode;
	forms: ContactFormsContent;
}) {
	const [activeType, setActiveType] = useState<ContactFormType | null>(null);
	const [drawerReady, setDrawerReady] = useState(false);

	const open = useCallback((type: ContactFormType) => setActiveType(type), []);
	const close = useCallback(() => setActiveType(null), []);

	useEffect(() => {
		let cancelled = false;
		const load = () => {
			void import('./ContactDrawer').then(() => {
				if (!cancelled) setDrawerReady(true);
			});
		};

		if (activeType) {
			load();
			return () => {
				cancelled = true;
			};
		}

		const cancelIdle = scheduleIdle(load);
		return () => {
			cancelled = true;
			cancelIdle();
		};
	}, [activeType]);

	const value = useMemo<ContactDrawerContextValue>(
		() => ({ isOpen: activeType !== null, activeType, open, close }),
		[activeType, open, close],
	);

	return (
		<ContactDrawerContext.Provider value={value}>
			{children}
			{drawerReady && (
				<Suspense fallback={null}>
					<ContactDrawer
						activeType={activeType}
						onOpenChange={(next) => !next && close()}
						forms={forms}
					/>
				</Suspense>
			)}
		</ContactDrawerContext.Provider>
	);
}
