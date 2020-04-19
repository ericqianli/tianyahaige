import { connect } from "react-redux";
import { Dispatch } from "redux";

import {
    receiveContent, receiveContentError, requestContent
} from "../action/Actions";
import Content from "../component/Content";
import { fetchContentPromise } from "../manager/ConnectionManager";
import { State } from "../reducer/Reducer";
import { getContentBody } from "../selector/ContentStateSelectors";

function mapStateToProps(state: State) {
    return {
        contentBody: getContentBody(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchContent: async () => {
            dispatch(requestContent());
            try {
                const content = await fetchContentPromise();
                // console.log(content);
                dispatch(receiveContent(content));
            } catch (error) {
                dispatch(receiveContentError(error));
            }
        },
    };
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;
