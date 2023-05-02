import type { InvoiceSenderOrClient } from 'easyinvoice';
import statements from '../statements';

export const name = 'companies';

export function getCompanies() {
	return statements.get.all<InvoiceSenderOrClient>(name);
}

export function getCompany(id: string) {
	return statements.get.unique<InvoiceSenderOrClient>(id, name);
}

export function createCompany(company: InvoiceSenderOrClient) {
	return statements.create(name, company);
}

export function updateCompany(id: string, company: InvoiceSenderOrClient) {
	return statements.update<InvoiceSenderOrClient>(name, id, company);
}

export function deleteCompany(id: string) {
	return statements.remove(name, id);
}
