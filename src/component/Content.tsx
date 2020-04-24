import React from "react";
import ReactResizeDetector from "react-resize-detector";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import {
    BACKGROUND_SIZE_BY_HEIGHT, BACKGROUND_SIZE_BY_WIDTH,
    BACKGROUND_WIDTH_IN_REM, COLUMN_WIDTH, CONTENT_HEIGHT, HALF_COLUMN_WIDTH
} from "../constant/Constants";
import BackgroundBody from "../image/background_body.jpg";
import BackgroundLeft from "../image/background_left.jpg";
import BackgroundRight from "../image/background_right.jpg";
import TitleImage from "../image/title.jpg";
import { getFormattedSubtitle } from "../manager/FormatManager";
import { getSqlFromRouterPath } from "../manager/QueryManager";
import { Poem } from "../type/Types";

const styles = (_theme: Theme) =>
    createStyles({
        container: {
            height: CONTENT_HEIGHT,
            overflowX: "scroll",
            overflowY: "hidden",
            backgroundColor: "white",
            writingMode: "vertical-rl",
        },
        title: {
            height: CONTENT_HEIGHT,
            width: "32rem",
            backgroundImage: `url(${TitleImage})`,
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "center",
        },
        bookContent: {
            height: CONTENT_HEIGHT,
            backgroundImage: `url(${BackgroundBody})`,
            backgroundSize: BACKGROUND_SIZE_BY_WIDTH,
            backgroundPosition: "right",
        },
        bookRightSide: {
            height: CONTENT_HEIGHT,
            width: "5rem",
            backgroundImage: `url(${BackgroundRight})`,
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
        },
        bookLeftSide: {
            height: CONTENT_HEIGHT,
            width: "5rem",
            backgroundImage: `url(${BackgroundLeft})`,
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
        },
        poemContent: {
            fontSize: "2rem",
            height: "40rem",
            margin: "2rem 0",
            width: "fit-content",
            lineHeight: COLUMN_WIDTH,
            textAlign: "start",
            writingMode: "vertical-rl",
            color: "black",
            position: "relative",
            right: "-1.1rem",
            top: "-0.1rem",
            "& .header": {
                fontSize: "1rem",
                lineHeight: HALF_COLUMN_WIDTH,
            },
            "& .title": {
                fontSize: "2rem",
                lineHeight: COLUMN_WIDTH,
                float: "left",
                marginTop: "4rem",
                marginBottom: "1rem",
            },
            "& .subtitle": {
                verticalAlign: "top",
                display: "block",
            },
            "& .body": {
                clear: "both",
            },
            "& .period": {
                marginTop: 0,
                marginBottom: "-0.75rem",
                fontSize: "0.75rem",
                lineHeight: HALF_COLUMN_WIDTH,
                position: "relative",
                top: "-0.2rem",
                left: "0.75rem",
                display: "none",
            },
        },
    });

interface Props extends WithStyles<typeof styles> {
    poems: Poem[];
    path: string;
    fetchContent: (sql: string) => void;
}

function PoemsContent({ poems }: { poems: Poem[] }) {
    return (
        <>
            {poems.map((poem) => (
                <PoemContent key={poem.id} poem={poem} />
            ))}
        </>
    );
}

function PoemContent({ poem }: { poem: Poem }) {
    return (
        <div id={poem.id}>
            <PoemHeader
                key="header"
                title={poem.title}
                subtitle={poem.subtitle}
            />
            {poem.body.split("\r\n").map((body, index) => (
                <PoemBody body={body} />
            ))}
        </div>
    );
}

function PoemHeader({ title, subtitle }: { title: string; subtitle: string }) {
    const subtitleParts = getFormattedSubtitle(title, subtitle);
    return (
        <div className="header">
            <span key="title" className="title">
                {title}
            </span>
            {subtitleParts.map((subtitle, index) => (
                <span key={`subtitle_${index}`} className="subtitle">
                    {subtitle}
                </span>
            ))}
        </div>
    );
}

function PoemBody({ body }: { body: string }) {
    const lines = body.split("︒").filter((line) => line !== "");
    const compoments = [];

    for (const index in lines) {
        compoments.push(lines[index], <Period key={index} />);
    }

    return <div className="body">{compoments}</div>;
}

function Period() {
    return <span className="period">︒</span>;
}

function getRootFontSize() {
    const rootFontSize = window
        .getComputedStyle(document.body)
        .getPropertyValue("font-size");
    const rootFontSizeInPixel = Number(rootFontSize.slice(0, -2));
    return rootFontSizeInPixel;
}

class Content extends React.Component<Props> {
    numPages: number = 0;

    componentDidMount() {
        console.log('content component mounted', this.props.path);
        const sql = getSqlFromRouterPath(this.props.path);
        console.log(sql);
        this.props.fetchContent(sql);
    }

    render() {
        const { classes, poems } = this.props;

        if (poems.length === 0) {
            return <div className={classes.title} />;
        }

        return (
            <div className={classes.container}>
                <div className={classes.bookRightSide}></div>
                <div className={classes.bookContent}>
                    <ReactResizeDetector handleWidth handleHeight>
                        {({ width }: { width: number }) => {
                            const rootFontSizeInPixel = getRootFontSize();
                            const backgroundWidthInPixel =
                                rootFontSizeInPixel * BACKGROUND_WIDTH_IN_REM;

                            if (
                                this.numPages === 0 &&
                                !isNaN(width) &&
                                width > 0
                            ) {
                                this.numPages = Math.ceil(
                                    width / backgroundWidthInPixel
                                );
                            }

                            const fullWidth =
                                backgroundWidthInPixel * this.numPages;

                            return (
                                <div
                                    className={classes.poemContent}
                                    style={{
                                        width:
                                            fullWidth === 0
                                                ? "fit-content"
                                                : `${fullWidth}px`,
                                    }}
                                >
                                    <PoemsContent poems={this.props.poems} />
                                </div>
                            );
                        }}
                    </ReactResizeDetector>
                </div>
                <div className={classes.bookLeftSide}></div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
