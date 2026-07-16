import type { ComponentType } from 'react';
import {
	Activity,
	Briefcase,
	Building2,
	ClipboardCheck,
	Globe,
	GraduationCap,
	Handshake,
	Microscope,
	Route,
	TestTube2,
	ThumbsUp,
	type LucideProps,
} from 'lucide-react';

type IconComponent = ComponentType<LucideProps>;

/**
 * Maps the icon identifiers stored in Sanity (see the `iconItem` / capability
 * card schemas) to the actual icon components rendered on the site. Falls back
 * to a neutral icon so unknown values never break the render.
 */
const iconRegistry: Record<string, IconComponent> = {
	handshake: Handshake,
	route: Route,
	clipboardCheck: ClipboardCheck,
	microscope: Microscope,
	briefcase: Briefcase,
	building: Building2,
	graduationCap: GraduationCap,
	globe: Globe,
	testTube: TestTube2,
	activity: Activity,
	thumbsUp: ThumbsUp,
};

export function getIcon(name: string | null | undefined): IconComponent {
	return (name && iconRegistry[name]) || Activity;
}
