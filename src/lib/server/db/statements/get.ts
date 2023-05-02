import type { SimpleRecord } from "../types";
import db from "../db";

export function getAll<T>(name: string) {
	return db
		.prepare(`SELECT * FROM ${name}`)
		.all()
		.map((record) => record as SimpleRecord)
		.map((record) => JSON.parse(record.data)) as T[];
}

export function getUnique<T>(id: string, name: string) {
	const record = db.prepare(`SELECT * FROM ${name} WHERE id = ?`).get(id) as SimpleRecord;
	return JSON.parse(record.data) as T;
}
