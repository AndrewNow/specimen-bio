'use client';

import { Menu } from '@base-ui/react/menu';
import { ArrowRight, Menu as MenuIcon } from 'lucide-react';
import type { SiteSettings } from '../../lib/sanity/types';
import { ctaOnClick } from '../../lib/cta';
import { useContactDrawer } from '../contact/useContactDrawer';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useNavOverDark } from './useNavOverDark';

const menuItemClass =
	'flex cursor-default py-2.5 pr-8 pl-4 text-sm text-foreground-secondary outline-hidden select-none data-highlighted:bg-surface data-highlighted:text-foreground';

export function Navbar({ settings }: { settings: SiteSettings }) {
	const { open } = useContactDrawer();
	const isOverDark = useNavOverDark();

	const { navLinks, navProviderCta, navRequestCta, logo, siteName } = settings;

	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div
				aria-hidden="true"
				className={cn('nav-blur-backdrop', isOverDark && 'nav-blur-backdrop-dark')}
			/>
			<div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
				<a href="/" className="flex shrink-0 items-center" aria-label={`${siteName} home`}>
					{logo?.url && (
						<img
							src={logo.url}
							alt={logo.alt ?? ''}
							className={cn(
								'h-7 md:h-9 w-auto transition-[filter] duration-200',
								isOverDark && 'invert',
							)}
							decoding="async"
						/>
					)}
				</a>

				<nav className="hidden items-center gap-8 xl:flex" aria-label="Main">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className={cn(
								'text-sm transition-colors duration-200',
								isOverDark
									? 'text-white/60 hover:text-white'
									: 'text-foreground-secondary hover:text-foreground',
							)}
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-2 xl:flex">
					{navProviderCta && (
						<Button
							variant="outline"
							size="sm"
							className={cn(
								isOverDark && 'border-white/30 text-white hover:bg-white/10 hover:opacity-100',
							)}
							onClick={ctaOnClick(navProviderCta, open)}
						>
							{navProviderCta.label}
						</Button>
					)}
					{navRequestCta && (
						<Button
							variant="solid"
							size="sm"
							className={cn(
								isOverDark && 'bg-white text-foreground hover:bg-white/90 hover:opacity-100',
							)}
							trailingIcon={<ArrowRight size={14} aria-hidden="true" />}
							onClick={ctaOnClick(navRequestCta, open)}
						>
							{navRequestCta.label}
						</Button>
					)}
				</div>

				<div className="xl:hidden">
					<Menu.Root>
						<Menu.Trigger
							className={cn(
								'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200',
								isOverDark ? 'border-white/30 text-white' : 'border-border text-foreground',
							)}
							aria-label="Open menu"
						>
							<MenuIcon size={18} />
						</Menu.Trigger>
						<Menu.Portal>
							<Menu.Positioner sideOffset={8} align="end">
								<Menu.Popup className="border-border bg-background min-w-48 origin-(--transform-origin) rounded-2xl border py-1 shadow-lg outline-hidden transition-[scale,opacity] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 overflow-hidden">
									{navLinks.map((link) => (
										<Menu.Item
											key={link.label}
											className={menuItemClass}
											render={<a href={link.href} />}
										>
											{link.label}
										</Menu.Item>
									))}
									<Menu.Separator className="bg-border mx-2 my-1 h-px" />
									{navProviderCta && (
										<Menu.Item
											className={cn(menuItemClass, 'font-medium')}
											onClick={ctaOnClick(navProviderCta, open)}
										>
											{navProviderCta.label}
										</Menu.Item>
									)}
									{navRequestCta && (
										<Menu.Item
											className={cn(menuItemClass, 'font-medium')}
											onClick={ctaOnClick(navRequestCta, open)}
										>
											{navRequestCta.label}
										</Menu.Item>
									)}
								</Menu.Popup>
							</Menu.Positioner>
						</Menu.Portal>
					</Menu.Root>
				</div>
			</div>
		</header>
	);
}
