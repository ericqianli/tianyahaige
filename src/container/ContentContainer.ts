import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { PaletteType } from "@material-ui/core";

import {
    receiveContent, receiveContentError, requestContent
} from "../action/Actions";
import Content from "../component/Content";
import { fetchContentPromise } from "../manager/ConnectionManager";
import { State } from "../reducer/Reducer";
import { getPoems } from "../selector/ContentStateSelector";

interface OwnProps extends RouteComponentProps {
    themePaletteType: PaletteType
}

function mapStateToProps(state: State, ownProps: RouteComponentProps) {
    return {
        poems: getPoems(state),
        path: ownProps.location.pathname,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchContent: async (sql: string) => {
            dispatch(requestContent());
            try {
                const content = await fetchContentPromise(sql);
                dispatch(receiveContent(content));
            } catch (error) {
                dispatch(receiveContentError(error));
            }
        },
    };
}

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

export default ContentContainer;
