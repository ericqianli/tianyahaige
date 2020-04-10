import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    receiveContent, receiveContentError, requestContent
} from "../action/Actions";
import Content from "../component/Content";
import { fetchContentPromise } from "../manager/ConnectionManager";
import { State } from "../reducer/Reducer";

function mapStateToProps(state: State) {
    return {
        contentState: state.contentState,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        // onSelectControlPanelActiveStep: (controlPanelActiveStep: number) => {
        //     dispatch(selectControlPanelActiveStep(controlPanelActiveStep));
        // },
        // // TODO: Customize query type, i.e., QueryType.MYSQL
        fetchContent: async () => {
            dispatch(requestContent());
            try {
                const content = await fetchContentPromise();
                dispatch(receiveContent(content));
            } catch (error) {
                dispatch(receiveContentError(error));
            }
        },
    };
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;
