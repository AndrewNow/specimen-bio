import type { EmploymentType } from './sanity/types';

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
	'full-time': 'Full-time',
	'part-time': 'Part-time',
	contract: 'Contract',
	internship: 'Internship',
};

export function employmentTypeLabel(type: EmploymentType | null | undefined) {
	if (!type) return null;
	return EMPLOYMENT_TYPE_LABELS[type] ?? type;
}

export function formatJobDate(iso: string) {
	const date = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function jobMetaParts(job: {
	department?: string | null;
	location?: string | null;
	employmentType?: EmploymentType | null;
}) {
	return [job.department, job.location, employmentTypeLabel(job.employmentType)].filter(
		(part): part is string => Boolean(part),
	);
}
