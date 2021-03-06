str = `[copy all text from poem_20200416 copy.js]`;
// str.split("\n").map((line) => line.slice(1, -2).split(", "));
// str.split("\n").map((line) => {
//     fields = line.slice(1, -2).split(", ");
//     return { id: fields[0], title: fields[1] };
// });

add_period = (str) => str.replace(/[,|，|(\\r\\n)]/g, "︒") + "︒";

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
