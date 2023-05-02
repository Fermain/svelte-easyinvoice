import db from "../db";
import type { SimpleTable } from "../types";

export function prepareTable(name: string) {
	db.prepare(
		`
    CREATE TABLE IF NOT EXISTS ${name} (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL
    )
  `
	).run();
}

export function prepareAllTables(tables: Array<SimpleTable>) {
  Object.values(tables).forEach((table) => prepareTable(table.name));
}