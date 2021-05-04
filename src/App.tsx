// import "./font/ziyuesongkeben.ttf";
import "./App.css";
import "./css/fonts.css";
import "./css/shaft.css";

import clsx from "clsx";
import React from "react";
import { Provider } from "react-redux";
import {
    Route, RouteComponentProps, Switch, withRouter
} from "react-router-dom";
import WebFont from "webfontloader";

import {
    CssBaseline, Drawer, Grid, IconButton, makeStyles, MuiThemeProvider,
    PaletteType, Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { ROUTE_INFO_MAP } from "./constant/Constants";
import ContentContainer from "./container/ContentContainer";
import { getThemeReselect } from "./selector/ThemeReselectors";
import Store from "./store/Store";

WebFont.load({
    custom: {
        families: [
            "Arial Unicode MS Subset",
            "Zi Yue Song Ke Ben",
            "Adobe Kaiti Std",
        ],
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
    "@global": {
        html: {
            boxSizing: "border-box",
            [theme.breakpoints.up("xs")]: {
                fontSize: 8,
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: 12,
            },
            [theme.breakpoints.up("lg")]: {
                fontSize: 16,
            },
            [theme.breakpoints.up("xl")]: {
                fontSize: 24,
            },
        },
        body: {
            fontSize: "1rem",
        },
    },
    root: {
        flexGrow: 1,
    },
    grid: {
        minHeight: "100vh",
    },
    header: {
        flexBasis: "calc(50vh - 20.5rem)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        flexBasis: "44rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    footer: {
        flexBasis: "calc(50vh - 23.5rem)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    drawerContent: {
        height: "calc(50vh - 17.5rem)",
        minHeight: "9.625rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    menuItems: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        writingMode: "vertical-rl",
        "& li": {
            margin: "0 1rem",
        },
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
    hide: {
        visibility: "hidden",
    },
    symbolIcon: {
        fontFamily: [
            "Arial Unicode MS",
            "Arial Unicode MS Subset",
            "-apple-system",
            "BlinkMacSystemFont",
            "'Segoe UI'",
            "Roboto",
        ].join(","),
    },
    symbolWrapper: {
        width: "1em",
        height: "1em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "1em",
        position: "relative",
        top: "-1px",
    },
}));

function App(props: RouteComponentProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        drawerShown: false,
        themePaletteType: "dark" as PaletteType,
    });

    const toggleDrawerOnMouseClick = (open: boolean) => () => {
        setState({ ...state, drawerShown: open });
    };

    const toggleThemePaletteType = () => {
        setState({
            ...state,
            themePaletteType:
                state.themePaletteType === "light" ? "dark" : "light",
        });
    };

    const drawer = (
        <div
            className={classes.drawerContent}
            role="presentation"
            onClick={toggleDrawerOnMouseClick(false)}
        >
            <ul className={classes.menuItems}>
                {Object.entries(ROUTE_INFO_MAP).map(([path, info]) => (
                    <li key={path}>
                        <Typography
                            className={classes.menuItem}
                            variant="h3"
                            align="center"
                            onClick={() => {
                                props.history.push(path);
                            }}
                        >
                            {info.title}
                        </Typography>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <Provider store={Store}>
            <MuiThemeProvider theme={getThemeReselect(state)}>
                <CssBaseline />

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
                                    className={clsx(
                                        classes.menuButton,
                                        state.drawerShown && classes.hide
                                    )}
                                >
                                    <MenuIcon fontSize="default" />
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-label="toggle light/dark mode"
                                    onClick={toggleThemePaletteType}
                                    className={clsx(
                                        classes.menuButton,
                                        classes.symbolIcon,
                                        state.drawerShown && classes.hide
                                    )}
                                >
                                    <div className={classes.symbolWrapper}>
                                        <span>☯</span>
                                    </div>
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
                                <Switch>
                                    {Object.keys(ROUTE_INFO_MAP).map((path) => (
                                        <Route
                                            key={path}
                                            exact
                                            path={path}
                                            component={ContentContainer}
                                        />
                                    ))}
                                </Switch>
                            </Grid>
                            <Grid className={classes.footer} item xs={12}>
                                <Typography variant="subtitle1" align="center">
                                    Horizon Pavilion • 2021
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </MuiThemeProvider>
        </Provider>
    );
}

export default withRouter(App);
