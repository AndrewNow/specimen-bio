import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { cn } from '../../lib/utils';

function createComponents(paragraphClassName?: string): PortableTextComponents {
	return {
		block: {
			normal: ({ children }) => <p className={paragraphClassName}>{children}</p>,
		},
		marks: {
			strong: ({ children }) => <strong className="text-foreground font-medium">{children}</strong>,
			em: ({ children }) => <em>{children}</em>,
			link: ({ children, value }) => (
				<a
					href={value?.href}
					className="text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
				>
					{children}
				</a>
			),
		},
	};
}

export function RichText({
	value,
	className,
	paragraphClassName,
}: {
	value: unknown[];
	className?: string;
	paragraphClassName?: string;
}) {
	if (!value?.length) return null;

	return (
		<div className={cn('space-y-5', className)}>
			<PortableText value={value} components={createComponents(paragraphClassName)} />
		</div>
	);
}
