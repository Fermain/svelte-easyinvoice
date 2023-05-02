import crypto from "crypto";
import db from "../db";

export function create(name: string, data: any, id?: string) {
  const stmt = db.prepare(`INSERT INTO ${name} (id, data) VALUES (?, ?)`);
  id = id ?? crypto.randomUUID();
  return stmt.run(id, JSON.stringify(data));
}