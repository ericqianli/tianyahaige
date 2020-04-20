import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    receiveContent, receiveContentError, requestContent
} from "../action/Actions";
import Content from "../component/Content";
import { fetchContentPromise } from "../manager/ConnectionManager";
import { State } from "../reducer/Reducer";
import { getPoems } from "../selector/ContentStateSelector";

function mapStateToProps(state: State) {
    return {
        poems: getPoems(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
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
