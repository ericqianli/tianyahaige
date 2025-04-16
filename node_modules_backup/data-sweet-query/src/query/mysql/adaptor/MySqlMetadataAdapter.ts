import { QueryType } from "../../type/Types";
import {
    MySqlColumnMetadata,
    MySqlDatabaseMetadata,
    MySqlMetadata,
    MySqlTableMetadata
} from "../type/Types";

export function adaptMySqlMetadata(rawMetadata: any): MySqlMetadata {
    const rawDatabaseMetadataList: any[] =
        rawMetadata.databaseMetadataList || [];
    return {
        type: QueryType.MYSQL,
        databaseMetadataList: rawDatabaseMetadataList.map(
            adaptMySqlDatabaseMetadata
        )
    };
}

function adaptMySqlDatabaseMetadata(
    rawDatabaseMetadata: any
): MySqlDatabaseMetadata {
    const rawTableMetadataList: any[] =
        rawDatabaseMetadata.tableMetadataList || [];
    return {
        name: rawDatabaseMetadata.name,
        tableMetadataList: rawTableMetadataList.map(adaptMySqlTableMetadata)
    };
}

function adaptMySqlTableMetadata(rawTableMetadata: any): MySqlTableMetadata {
    const rawColumnMetadataList: any[] =
        rawTableMetadata.columnMetadataList || [];
    return {
        name: rawTableMetadata.name,
        columnMetadataList: rawColumnMetadataList.map(adaptMySqlColumnMetadata)
    };
}

function adaptMySqlColumnMetadata(rawColumnMetadata: any): MySqlColumnMetadata {
    return {
        name: rawColumnMetadata.name,
        type: rawColumnMetadata.type
    };
}
