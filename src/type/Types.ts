import { List } from "immutable";


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
    content: List<Poem>;
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
    content: List<Poem>;
}

export interface Poem {
    id: string;
    date: string;
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
