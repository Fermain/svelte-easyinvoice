import db from "../db";

export function update<T>(name: string, id: string, data: T) {
    const stmt = db.prepare(`UPDATE ${name} SET data = ? WHERE id = ?`);
    return stmt.run(JSON.stringify(data), id);;
}