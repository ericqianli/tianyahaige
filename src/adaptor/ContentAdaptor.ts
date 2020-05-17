import {
    BODY_CHARACTERS_PER_LINE, SUBTITLE_CHARACTERS_PER_LINE
} from "../constant/Constants";
import { Line, Poem } from "../type/Types";

export function getPoemFromRows(rows: any[]): Poem[] {
    return rows.map((row) => ({
        id: row.id,
        title: row.title || "",
        subtitle: row.subtitle || "",
        body: row.camera_ready_content || "",
    }));
}

function getPoem(row: any): Poem {
    return {
        id: row.id,
        title: row.title || "",
        subtitle: row.subtitle || "",
        body: row.camera_ready_content || "",
    };
}

function getLineFromPoem(poem: Poem): Line {
    const { title, subtitle, body } = poem;

    if (title !== "") {
        poem.title = "";

        let remainingSubtitleLength =
            (SUBTITLE_CHARACTERS_PER_LINE - title.length * 2 - 5) * 2;

        if (subtitle.length <= remainingSubtitleLength) {
            poem.subtitle = "";
            return {
                title,
                subtitle,
                body: "",
            };
        } else {
            const includedSubtitle = poem.subtitle.slice(
                0,
                remainingSubtitleLength
            );
            poem.subtitle = poem.subtitle.slice(remainingSubtitleLength);
            return {
                title,
                subtitle: includedSubtitle,
                body: "",
            };
        }
    }

    // title has been processed
    if (subtitle !== "") {
        let remainingSubtitleLength = SUBTITLE_CHARACTERS_PER_LINE * 2;

        if (subtitle.length <= remainingSubtitleLength) {
            poem.subtitle = "";
            return {
                title,
                subtitle,
                body: "",
            };
        } else {
            const includedSubtitle = poem.subtitle.slice(
                0,
                remainingSubtitleLength
            );
            poem.subtitle = poem.subtitle.slice(remainingSubtitleLength);
            return {
                title,
                subtitle: includedSubtitle,
                body: "",
            };
        }
    }

    // title and subtitle have both been processed
    if (body.length <= BODY_CHARACTERS_PER_LINE) {
        poem.body = "";
        return {
            title,
            subtitle,
            body,
        };
    } else {
        const includedBody = poem.body.slice(
            0,
            BODY_CHARACTERS_PER_LINE
        );
        poem.body = poem.body.slice(BODY_CHARACTERS_PER_LINE);
        return {
            title,
            subtitle,
            body: includedBody,
        };
    }
}

export function getLinesFromRows(rows: any[]): Line[] {
    if (rows.length === 0) {
        return [];
    }

    const lines: Line[] = [];

    for (const row of rows) {
        const currentPoem = getPoem(row);

        while (currentPoem.body !== "") {
            const line = getLineFromPoem(currentPoem);
            lines.push(line);
        }
    }

    return lines;
}
