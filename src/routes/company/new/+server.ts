// src/routes/invoice/new/+server.ts
import db from '$lib/server/db';
import { error, type RequestHandler, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Get company data from the request body
		const companyData = await request.json();

		// Validate the company data against the schema
		// await companySchema.validate(companyData);

		const company = db.tables.companies.createCompany(companyData);

		// Return the company record
		return json(company);
	} catch (err) {
		// Return a 400 Bad Request error if the validation fails
		throw error(400, String(err));
	}
};
