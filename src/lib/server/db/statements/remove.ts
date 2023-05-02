import db from "../db";

export function remove(name: string, id: string) {
    const stmt = db.prepare(`DELETE FROM ${name} WHERE id = ?`);
    return stmt.run(id);;
}