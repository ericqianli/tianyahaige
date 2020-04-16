import { INITIAL_CONTENT_STATE } from "../constant/Constants";
import { ActionType, ContentState, ContentStateAction } from "../type/Types";

function contentStateReducer(
    state: ContentState = INITIAL_CONTENT_STATE,
    action: ContentStateAction
): ContentState {
    switch(action.type) {
        case ActionType.REQUEST_CONTENT:
            break;
        case ActionType.RECEIVE_CONTENT:
            state = {
                ...state,
                content: action.content,
            }
            break;
        case ActionType.RECEIVE_CONTENT_ERROR:
            break;
    }

    return state;
}

export default contentStateReducer;