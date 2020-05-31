import { MySqlQueryResult } from "data-sweet-query";

// Actions
export enum ActionType {
    REQUEST_CONTENT = "REQUEST_CONTENT",
    RECEIVE_CONTENT = "RECEIVE_CONTENT",
    RECEIVE_CONTENT_ERROR = "RECEIVE_CONTENT_ERROR",
}

// Action Types
export interface RequestContentAction {
    type: ActionType.REQUEST_CONTENT;
}

export interface ReceiveContentAction {
    type: ActionType.RECEIVE_CONTENT;
    content: MySqlQueryResult;
}

export interface ReceiveContentErrorAction {
    type: ActionType.RECEIVE_CONTENT_ERROR;
    error: any;
}

export type ContentStateAction =
    | RequestContentAction
    | ReceiveContentAction
    | ReceiveContentErrorAction;

// States
export interface ContentState {
    content: MySqlQueryResult;
}

export interface Poem {
    id: string;
    title: string;
    subtitle: string;
    body: string;
}

export interface Line {
    title: string;
    subtitle: string;
    body: string;
}

export type Page = Line[]
