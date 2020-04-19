import React from "react";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import { INITIAL_CONTENT } from "../constant/Constants";

const styles = (_theme: Theme) =>
    createStyles({
        content: {
            fontSize: "2rem",
            height: "20em",
            lineHeight: "2rem",
            overflowX: "scroll",
            textAlign: "start",
            textOrientation: "upright",
            whiteSpace: "pre-wrap",
            width: "100%",
            writingMode: "vertical-rl",
        },
    });

interface Props extends WithStyles<typeof styles> {
    contentBody: string;
    fetchContent: () => void;
}

class Content extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchContent();
    }

    render() {
        const { classes } = this.props;

        const contentBody = this.props.contentBody || INITIAL_CONTENT;
        return <div className={classes.content}>{contentBody}</div>;
    }
}

export default withStyles(styles)(Content);
