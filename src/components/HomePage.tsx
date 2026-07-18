import type { SiteContent } from '../lib/sanity/types';
import { ContactDrawerProvider } from './contact/ContactDrawerProvider';
import { FixedRevealEnd } from './layout/FixedRevealEnd';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';
import { Capabilities } from './sections/Capabilities';
import { ClosingCTA } from './sections/ClosingCTA';
import { Credibility } from './sections/Credibility';
import { DualAudience } from './sections/DualAudience';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { WhoWeAre } from './sections/WhoWeAre';

export function HomePage({ content }: { content: SiteContent }) {
	return (
		<ContactDrawerProvider forms={content.contactForms}>
			<Navbar settings={content.siteSettings} />
			<main className="bg-background">
				<Hero content={content.hero} />
				<WhoWeAre content={content.about} />
				<DualAudience content={content.audiences} />
				<Process content={content.process} />
				<Capabilities content={content.capabilities} />
				<Credibility content={content.leadership} />
			</main>
			<FixedRevealEnd>
				<ClosingCTA content={content.closingCta} email={content.siteSettings.contactEmail} />
				<Footer settings={content.siteSettings} />
			</FixedRevealEnd>
		</ContactDrawerProvider>
	);
}
