import "./App.css";

import React from "react";

import { Grid, makeStyles } from "@material-ui/core";

import Content from "./component/Content";
import { DEFAULT_MYSQL_QUERY_SOURCE_CONFIG } from "./constant/QuerySources";
import { fetchNativeQueryResultPromise } from "./manager/ConnectionManager";
import { MySqlQueryConfig, QueryType } from "./type/Types";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    // paper: {
    //     textAlign: "center",
    //     color: theme.palette.text.secondary,
    //     height: "100%",
    // },
    grid: {
        minHeight: "100vh",
    },
    header: {
        flexBasis: "calc(75vh - 32rem)",
        display: "flex",
    },
    headerContent: {
        width: "100%",
        backgroundColor: "red",
    },
    main: {
        flexBasis: "42rem",
        // flexGrow: 1,
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
        backgroundColor: "blue",
    },
}));

function App() {
    const classes = useStyles();
    console.log("asdf");

    const config: MySqlQueryConfig = {
        type: QueryType.MYSQL,
        source: DEFAULT_MYSQL_QUERY_SOURCE_CONFIG,
        database: "tianyahaige",
        table: "poem",
        sql: "select * from poem",
    };

    console.log(config);

    fetchNativeQueryResultPromise(config);

    return (
        <div className="App">
            <div className="AppBody">
                <Grid
                    className={classes.grid}
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                    // spacing={0}
                >
                    <Grid className={classes.header} item xs={12}>
                        <div className={classes.headerContent} />
                    </Grid>
                    <Grid className={classes.main} item xs={12}>
                        <Content />
                    </Grid>
                    <Grid className={classes.footer} item xs={12}>
                        <div className={classes.footerContent} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default App;
