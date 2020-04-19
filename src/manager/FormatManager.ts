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

export function getFormattedCameraReadyContent(content: string) {
    var re = new RegExp(`[${CHARACTERS_TO_REMOVE}]`, 'g');
    const lines = content
        .split(/[\\r\\n|\s+]/)
        .map((line) => line.replace(re, ""))
        .filter((line) => line !== "");

    return lines.join(DELIMITER) + DELIMITER;
}
