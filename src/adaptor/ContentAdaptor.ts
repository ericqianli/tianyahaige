import {
    BODY_CHARACTERS_PER_LINE, CHARACTERS_TO_REMOVE, SUBTITLE_CHARACTERS_PER_LINE
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

    console.log(body);
    // title and subtitle have both been processed
    let displayLength = 0;
    let totalLength = 0;
    const removeSet = new Set(CHARACTERS_TO_REMOVE);
    for (totalLength = 0; totalLength < body.length; totalLength++) {
        const char = body[totalLength];
        if (char === "\r") {
            break;
        }
        if (!removeSet.has(char)) {
            displayLength++;
        }
        if (displayLength === BODY_CHARACTERS_PER_LINE) {
            if (
                totalLength < body.length - 1 &&
                removeSet.has(body[totalLength + 1])
            ) {
                totalLength++;
            }
            totalLength++;
            break;
        }
    }
    
    console.log(totalLength);

    if (body.length === totalLength) {
        poem.body = "";
        return {
            title,
            subtitle,
            body,
        };
    } else {
        const includedBody = poem.body.slice(0, totalLength);
        let remainingBody = poem.body.slice(totalLength);
        if (remainingBody.startsWith("\r")) {
            remainingBody = remainingBody.slice(2);
        }
        poem.body = remainingBody;
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
