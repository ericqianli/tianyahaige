// import "./font/ziyuesongkeben.ttf";
import "./App.css";
import "./css/fonts.css";
import "./css/shaft.css";

import clsx from "clsx";
import React from "react";
import { Provider } from "react-redux";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import WebFont from "webfontloader";

import {
    Drawer, Grid, IconButton, makeStyles, MuiThemeProvider, Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import {
    FALLEN_STAR, IMMORTALS, INDIA_TRAVEL, LANDING
} from "./constant/Routes";
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
            boxSizing: "border-box",
            [theme.breakpoints.down("sm")]: {
                fontSize: 8,
            },
            [theme.breakpoints.up("md")]: {
                fontSize: 16,
            },
            [theme.breakpoints.up("xl")]: {
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
        alignItems: "flex-start",
        // backgroundColor: "red",
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
    drawerContent: {
        height: "calc(50vh - 17.5rem)",
        minHeight: "9.625rem",

        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        // writingMode: "vertical-rl",
        // backgroundColor: "red",
    },
    menuItems: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        writingMode: "vertical-rl",
        // backgroundColor: "blue",
    },
    menuItem: {
        cursor: "pointer",
    },
    list: {
        width: 250,
    },
    fullList: {
        width: "auto",
    },
    menuButton: {
        margin: theme.spacing(1),
        padding: theme.spacing(0.5),
        borderRadius: theme.spacing(0.5),
    },
    closeButton: {
        padding: theme.spacing(1),
        borderRadius: theme.spacing(0.5),
    },
    hide: {
        visibility: "hidden",
    },
}));

function App(props: RouteComponentProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        drawerShown: false,
    });

    // React.MouseEvent<HTMLAnchorElement, MouseEvent>
    const toggleDrawerOnMouseClick = (open: boolean) => (
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
        setState({ ...state, drawerShown: open });
    };

    const drawer = (
        <div
            className={classes.drawerContent}
            role="presentation"
            onClick={toggleDrawerOnMouseClick(false)}
        >
            <div className={classes.menuItems}>
                <Typography
                    className={classes.menuItem}
                    variant="h3"
                    align="center"
                    onClick={() => {
                        props.history.push(LANDING);
                    }}
                >
                    天涯海槎
                </Typography>
                <Typography
                    className={classes.menuItem}
                    variant="h3"
                    align="center"
                    onClick={() => {
                        console.log(FALLEN_STAR);
                        props.history.push(FALLEN_STAR);
                    }}
                >
                    落星集
                </Typography>
                <Typography
                    className={classes.menuItem}
                    variant="h3"
                    align="center"
                    onClick={() => {
                        console.log(INDIA_TRAVEL);
                        props.history.push(INDIA_TRAVEL);
                    }}
                >
                    天竺遊記
                </Typography>
                <Typography
                    className={classes.menuItem}
                    variant="h3"
                    align="center"
                    onClick={() => {
                        console.log(IMMORTALS);
                        props.history.push(IMMORTALS);
                    }}
                >
                    列仙集
                </Typography>
            </div>
        </div>
    );

    return (
        <Provider store={Store}>
            <MuiThemeProvider theme={theme}>
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
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={toggleDrawerOnMouseClick(true)}
                                    edge="start"
                                    className={clsx(
                                        classes.menuButton,
                                        state.drawerShown && classes.hide
                                    )}
                                >
                                    <MenuIcon fontSize="default" />
                                </IconButton>
                                <Drawer
                                    anchor="top"
                                    open={state.drawerShown}
                                    onClose={toggleDrawerOnMouseClick(false)}
                                >
                                    {drawer}
                                </Drawer>
                            </Grid>
                            <Grid className={classes.main} item xs={12}>
                                <Route
                                    exact
                                    path={LANDING}
                                    component={ContentContainer}
                                />

                                <Route
                                    exact
                                    path={FALLEN_STAR}
                                    component={ContentContainer}
                                />
                                <Route
                                    exact
                                    path={INDIA_TRAVEL}
                                    component={ContentContainer}
                                />
                                <Route
                                    exact
                                    path={IMMORTALS}
                                    component={ContentContainer}
                                />
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

export default withRouter(App);
