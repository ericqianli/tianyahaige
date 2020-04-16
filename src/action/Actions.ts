import { MySqlQueryResult } from "data-sweet-query";

import {
    ActionType, ReceiveContentAction, ReceiveContentErrorAction,
    RequestContentAction
} from "../type/Types";

export function requestContent(): RequestContentAction {
    return {
        type: ActionType.REQUEST_CONTENT,
    };
}

export function receiveContent(
    content: MySqlQueryResult
): ReceiveContentAction {
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
