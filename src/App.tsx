import "./App.css";

import React from "react";

import Content from "./component/Content";
import { DEFAULT_MYSQL_QUERY_SOURCE_CONFIG } from "./constant/QuerySources";
import { fetchNativeQueryResultPromise } from "./manager/ConnectionManager";
import { MySqlQueryConfig, QueryType } from "./type/Types";

function App() {
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
            <header className="App-header">
                <Content/>
            </header>
        </div>
    );
}

export default App;
