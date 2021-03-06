import {
    SUBTITLE_CHARACTERS_PER_LINE,
    SUBTITLE_NO_WRAP_LIMIT,
} from "../constant/Constants";

export function getFormattedSubtitle(title: string, subtitle: string) {
    const englishRegex = /^[A-Za-z0-9]/;
    if (englishRegex.test(subtitle)) {
        return subtitle.split("\r\n");
    }

    let len = subtitle.length;

    if (title !== "" && len <= SUBTITLE_NO_WRAP_LIMIT) {
        return [subtitle];
    }

    let remaining = SUBTITLE_CHARACTERS_PER_LINE * 2;
    if (title !== "") {
        remaining -= (title.length * 2 + 5) * 2;
    }

    while (len > remaining) {
        len -= remaining;
        remaining = SUBTITLE_CHARACTERS_PER_LINE * 2;
    }

    const tailLength = len >>> 1;

    return [subtitle.slice(0, -tailLength), subtitle.slice(-tailLength)];
}
