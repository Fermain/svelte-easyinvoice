// src/routes/invoice/new/+server.ts
import db from '$lib/server/db';
import { text, error, type RequestHandler } from '@sveltejs/kit';
import easyinvoice from 'easyinvoice';
import * as yup from 'yup';

const addressSchema = yup.object().shape({
	street: yup.string().required(),
	city: yup.string().required(),
	zip: yup.string().required(),
	country: yup.string().required()
});

const itemSchema = yup.object().shape({
	description: yup.string().required(),
	quantity: yup.number().required().positive(),
	tax: yup.number().required().min(0),
	taxMethod: yup.string().required().oneOf(['percentage', 'value']),
	price: yup.number().required().positive()
});

const invoiceSchema = yup.object().shape({
	documentTitle: yup.string().required(),
	locale: yup.string().required(),
	currency: yup.string().required(),
	taxNotation: yup.string().required().oneOf(['vat', 'sales_tax']),
	marginTop: yup.number().required().min(0),
	marginRight: yup.number().required().min(0),
	marginBottom: yup.number().required().min(0),
	marginLeft: yup.number().required().min(0),
	background: yup.string().url(),
	sender: yup
		.object()
		.shape({
			company: yup.string().required(),
			address: addressSchema,
			email: yup.string().email().required(),
			custom1: yup.string(),
			custom2: yup.string(),
			custom3: yup.string()
		})
		.required(),
	client: yup
		.object()
		.shape({
			company: yup.string().required(),
			address: addressSchema,
			email: yup.string().email().required(),
			custom1: yup.string(),
			custom2: yup.string(),
			custom3: yup.string()
		})
		.required(),
	items: yup.array().of(itemSchema).required(),
	bottomNotice: yup.string()
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Get invoice data from the request body
		const invoiceData = await request.json();

		// Validate the invoice data against the schema
		await invoiceSchema.validate(invoiceData);

		// Generate the invoice using easyinvoice
		const result = await easyinvoice.createInvoice(invoiceData);
    db.tables.invoices.createInvoice(invoiceData);

		// Return the PDF to the client
		return text(result.pdf, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename=invoice.pdf'
			}
		});
	} catch (err) {
		// Return a 400 Bad Request error if the validation fails
		throw error(400, String(err))
	}
};
