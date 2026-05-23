'use client';

import { Menu } from '@base-ui/react/menu';
import { ArrowRight, Menu as MenuIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Context', href: '#context' },
	{ label: 'Supply', href: '#supply' },
	{ label: 'Demand', href: '#demand' },
	{ label: 'About Us', href: '#about' },
];

const menuItemClass =
	'flex cursor-default py-2.5 pr-8 pl-4 text-sm text-foreground-secondary outline-hidden select-none data-highlighted:bg-surface data-highlighted:text-foreground';

export function Navbar() {
	return (
		<header className="fixed inset-x-0 top-0 z-50">
			<div aria-hidden="true" className="nav-blur-backdrop" />
			<div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
				<a href="/" className="flex shrink-0 items-center" aria-label="Specimen Bio home">
					<img src="/logo.png" alt="" className="h-9 w-auto" decoding="async" />
				</a>

				<nav className="hidden items-center gap-8 md:flex" aria-label="Main">
					{navLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className="text-foreground-secondary hover:text-foreground text-sm transition-colors"
						>
							{link.label}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline" size="sm">
						Become a Provider
					</Button>
					<Button
						variant="solid"
						size="sm"
						trailingIcon={<ArrowRight size={14} aria-hidden="true" />}
					>
						Request Biospecimens
					</Button>
				</div>

				<div className="md:hidden">
					<Menu.Root>
						<Menu.Trigger
							className="border-border text-foreground inline-flex h-9 w-9 items-center justify-center rounded-full border"
							aria-label="Open menu"
						>
							<MenuIcon size={18} />
						</Menu.Trigger>
						<Menu.Portal>
							<Menu.Positioner sideOffset={8} align="end">
								<Menu.Popup className="border-border bg-background min-w-48 origin-[var(--transform-origin)] rounded-2xl border py-1 shadow-lg outline-hidden transition-[scale,opacity] duration-100 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
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
									<Menu.Item className={cn(menuItemClass, 'font-medium')}>
										Become a Provider
									</Menu.Item>
									<Menu.Item className={cn(menuItemClass, 'font-medium')}>
										Request Biospecimens
									</Menu.Item>
								</Menu.Popup>
							</Menu.Positioner>
						</Menu.Portal>
					</Menu.Root>
				</div>
			</div>
		</header>
	);
}
