import { INITIAL_CONTENT_STATE } from "../constant/Constants";
import { ContentState } from "../type/Types";

function contentStateReducer(
    state: ContentState = INITIAL_CONTENT_STATE,
    // action: ContentStateAction
    action: any,
): ContentState {
    return state;
}

export default contentStateReducer;