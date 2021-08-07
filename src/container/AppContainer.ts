import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
    receiveContent,
    receiveContentError,
    requestContent,
    toggleSampled,
} from "../action/Actions";
import App from "../App";
import { State } from "../reducer/Reducer";
import { getSampled } from "../selector/AppStateSelector";
import DBUtil from "../util/DBUtil";

function mapStateToProps(state: State) {
    return {
        sampled: getSampled(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        toggleSampled: async (collection: number, sampled: boolean) => {
            dispatch(toggleSampled());

            dispatch(requestContent());
            try {
                const content = await DBUtil.fetchPoemsByCollection(
                    collection,
                    sampled
                );
                dispatch(receiveContent(content));
            } catch (error) {
                dispatch(receiveContentError(error));
            }
        },
    };
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
