import { copyFile } from "fs";

str = `[copy all text from poem_20200416 copy.js]`;
// str.split("\n").map((line) => line.slice(1, -2).split(", "));
// str.split("\n").map((line) => {
//     fields = line.slice(1, -2).split(", ");
//     return { id: fields[0], title: fields[1] };
// });

add_period = (str) => str.replace(/[\s+]/g, "︒") + "︒";

str_field_sanitizer = (str) =>
    str
        .slice(1, -1)
        .replace(/  /g, " ")
        .replace(/[？|！] /g, " ")
        .replace(/[，|。| ]\\r\\n/g, " ")
        .replace(/\\r\\n/g, " ")
        .replace(/[、|︑|,|，|。|︒|?|？|!|！|：|『|』]/g, " ");

data = str.split("\n").map((line) => {
    fields = line.substring(1, line.length - 2).split(", ");
    return {
        id: fields[0],
        title: str_field_sanitizer(fields[1]),
        subtitle:
            str_field_sanitizer(fields[3]) + str_field_sanitizer(fields[6]),
        date: str_field_sanitizer(fields[2]),
        body: str_field_sanitizer(fields[5])
            .replace(/\s\s/g, "︒\r\n")
            .replace(/ /g, "︒"),
        collections: [0, 1],
    };
});

// body: str_field_sanitizer(fields[5]).replace(/\s/g, "︒"),

// check notes for 2 and 78

// second round massage on processed poems
// poems = [copy from poem.json]

// patch ending period
poems.map((poem) => {
    if (!poem.body.endsWith("︒")) {
        poem.body += "︒";
    }
});

// remove chinese subtitle space
const englishRegex = /^[A-Za-z0-9]/;
poems.map((poem) => {
    if (!englishRegex.test(poem.subtitle)) {
        poem.subtitle = poem.subtitle.replace(/\s/g, "");
    }
});

// sort by date
poems = `[Copy content from poem.json]`;
sorted_poems = poems.sort((p1, p2) => ("" + p1.date).localeCompare(p2.date));

// re index
reindexed_poems = poems.map((p, index) => {
    return { ...p, id: index + 1 };
});

// bucketization
bucketized_poems = poems.slice(0, 50);

// remove unselected poems from category 0
all_poems.map((p) => {
    if (!selected_ids.includes(p.id)) {
        p.collections = p.collections.filter((i) => i !== 0);
    }
    return p;
});

// get all poem text for font subset
var text = "";
poems.map((poem) => text += poem.title + "\r\n" + poem.subtitle + "\r\n" + poem.body + "\r\n");
copy(text);

// const CHARACTERS_TO_REMOVE = [
//     "『",
//     "』",
//     "?",
//     "？",
//     "!",
//     "！",
//     "：",
//     "，",
//     "。",
//     "︒",
// ];

// let i = 0;
// const set = new Set(data);
// console.log(Array.from(set).join(""));
// const lines = data.split(/(?<!\r)\n/);
// let outputLines = [];
// for (const line of lines) {
//     if (line.startsWith("(")) {
//         const fields = line.split(",");
//         const content = fields[5].slice(2, -1);
//         const formattedContent = getFormattedCameraReadyContent(content);
//         fields[5] = " '" + formattedContent + "'";
//         outputLines.push(fields.join(","));
//     } else {
//         outputLines.push(line);
//     }
// }
// console.log(lines.join(""));