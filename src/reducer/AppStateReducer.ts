import { INITIAL_APP_STATE } from "../constant/Constants";
import { ActionType, AppState, AppStateAction } from "../type/Types";

function appStateReducer(
    state: AppState = INITIAL_APP_STATE,
    action: AppStateAction
): AppState {
    switch (action.type) {
        case ActionType.TOGGLE_SAMPLED:
            state = {
                ...state,
                sampled: !state.sampled,
            };
            break;
    }
    return state;
}

export default appStateReducer;
