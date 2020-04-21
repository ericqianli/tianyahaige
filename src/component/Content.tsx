import React from "react";
import ReactResizeDetector from "react-resize-detector";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";

import BackgroundBody from "../image/background_body.jpg";
import BackgroundLeft from "../image/background_left.jpg";
import BackgroundRight from "../image/background_right.jpg";
import TitleImage from "../image/title.jpg";
import { getFormattedSubtitle } from "../manager/FormatManager";
import { Poem } from "../type/Types";

const WIDTH = "2.375rem";
const HALF_WIDTH = "1.1875rem";
const BACKGROUND_SIZE = "auto 48rem";

const styles = (_theme: Theme) =>
    createStyles({
        container: {
            height: "44rem",
            overflowX: "scroll",
            overflowY: "hidden",
            backgroundColor: "white",
            writingMode: "vertical-rl",
        },
        title: {
            height: "44rem",
            width: "32rem",
            backgroundImage: `url(${TitleImage})`,
            backgroundSize: BACKGROUND_SIZE,
            backgroundPosition: "center",
        },
        bookContent: {
            height: "44rem",
            backgroundImage: `url(${BackgroundBody})`,
            backgroundSize: BACKGROUND_SIZE,
            backgroundPosition: "right",
        },
        bookRightSide: {
            height: "44rem",
            width: "4rem",
            backgroundImage: `url(${BackgroundRight})`,
            backgroundSize: BACKGROUND_SIZE,
            backgroundPosition: "left",
        },
        bookLeftSide: {
            height: "44rem",
            width: "4rem",
            backgroundImage: `url(${BackgroundLeft})`,
            backgroundSize: BACKGROUND_SIZE,
            backgroundPosition: "right",
        },
        poemContent: {
            fontSize: "2rem",
            height: "40rem",
            margin: "2rem 0",
            width: "fit-content",
            lineHeight: WIDTH,
            textAlign: "start",
            writingMode: "vertical-rl",
            color: "black",
            position: "relative",
            right: "-1.1rem",
            top: "-0.1rem",
            "& .header": {
                fontSize: "1rem",
                lineHeight: HALF_WIDTH,
            },
            "& .title": {
                fontSize: "2rem",
                lineHeight: WIDTH,
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
                lineHeight: HALF_WIDTH,
                position: "relative",
                top: "-0.2rem",
                left: "0.75rem",
                display: "inline-block",
            },
        },
    });

interface Props extends WithStyles<typeof styles> {
    poems: Poem[];
    fetchContent: () => void;
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
            <PoemBody body={poem.body} />
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

class Content extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchContent();
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
                    <ReactResizeDetector handleWidth>
                        {({ width }: { width: number }) => {
                            let roundedWidth = width;
                            if (!isNaN(width)) {
                                roundedWidth = 1824 * Math.ceil(width / 1824);
                            }

                            if (width === roundedWidth) {
                                return (
                                    <div
                                        className={classes.poemContent}
                                        style={{
                                            minWidth: `${roundedWidth}px`,
                                        }}
                                    >
                                        <PoemsContent
                                            poems={this.props.poems}
                                        />
                                    </div>
                                );
                            } else {
                                return (
                                    <div
                                        className={classes.poemContent}
                                        style={{ width: `${roundedWidth}px` }}
                                    >
                                        <PoemsContent
                                            poems={this.props.poems}
                                        />
                                    </div>
                                );
                            }
                        }}
                    </ReactResizeDetector>
                </div>
                <div className={classes.bookLeftSide}></div>
            </div>
        );
    }
}

export default withStyles(styles)(Content);
