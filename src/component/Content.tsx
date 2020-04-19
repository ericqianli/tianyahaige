import React from "react";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import { INITIAL_CONTENT } from "../constant/Constants";
import Image from "../image/book.jpg";

const styles = (_theme: Theme) =>
    createStyles({
        container: {
            height: "42rem",
            overflowX: "scroll",
            backgroundColor: "white",
            writingMode: "vertical-rl",
        },
        content: {
            fontSize: "2rem",
            height: "40rem",
            margin: "1rem 0",
            width: "fit-content",
            lineHeight: "2rem",
            textAlign: "start",
            textOrientation: "upright",
            whiteSpace: "pre-wrap",
            writingMode: "vertical-rl",
            backgroundImage: `url(${Image})`,
            backgroundSize: "auto 40rem",
            backgroundPosition: "right",
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
        return (
            <div className={classes.container}>
                <div className={classes.content}>{contentBody}</div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
