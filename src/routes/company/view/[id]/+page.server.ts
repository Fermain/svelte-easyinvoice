import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (() => {
	const companies = db.tables.companies.getCompanies();

	return {
    companies
	};
}) satisfies PageServerLoad;
