import "./App.css";
import "./css/fonts.css";
import "./css/shaft.css";

import clsx from "clsx";
import React from "react";
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter,
} from "react-router-dom";
import WebFont from "webfontloader";

import {
    CssBaseline,
    Drawer,
    Grid,
    IconButton,
    makeStyles,
    MuiThemeProvider,
    PaletteType,
    Typography,
} from "@material-ui/core";
import SwapCallsIcon from "@material-ui/icons/SwapCalls";
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';

import {
    INITIAL_THEME_PALETTE_TYPE,
    ROUTE_INFO_MAP,
} from "./constant/Constants";
import ContentContainer from "./container/ContentContainer";
import { getThemeReselect } from "./selector/ThemeReselectors";

WebFont.load({
    custom: {
        families: [
            "Kang Xi Zi Dian",
            "Arial Unicode MS Subset",
            "Zi Yue Song Ke Ben",
            "Adobe Kaiti Std",
        ],
        urls: ["/fonts.css"],
    },
    loading: () => {
        console.log("start loading");
    },
    active: () => {
        console.log("active");
    },
    inactive: () => {
        console.log("inactive");
    },
    fontloading: (familyName, fvd) => {
        console.log("fontloading", familyName, fvd);
    },
    fontactive: (familyName, fvd) => {
        console.log("fontactive", familyName, fvd);
    },
    fontinactive: (familyName, fvd) => {
        console.log("fontinactive", familyName, fvd);
    },
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
        height: "calc(50vh - 20.5rem)",
        minHeight: "16rem",
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
    clickableItem: {
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
    rotatedMenuButton: {
        transform: "rotate(90deg)",
    },
    hide: {
        visibility: "hidden",
    },
    remove: {
        display: "none",
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
    fishtailWrapper: {
        fontSize: "2.2rem",
        position: "relative",
        left: "calc(1rem * -5/32)",
        margin: "0.2rem 0",
        textOrientation: "sideways",
    },
    menuWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    menuText: {
        marginBottom: "0.2rem",
    },
}));

interface Props extends RouteComponentProps {
    sampled: boolean;
    toggleSampled: (collection: number, sampled: boolean) => void;
}

function App(props: Props) {
    const collection = ROUTE_INFO_MAP[props.location.pathname].collection;

    const classes = useStyles();

    const [state, setState] = React.useState({
        drawerShown: false,
        themePaletteType: INITIAL_THEME_PALETTE_TYPE as PaletteType,
        sampled: false,
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
                            className={classes.clickableItem}
                            variant="h3"
                            align="center"
                            onClick={() => {
                                props.history.push(path);
                            }}
                        >
                            <div className={classes.menuWrapper}>
                                <div
                                    className={clsx(
                                        classes.fishtailWrapper,
                                        props.location.pathname !== path &&
                                            classes.hide
                                    )}
                                >
                                    {"\uE058"}
                                </div>
                                <div className={classes.menuText}>
                                    {info.title}
                                </div>
                                <div
                                    className={clsx(
                                        classes.fishtailWrapper,
                                        props.location.pathname !== path &&
                                            classes.hide
                                    )}
                                >
                                    {"\uE059"}
                                </div>
                            </div>
                        </Typography>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
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
                                    classes.rotatedMenuButton,
                                    state.drawerShown && classes.hide
                                )}
                            >
                                <FormatAlignLeftIcon fontSize="default" />
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
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() =>
                                    props.toggleSampled(collection, true)
                                }
                                className={clsx(classes.menuButton)}
                            >
                                <SwapCallsIcon fontSize="default" />
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
                                        // sampled={state.sampled}
                                        // component={ContentContainer}
                                        render={(routeProps) => (
                                            <ContentContainer
                                                sampled={props.sampled}
                                                {...routeProps}
                                            />
                                        )}
                                    />
                                ))}
                            </Switch>
                        </Grid>
                        <Grid className={classes.footer} item xs={12}>
                            <Typography variant="subtitle1" align="center">
                                Hao Shou • 2021
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </MuiThemeProvider>
    );
}

export default withRouter(App);
