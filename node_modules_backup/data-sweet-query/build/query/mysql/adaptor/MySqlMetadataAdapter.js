"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("../../type/Types");
function adaptMySqlMetadata(rawMetadata) {
    var rawDatabaseMetadataList = rawMetadata.databaseMetadataList || [];
    return {
        type: Types_1.QueryType.MYSQL,
        databaseMetadataList: rawDatabaseMetadataList.map(adaptMySqlDatabaseMetadata)
    };
}
exports.adaptMySqlMetadata = adaptMySqlMetadata;
function adaptMySqlDatabaseMetadata(rawDatabaseMetadata) {
    var rawTableMetadataList = rawDatabaseMetadata.tableMetadataList || [];
    return {
        name: rawDatabaseMetadata.name,
        tableMetadataList: rawTableMetadataList.map(adaptMySqlTableMetadata)
    };
}
function adaptMySqlTableMetadata(rawTableMetadata) {
    var rawColumnMetadataList = rawTableMetadata.columnMetadataList || [];
    return {
        name: rawTableMetadata.name,
        columnMetadataList: rawColumnMetadataList.map(adaptMySqlColumnMetadata)
    };
}
function adaptMySqlColumnMetadata(rawColumnMetadata) {
    return {
        name: rawColumnMetadata.name,
        type: rawColumnMetadata.type
    };
}
