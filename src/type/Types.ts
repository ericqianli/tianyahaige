export enum QueryType {
    MYSQL = "MYSQL"
}

export interface MySqlQuerySourceConfig {
    type: QueryType.MYSQL;
    id: string;
    name: string;
    url: string;
    username?: string;
    password?: string;
}

export interface MySqlQueryConfig {
    type: QueryType.MYSQL;
    source: MySqlQuerySourceConfig;
    database: string;
    table: string;
    sql: string;
}