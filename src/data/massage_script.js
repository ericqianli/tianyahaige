str = `[copy all text from poem_20200416 copy.js]`;
// str.split("\n").map((line) => line.slice(1, -2).split(", "));
// str.split("\n").map((line) => {
//     fields = line.slice(1, -2).split(", ");
//     return { id: fields[0], title: fields[1] };
// });

// str_field_sanitizer = (str) =>
//     str.slice(1, -1).replace(/[,|，|(\\r\\n)]/g, " ");

str_field_sanitizer = (str) =>
    str
        .slice(1, -1)
        .replace(/\\r\\n/g, " ")
        .replace(/[、|,|，|。|『|』]/g, " ");

data = str.split("\n").map((line) => {
    fields = line.substring(1, line.length - 2).split(", ");
    return {
        id: fields[0],
        title: str_field_sanitizer(fields[1]),
        subtitle: str_field_sanitizer(fields[3]) + str_field_sanitizer(fields[6]),
        date: str_field_sanitizer(fields[2]),
        body: str_field_sanitizer(fields[5]),
        collection: [1]
    };
});



// check notes for 2 and 78
