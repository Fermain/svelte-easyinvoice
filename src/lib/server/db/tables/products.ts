import type { InvoiceProduct } from 'easyinvoice';
import statements from '../statements';

export const name = 'products';

export function getProducts() {
	return statements.get.all<InvoiceProduct>(name);
}

export function getProduct(id: string) {
	return statements.get.unique<InvoiceProduct>(id, name);
}

export function createProduct(product: any) {
	return statements.create(name, product);
}

export function updateProduct(id: string, product: InvoiceProduct) {
	return statements.update<InvoiceProduct>(name, id, product);
}

export function deleteProduct(id: string) {
	return statements.remove(name, id);
}
