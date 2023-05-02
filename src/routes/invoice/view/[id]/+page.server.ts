import db from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (() => {
	const invoices = db.tables.invoices.getInvoices();

	return {
    invoices
	};
}) satisfies PageServerLoad;
