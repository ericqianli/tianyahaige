const CHARACTERS_TO_REMOVE = [
    "『",
    "』",
    "?",
    "？",
    "!",
    "！",
    "：",
    "，",
    "。",
    "︒",
];

const DELIMITER = "︒";

const SUBTITLE_CHARACTERS_PER_LINE = 40;
const SUBTITLE_NO_WRAP_LIMIT = 4;

export function getFormattedCameraReadyContent(content: string) {
    var re = new RegExp(`[${CHARACTERS_TO_REMOVE}]`, "g");
    const lines = content
        .split(/[\\r\\n|\s+]/)
        .map((line) => line.replace(re, ""))
        .filter((line) => line !== "");

    return lines.join(DELIMITER) + DELIMITER;
}

export function getFormattedSubtitle(title: string, subtitle: string) {
    let len = subtitle.length;

    if (len <= SUBTITLE_NO_WRAP_LIMIT) {
        return [subtitle];
    }

    let remaining = (SUBTITLE_CHARACTERS_PER_LINE - title.length * 2 - 5) * 2;

    while (len > remaining) {
        len -= remaining;
        remaining = SUBTITLE_CHARACTERS_PER_LINE * 2;
    }

    const tailLength = len >>> 1;

    return [subtitle.slice(0, -tailLength), subtitle.slice(-tailLength)];
}
