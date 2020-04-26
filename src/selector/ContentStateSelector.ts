import { createSelector } from "reselect";

import { getPoemFromRows } from "../adaptor/ContentAdaptor";
// import data from "../data/poem_20200416.js";
import { State } from "../reducer/Reducer";

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

export const getContentState = (state: State) => state.contentState;

export const getPoems = createSelector([getContentState], (contentState) =>
    getPoemFromRows(contentState.content.rows || [])
);
