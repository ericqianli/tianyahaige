import { Poem } from "../type/Types";

export function getPoemFromRows(rows: any[]): Poem[] {
    return rows.map((row) => ({
        title: row.title || "",
        subtitle: row.subtitle || "",
        body: row.camera_ready_content || "",
    }));
}
