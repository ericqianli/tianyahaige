import { createSelector } from "reselect";
import { State } from "../reducer/Reducer";

export const getAppState = (state: State) => state.appState;

export const getSampled = createSelector(
    [getAppState],
    (appState) => appState.sampled
);
