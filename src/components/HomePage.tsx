import { ContactDrawerProvider } from './contact/ContactDrawerProvider';
import { Footer } from './layout/Footer';
import { Navbar } from './layout/Navbar';
import { Capabilities } from './sections/Capabilities';
import { ClosingCTA } from './sections/ClosingCTA';
import { Credibility } from './sections/Credibility';
import { DualAudience } from './sections/DualAudience';
import { Hero } from './sections/Hero';
import { Process } from './sections/Process';
import { WhoWeAre } from './sections/WhoWeAre';

export function HomePage() {
	return (
		<ContactDrawerProvider>
			<Navbar />
			<main>
				<Hero />
				<WhoWeAre />
				<DualAudience />
				<Process />
				<Capabilities />
				<Credibility />
				<ClosingCTA />
			</main>
			<Footer />
		</ContactDrawerProvider>
	);
}
