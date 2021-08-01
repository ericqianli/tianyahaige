import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { PaletteType } from "@material-ui/core";

import {
    receiveContent,
    receiveContentError,
    requestContent,
} from "../action/Actions";
import Content from "../component/Content";
import { State } from "../reducer/Reducer";
import { getLines, getPages, getPoems } from "../selector/ContentStateSelector";
import DBUtil from "../util/DBUtil";

interface OwnProps extends RouteComponentProps {
    sampled: boolean;
}

function mapStateToProps(state: State, ownProps: OwnProps) {
    console.log("ownProps.sampled", ownProps.sampled);
    return {
        poems: getPoems(state, ownProps.sampled),
        lines: getLines(state, ownProps.sampled),
        pages: getPages(state, ownProps.sampled),
        path: ownProps.location.pathname,
        sampled: ownProps.sampled,
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
