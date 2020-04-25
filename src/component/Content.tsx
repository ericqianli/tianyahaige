import clsx from "clsx";
import React from "react";
import ReactResizeDetector from "react-resize-detector";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import {
    BACKGROUND_ADJUSTED_SIZE_BY_WIDTH, BACKGROUND_SIZE_BY_HEIGHT,
    BACKGROUND_SIZE_BY_WIDTH, COLUMN_WIDTH, COLUMN_WIDTH_IN_REM,
    COLUMNS_PER_BACKGROUD, CONTENT_HEIGHT, HALF_COLUMN_WIDTH, ROUTE_INFO_MAP
} from "../constant/Constants";
import BackgroundBody from "../image/background_body.jpg";
import BackgroundLeft from "../image/background_left.jpg";
import BackgroundRight from "../image/background_right.jpg";
import { getFormattedSubtitle } from "../manager/FormatManager";
import { Poem } from "../type/Types";

const styles = (theme: Theme) =>
    createStyles({
        "@keyframes fadeOut": {
            "0%": {
                opacity: 1,
            },
            "40%": {
                opacity: 1,
            },
            "100%": {
                opacity: 0,
            },
        },
        "@keyframes fadeIn": {
            "0%": {
                opacity: 0,
            },
            "100%": {
                opacity: 1,
            },
        },
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
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "center",
            // transition: "opacity 2s ease-out",
            // "&:hover": {
            //     opacity: 0,
            // },
            // animationName: "fade",
        },
        fadeOutAnimation: {
            animationName: "$fadeOut",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: 1,
        },
        fadeInAnimation: {
            animationName: "$fadeIn",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: 1,
        },
        bookContent: {
            height: CONTENT_HEIGHT,
            backgroundImage: `url(${BackgroundBody})`,
            backgroundSize: BACKGROUND_SIZE_BY_WIDTH,
            backgroundPosition: "right",
            [theme.breakpoints.between("sm", "md")]: {
                backgroundSize: BACKGROUND_ADJUSTED_SIZE_BY_WIDTH,
            },
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
            "& .<header>": {
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
                <PoemBody key={index} body={body} />
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

interface Props extends WithStyles<typeof styles> {
    poems: Poem[];
    path: string;
    fetchContent: (sql: string) => void;
}

interface State {
    titleFaded: boolean;
}

class Content extends React.Component<Props, State> {
    numPages: number = 0;
    fadeTimeout?: NodeJS.Timeout;

    stage: number = 0;

    constructor(props: Props) {
        super(props);
        // console.log('constructor');

        this.state = {
            titleFaded: false,
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        const sql = ROUTE_INFO_MAP[this.props.path].sql;
        this.props.fetchContent(sql);
        this.numPages = 0;
        this.fadeTimeout = undefined;
        this.setState({
            titleFaded: false,
        });

        this.stage = 0;
    }

    render() {
        const { classes, poems, path } = this.props;

        console.log(this.state.titleFaded, poems.length);

        if (poems.length === 0) {
            if (this.stage === 0) {
                console.log("render title");
                this.stage++;
                return (
                    <div
                        key={path}
                        className={classes.title}
                        style={{
                            backgroundImage: `url(${ROUTE_INFO_MAP[path].image})`,
                            opacity: 1,
                        }}
                    />
                );
            } else {
                return (
                    <div
                        key={path}
                        className={classes.title}
                        style={{
                            backgroundImage: `url(${ROUTE_INFO_MAP[path].image})`,
                        }}
                    />
                );
            }
        }

        // poems content non empty
        if (this.stage === 1) {
            console.log("render title with fade");
            if (this.fadeTimeout === undefined) {
                this.fadeTimeout = setTimeout(() => {
                    this.fadeTimeout && clearTimeout(this.fadeTimeout);
                    this.fadeTimeout = undefined;
                    this.stage = 2;
                    this.setState({ titleFaded: true });
                }, 3000);
            }
            return (
                <div
                    key={path}
                    className={clsx(classes.title, classes.fadeOutAnimation)}
                    style={{
                        backgroundImage: `url(${ROUTE_INFO_MAP[path].image})`,
                        // opacity: 0,
                    }}
                />
            );
        }

        // return (
        //     <div
        //         key={path}
        //         className={classes.title}
        //         style={{
        //             backgroundImage: `url(${ROUTE_INFO_MAP[path].image})`,
        //             opacity: 0,
        //         }}
        //     />
        // );

        console.log("render content");

        return (
            <div className={clsx(classes.container, classes.fadeInAnimation)}>
                <div className={classes.bookRightSide}></div>
                <div className={classes.bookContent}>
                    <ReactResizeDetector handleWidth handleHeight>
                        {({ width }: { width: number }) => {
                            const rootFontSizeInPixel = getRootFontSize();
                            const columnWidthInPixel = Math.floor(
                                rootFontSizeInPixel * COLUMN_WIDTH_IN_REM
                            );

                            const backgroundWidthInPixel =
                                columnWidthInPixel * COLUMNS_PER_BACKGROUD;

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
                                    // key={this.props.path}
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
