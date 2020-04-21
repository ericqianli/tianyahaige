// import "./font/ziyuesongkeben.ttf";
import "./App.css";
import "./css/fonts.css";

import React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";

import { Grid, makeStyles } from "@material-ui/core";

import ContentContainer from "./container/ContentContainer";
import Store from "./store/Store";

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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        minHeight: "100vh",
    },
    header: {
        flexBasis: "calc(75vh - 34rem)",
        display: "flex",
    },
    headerContent: {
        width: "100%",
        // backgroundColor: "red",
    },
    main: {
        flexBasis: "44rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        flexBasis: "calc(25vh - 10rem)",
        display: "flex",
    },
    footerContent: {
        width: "100%",
    },
}));

function App() {
    const classes = useStyles();

    return (
        <Provider store={Store}>
            <div className="App">
                <div className="AppBody">
                    <Grid
                        className={classes.grid}
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="stretch"
                    >
                        <Grid className={classes.header} item xs={12}>
                            <div className={classes.headerContent} />
                        </Grid>
                        <Grid className={classes.main} item xs={12}>
                            <ContentContainer />
                        </Grid>
                        <Grid className={classes.footer} item xs={12}>
                            <div className={classes.footerContent} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Provider>
    );
}

export default App;
