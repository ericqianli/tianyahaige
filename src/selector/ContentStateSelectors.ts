import { createSelector } from "reselect";

import data from "../data/poem_20200416.js";
import { getFormattedCameraReadyContent } from "../manager/FormatManager";
import { State } from "../reducer/Reducer";

const lines = data.split(/(?<!\r)\n/);
let outputLines = [];
for (const line of lines) {
    if (line.startsWith("(")) {
        const fields = line.split(",");

        // console.log(fields[1], fields[6]);

        const content = fields[5].slice(2, -1);
        const formattedContent = getFormattedCameraReadyContent(content);
        fields[5] = " '" + formattedContent + "'";
        outputLines.push(fields.join(","));
    } else {
        outputLines.push(line);
    }
}
console.log(outputLines.join("\n"));

export const getContentState = (state: State) => state.contentState;

export const getContentBody = createSelector(
    [getContentState],
    (contentState) => {
        console.log("check", contentState.content.rows);

        // const rows = contentState.content.rows || [];
        // for (const row of rows) {
        //     const content = row.camera_ready_content;
        //     // console.log(content);
        //     // getFormattedCameraReadyContent(content);
        //     // console.log(getFormattedCameraReadyContent(content));
        // }
        const content = contentState.content.rows
            ?.map((row) => "  " + row.title + "\n" + row.camera_ready_content)
            .join("\n");
        return content || "";
    }
);
