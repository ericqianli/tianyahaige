import { createSelector } from "reselect";

import { State } from "../reducer/Reducer";

export const getContentState = (state: State) => state.contentState;

export const getContentBody = createSelector(
    [getContentState],
    (contentState) => {
        console.log("check", contentState.content.rows);
        const content = contentState.content.rows
            ?.map((row) => "  " + row.title + "\n" + row.content)
            .join("\n");
        return content || "";
    }
);
