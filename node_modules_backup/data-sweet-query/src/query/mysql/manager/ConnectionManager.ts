import axios from "axios";

import { QueryType } from "../../type/Types";
import {
    MySqlColumn,
    MySqlQueryConfig,
    MySqlQueryConfigMap,
    MySqlQueryResult
} from "../type/Types";

export async function fetchQueryResultPromise(
    mySqlQueryConfig: MySqlQueryConfig
): Promise<MySqlQueryResult> {
    const { source, database, sql } = mySqlQueryConfig;

    try {
        const response = await axios.post(source.url, {
            database,
            sql
        });
        const header: MySqlColumn[] = response.data.header;
        const rows: any[] = response.data.rows;

        const result = {
            type: QueryType.MYSQL,
            header,
            rows
        };

        return result;
    } catch (error) {
        throw error;
    }
}

export async function fetchQueryResultMapPromise(
    mySqlQueryConfigMap: MySqlQueryConfigMap
): Promise<{ [key: string]: MySqlQueryResult }> {
    const responseMap: { [key: string]: MySqlQueryResult } = {};

    try {
        for (const key in mySqlQueryConfigMap) {
            const mySqlQueryConfig = mySqlQueryConfigMap[key];
            responseMap[key] = await fetchQueryResultPromise(mySqlQueryConfig);
        }
    } catch (error) {
        throw error;
    }

    return responseMap;
}
