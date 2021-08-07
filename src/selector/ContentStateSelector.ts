import { createSelector } from "reselect";
import {
    getLinesFromPoems,
    getPagesFromLines,
    getPoemFromRows,
} from "../adaptor/ContentAdaptor";
import { State } from "../reducer/Reducer";

export const getContentState = (state: State) => state.contentState;

export const getPoems = createSelector([getContentState], (contentState) =>
    getPoemFromRows(contentState.content)
);

export const getLines = createSelector([getPoems], getLinesFromPoems);

export const getPages = createSelector([getLines], (lines) =>
    getPagesFromLines(lines)
);
