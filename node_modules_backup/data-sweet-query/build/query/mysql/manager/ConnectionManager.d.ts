import { MySqlQueryConfig, MySqlQueryConfigMap, MySqlQueryResult } from "../type/Types";
export declare function fetchQueryResultPromise(mySqlQueryConfig: MySqlQueryConfig): Promise<MySqlQueryResult>;
export declare function fetchQueryResultMapPromise(mySqlQueryConfigMap: MySqlQueryConfigMap): Promise<{
    [key: string]: MySqlQueryResult;
}>;
