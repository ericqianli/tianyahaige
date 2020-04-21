import { Poem } from "../type/Types";

export function getPoemFromRows(rows: any[]): Poem[] {
    return rows.map((row) => ({
        id: row.id,
        title: row.title || "",
        subtitle: row.subtitle || "",
        body: row.camera_ready_content || "",
    }));
}
