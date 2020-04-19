import {
    fetchQueryResultPromise, MySqlQueryConfig, MySqlQueryResult, QueryType
} from "data-sweet-query";

import { DEFAULT_MYSQL_QUERY_SOURCE_CONFIG } from "../constant/QuerySources";

export async function fetchContentPromise(): Promise<MySqlQueryResult> {
    try {
        const queryConfig: MySqlQueryConfig = {
            type: QueryType.MYSQL,
            source: DEFAULT_MYSQL_QUERY_SOURCE_CONFIG,
            database: "poem",
            table: "poem",
            sql: "select * from poem_by_date limit 20",
        };
        const result = await fetchQueryResultPromise(queryConfig);
        console.log(result);

        return result;
    } catch (error) {
        throw error;
    }
}