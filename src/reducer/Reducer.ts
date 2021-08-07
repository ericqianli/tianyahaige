import appStateReducer from "./AppStateReducer";
import contentStateReducer from "./ContentStateReducer";

function Reducer(state: any = {}, action: any) {
    return {
        appState: appStateReducer(state.appState, action),
        contentState: contentStateReducer(state.contentState, action),
    };
}

export default Reducer;

export type State = ReturnType<typeof Reducer>;
