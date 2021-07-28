import clsx from "clsx";
import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {
    createStyles,
    PaletteType,
    Theme,
    WithStyles,
    withStyles,
    withTheme,
    WithTheme,
} from "@material-ui/core";

import {
    BACKGROUND_ADJUSTED_SIZE_BY_WIDTH,
    BACKGROUND_SIZE_BY_HEIGHT,
    BACKGROUND_SIZE_BY_WIDTH,
    COLUMN_WIDTH,
    COLUMN_WIDTH_IN_REM,
    COLUMNS_PER_BACKGROUD,
    CONTENT_HEIGHT,
    HALF_COLUMN_WIDTH,
    ROUTE_INFO_MAP,
} from "../constant/Constants";
import BackgroundBodyDark from "../image/background_body_2x_dark.png";
import BackgroundBodyLight from "../image/background_body_2x_light.png";
import BackgroundLeftDark from "../image/background_left_2x_dark.png";
import BackgroundLeftLight from "../image/background_left_2x_light.png";
import BackgroundRightDark from "../image/background_right_2x_dark.png";
import BackgroundRightLight from "../image/background_right_2x_light.png";
import { getFormattedSubtitle } from "../manager/FormatManager";
import { Line, Page, Poem } from "../type/Types";

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
            writingMode: "vertical-rl",

            // To style scrollbar thumb with transition
            // backgroundColor: "rgba(0,0,0,0)",
            // WebkitBackgroundClip: "text",
            // backgroundClip: "text",
            // transition: "background-color 500ms ease-in-out",

            "&::-webkit-scrollbar": {
                height: "1rem",
            },
            "&::-webkit-scrollbar-track": {
                background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                border: ".25rem solid rgba(0, 0, 0, 0)",
                borderRadius: ".5rem",
                backgroundClip: "padding-box",
                backgroundColor: "transparent",
                // backgroundColor: "inherit",
            },
            "&:hover::-webkit-scrollbar-thumb": {
                backgroundColor:
                    theme.palette.type === "light"
                        ? "rgba(0, 0, 0, .25)"
                        : "rgba(255, 255, 255, .25)",
            },
            // "&:hover": {
            //     backgroundColor:
            //         theme.palette.type === "light"
            //             ? "rgba(0, 0, 0, .25)"
            //             : "rgba(255, 255, 255, .25)",
            // },
        },
        title: {
            height: CONTENT_HEIGHT,
            width: "32rem",
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "center",
        },
        fadeOutAnimation: {
            animationName: "$fadeOut",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: 1,
        },
        fadeInAnimation: {
            animationName: "$fadeIn",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: 1,
        },
        bookContent: {
            height: CONTENT_HEIGHT,
            backgroundImage:
                theme.palette.type === "light"
                    ? `url(${BackgroundBodyLight})`
                    : `url(${BackgroundBodyDark})`,
            backgroundSize: BACKGROUND_SIZE_BY_WIDTH,
            backgroundPosition: "right",
            [theme.breakpoints.between("sm", "md")]: {
                backgroundSize: BACKGROUND_ADJUSTED_SIZE_BY_WIDTH,
            },
        },
        bookRightSide: {
            height: CONTENT_HEIGHT,
            width: "5rem",
            backgroundImage:
                theme.palette.type === "light"
                    ? `url(${BackgroundRightLight})`
                    : `url(${BackgroundRightDark})`,
            backgroundSize: BACKGROUND_SIZE_BY_HEIGHT,
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
        },
        bookLeftSide: {
            height: CONTENT_HEIGHT,
            width: "5rem",
            backgroundImage:
                theme.palette.type === "light"
                    ? `url(${BackgroundLeftLight})`
                    : `url(${BackgroundLeftDark})`,
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
            // color: "black",
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
                display: "inline-block",
                // display: "none",
            },
        },
    });

function PageContent({ page }: { page: Page }) {
    return (
        <>
            {page.map((line, index) => (
                <LineContent key={index} line={line} />
            ))}
        </>
    );
}

function LineContent({ line }: { line: Line }) {
    return (
        <>
            <PoemHeader
                key="header"
                title={line.title}
                subtitle={line.subtitle}
            />
            {line.body.split("\r\n").map((body, index) => (
                <PoemBody key={index} body={body} />
            ))}
        </>
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
    const linesOfPoem = body.split("︒").filter((line) => line !== "");
    const compoments = [];

    for (const index in linesOfPoem) {
        compoments.push(linesOfPoem[index], <Period key={index} />);
    }

    if (!body.endsWith("︒")) {
        compoments.pop();
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

interface Props extends WithStyles<typeof styles>, WithTheme {
    lines: Line[];
    pages: Page[];
    poems: Poem[];
    path: string;
    themePaletteType: PaletteType;
    fetchContent: (collection: number) => void;
}

interface State {
    stage: number;
}

class Content extends React.Component<Props, State> {
    fadeTimeout?: NodeJS.Timeout;

    constructor(props: Props) {
        super(props);
        this.state = {
            stage: 0,
        };
    }

    componentDidMount() {
        const collection = ROUTE_INFO_MAP[this.props.path].collection;
        this.props.fetchContent(collection);
        this.fadeTimeout = undefined;

        this.setState({ stage: 1 });
    }

    render() {
        const { classes, poems, pages, path } = this.props;

        const themePaletteType = this.props.theme.palette.type;

        if (poems.length === 0) {
            return (
                <div
                    key={path}
                    className={classes.title}
                    style={{
                        backgroundImage:
                            themePaletteType === "light"
                                ? `url(${ROUTE_INFO_MAP[path].backgroundLight})`
                                : `url(${ROUTE_INFO_MAP[path].backgroundDark})`,
                    }}
                />
            );
        }

        // poems content non empty
        if (this.state.stage === 1) {
            if (this.fadeTimeout === undefined) {
                this.fadeTimeout = setTimeout(() => {
                    this.fadeTimeout && clearTimeout(this.fadeTimeout);
                    this.fadeTimeout = undefined;
                    this.setState({ stage: 2 });
                }, 2000);
            }

            return (
                <div
                    key={path}
                    className={clsx(classes.title, classes.fadeOutAnimation)}
                    style={{
                        backgroundImage:
                            themePaletteType === "light"
                                ? `url(${ROUTE_INFO_MAP[path].backgroundLight})`
                                : `url(${ROUTE_INFO_MAP[path].backgroundDark})`,
                    }}
                />
            );
        }

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

                            return (
                                <>
                                    {pages.map((page, index) => (
                                        <div
                                            key={index}
                                            className={classes.poemContent}
                                            style={{
                                                width: `${backgroundWidthInPixel}px`,
                                            }}
                                        >
                                            <PageContent page={page} />
                                        </div>
                                    ))}
                                </>
                            );
                        }}
                    </ReactResizeDetector>
                </div>
                <div className={classes.bookLeftSide}></div>
            </div>
        );
    }
}

export default withTheme(withStyles(styles)(Content));
