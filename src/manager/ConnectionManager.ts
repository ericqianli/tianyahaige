import {
    fetchQueryResultPromise, MySqlQueryConfig, MySqlQueryResult, QueryType
} from "data-sweet-query";

import { DEFAULT_MYSQL_QUERY_SOURCE_CONFIG } from "../constant/QuerySources";

export async function fetchContentPromise(sql: string): Promise<MySqlQueryResult> {
    try {
        const queryConfig: MySqlQueryConfig = {
            type: QueryType.MYSQL,
            source: DEFAULT_MYSQL_QUERY_SOURCE_CONFIG,
            database: "poem",
            table: "poem",
            sql,
        };
        const result = await fetchQueryResultPromise(queryConfig);

        return result;
    } catch (error) {
        throw error;
    }
}