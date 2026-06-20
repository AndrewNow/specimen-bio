import { useEffect, useState } from 'react';

const NAV_HEIGHT = 64;
const DARK_SECTION_IDS = ['site-closing-cta', 'site-footer'];

function isNavOverDarkSection() {
	return DARK_SECTION_IDS.some((id) => {
		const section = document.getElementById(id);
		if (!section) return false;

		const { top, bottom } = section.getBoundingClientRect();
		return top < NAV_HEIGHT && bottom > 0;
	});
}

export function useNavOverDark() {
	const [isOverDark, setIsOverDark] = useState(false);

	useEffect(() => {
		function update() {
			setIsOverDark(isNavOverDarkSection());
		}

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });

		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return isOverDark;
}
