import type { InvoiceData } from 'easyinvoice';
import crypto from 'crypto';
import statements from '../statements';

export const name = 'invoices';

export function getInvoices() {
	return statements.get.all<InvoiceData>(name);
}

export function getInvoice(id: string) {
	return statements.get.unique<InvoiceData>(id, name);
}

export function createInvoice(invoice: InvoiceData) {
	const id = crypto.randomUUID();
	invoice.information = {
		number: id,
		date: String(Date.now()),
		...invoice.information
	};

	return statements.create(name, invoice, id);
}

export function updateInvoice(id: string, invoice: InvoiceData) {
	return statements.update<InvoiceData>(name, id, invoice);
}

export function deleteInvoice(id: string) {
	return statements.remove(name, id);
}
