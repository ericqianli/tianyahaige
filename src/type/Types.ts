import { List } from "immutable";

// Actions
export enum ActionType {
    REQUEST_CONTENT = "REQUEST_CONTENT",
    RECEIVE_CONTENT = "RECEIVE_CONTENT",
    RECEIVE_CONTENT_ERROR = "RECEIVE_CONTENT_ERROR",
    TOGGLE_SAMPLED = "TOGGLE_SAMPLED",
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

export interface ToggleSampledAction {
    type: ActionType.TOGGLE_SAMPLED;
}

export type AppStateAction = ToggleSampledAction;

// States
export interface ContentState {
    content: List<Poem>;
}

export interface AppState {
    sampled: boolean;
}

export interface Poem {
    id: number;
    date: string;
    title: string;
    subtitle: string;
    body: string;
    collections: number[];
}

export interface Line {
    title: string;
    subtitle: string;
    body: string;
}

export type Page = Line[];
