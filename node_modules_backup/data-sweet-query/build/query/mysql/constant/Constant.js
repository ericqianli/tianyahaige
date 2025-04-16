"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types_1 = require("../../type/Types");
exports.GRAPHQL_METADATA_QUERY = "\n{\n    metadata {\n        type\n        databaseMetadataList {\n            name\n            tableMetadataList {\n                name\n                columnMetadataList {\n                    name\n                    type\n                }\n            }\n        }\n    }\n}\n";
exports.INITIAL_MYSQL_METADATA = {
    type: Types_1.QueryType.MYSQL,
    databaseMetadataList: []
};
