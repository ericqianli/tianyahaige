import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import {
    receiveContent,
    receiveContentError,
    requestContent,
} from "../action/Actions";
import Content from "../component/Content";
import { State } from "../reducer/Reducer";
import { getLines, getPages, getPoems } from "../selector/ContentStateSelector";
import DBUtil from "../util/DBUtil";
import { getSampled } from "../selector/AppStateSelector";

interface OwnProps extends RouteComponentProps {
    sampled: boolean;
}

function mapStateToProps(state: State, ownProps: OwnProps) {
    return {
        poems: getPoems(state),
        lines: getLines(state),
        pages: getPages(state),
        sampled: getSampled(state),
        path: ownProps.location.pathname,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchContent: async (collection: number, sampled: boolean) => {
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

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;
