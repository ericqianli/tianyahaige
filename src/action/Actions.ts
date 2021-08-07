import {
    ActionType,
    ReceiveContentAction,
    ReceiveContentErrorAction,
    RequestContentAction,
    Poem,
    ToggleSampledAction,
} from "../type/Types";
import { List } from "immutable";

export function requestContent(): RequestContentAction {
    return {
        type: ActionType.REQUEST_CONTENT,
    };
}

export function receiveContent(content: List<Poem>): ReceiveContentAction {
    return {
        type: ActionType.RECEIVE_CONTENT,
        content,
    };
}

export function receiveContentError(error: Error): ReceiveContentErrorAction {
    return {
        type: ActionType.RECEIVE_CONTENT_ERROR,
        error,
    };
}

export function toggleSampled(): ToggleSampledAction {
    return {
        type: ActionType.TOGGLE_SAMPLED,
    };
}
