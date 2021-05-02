import {
    BODY_CHARACTERS_PER_LINE,
    CHARACTERS_TO_REMOVE,
    LINES_PER_PAGE,
    SUBTITLE_CHARACTERS_PER_LINE,
} from "../constant/Constants";
import { Line, Page, Poem } from "../type/Types";
import { List } from "immutable";

export function getPoemFromRows(rows: List<Poem>): Poem[] {
    return rows.toJS();
}

// For English or Hindi, we can fit more letters.
function getFontWidthMultiplier(subtitle: string) {
    const englishRegex = /^[A-Za-z0-9]/;
    if (englishRegex.test(subtitle)) {
        return 2.0;
    }
    return 1.0;
}

function getLineFromPoem(poem: Poem): Line {
    const { title, subtitle, body } = poem;

    console.log('subtitle', subtitle);

    if (title !== "") {
        poem.title = "";

        let remainingSubtitleLength =
            (SUBTITLE_CHARACTERS_PER_LINE - title.length * 2 - 5) *
            2 *
            getFontWidthMultiplier(subtitle);

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
        let remainingSubtitleLength =
            SUBTITLE_CHARACTERS_PER_LINE *
            2 *
            getFontWidthMultiplier(subtitle);

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

export function getLinesFromRows(poems: List<Poem>): Line[] {
    if (poems.size === 0) {
        return [];
    }

    const lines: Line[] = [];

    for (const poem of poems) {
        while (poem.body !== "") {
            const line = getLineFromPoem(poem);
            lines.push(line);
        }
    }

    return lines;
}

export function getPagesFromLines(lines: Line[]): Page[] {
    const pages = [];

    for (let i = 0; i < lines.length; i += LINES_PER_PAGE) {
        const page = lines.slice(i, i + LINES_PER_PAGE);
        pages.push(page);
    }

    return pages;
}
