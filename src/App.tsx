// import "./font/ziyuesongkeben.ttf";
import "./App.css";
import "./css/fonts.css";
import "./css/shaft.css";

import React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";

import {
    Grid, makeStyles, MuiThemeProvider, Typography
} from "@material-ui/core";

import { ROOT_FONT_SIZE } from "./constant/Constants";
import ContentContainer from "./container/ContentContainer";
import Store from "./store/Store";
import theme from "./theme/muiTheme";

WebFont.load({
    custom: {
        families: ["Zi Yue Song Ke Ben", "Adobe Kaiti Std"],
        urls: ["/fonts.css"],
    },
    // loading: () => {
    //     console.log("start loading");
    // },
    // active: () => {
    //     console.log("active");
    // },
    // inactive: () => {
    //     console.log("inactive");
    // },
    // fontloading: (familyName, fvd) => {
    //     console.log("fontloading", familyName, fvd);
    // },
    // fontactive: (familyName, fvd) => {
    //     console.log("fontactive", familyName, fvd);
    // },
    // fontinactive: (familyName, fvd) => {
    //     console.log("fontinactive", familyName, fvd);
    // },
});

const useStyles = makeStyles((_theme) => ({
    "@global": {
        html: {
            // NOTE: All rem uses this value.
            fontSize: ROOT_FONT_SIZE,
            // [theme.breakpoints.up("sm")]: {
            //     fontSize: 18,
            // },
            [theme.breakpoints.down("sm")]: {
                fontSize: 8,
            },
            [theme.breakpoints.up("md")]: {
                fontSize: 16,
            },
            [theme.breakpoints.up("lg")]: {
                fontSize: 24,
            },
        },
        
    },
    root: {
        flexGrow: 1,
    },
    grid: {
        minHeight: "100vh",
        // fontSize: "16px",
        // htmlFontSize: 8,
    },
    header: {
        flexBasis: "calc(50vh - 18rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        // backgroundColor: "red",
    },
    headerContent: {
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",

        writingMode: "vertical-rl",
        // backgroundColor: "blue",
    },
    main: {
        flexBasis: "44rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        // flexBasis: 0,

        flexBasis: "calc(50vh - 26rem)",
        // display: "flex",
        // justifyContent: "true",
        // backgroundColor: "blue",
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Provider store={Store}>
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    {/* <div className="shaft-load3">
                    <div className="shaft1"></div>
                    <div className="shaft2"></div>
                    <div className="shaft3"></div>
                    <div className="shaft4"></div>
                    <div className="shaft5"></div>
                    <div className="shaft6"></div>
                    <div className="shaft7"></div>
                    <div className="shaft8"></div>
                    <div className="shaft9"></div>
                    <div className="shaft10"></div>
                </div> */}
                    <div className="AppBody">
                        <Grid
                            className={classes.grid}
                            container
                            direction="column"
                            justify="space-between"
                            alignItems="stretch"
                        >
                            <Grid className={classes.header} item xs={12}>
                                <div className={classes.headerContent}>
                                    <Typography variant="h3" align="center">
                                        天涯海閣
                                    </Typography>
                                    <Typography variant="h3" align="center">
                                        落星集
                                    </Typography>
                                    <Typography variant="h3" align="center">
                                        天竺遊記
                                    </Typography>
                                    <Typography variant="h3" align="center">
                                        列仙集
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid className={classes.main} item xs={12}>
                                <ContentContainer />
                            </Grid>
                            <Grid className={classes.footer} item xs={12}>
                                {/* <Typography variant="subtitle1" align="center">
                                    Horizon Pavilion • 2020
                                </Typography> */}
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
        </Provider>
    );
}

export default App;
