import { createSelector } from "reselect";

import {
    getLinesFromPoems,
    getLinesFromRows,
    getPagesFromLines,
    getPoemFromRows,
} from "../adaptor/ContentAdaptor";
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

export const getPoems = (state: State, sampled: boolean) =>
    createSelector([getContentState], (contentState) =>
        getPoemFromRows(contentState.content, sampled)
    )(state);

export const getLines = createSelector([getPoems], getLinesFromPoems);

// export const getLines = (state: State, sampled: boolean) =>
//     createSelector([getContentState], (contentState) =>
//         getLinesFromRows(contentState.content, sampled)
//     )(state);

export const getPages = createSelector([getLines], (lines) =>
    getPagesFromLines(lines)
);
