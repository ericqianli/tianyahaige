// Moved here to avoid cyclic reference

import { MySqlQuerySourceConfig, QueryType } from "data-sweet-query";

// Service

export const MYSQL_SERVER_URL = "https://datasweetdata.com:3030/mysql";

// Query sources

export const DEFAULT_MYSQL_QUERY_SOURCE_CONFIG: MySqlQuerySourceConfig = {
    type: QueryType.MYSQL,
    url: MYSQL_SERVER_URL,
    id: "default_mysql",
    name: "MySql Playground",
};
