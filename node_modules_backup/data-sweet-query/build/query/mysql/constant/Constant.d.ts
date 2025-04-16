import { MySqlMetadata } from "../type/Types";
export declare const GRAPHQL_METADATA_QUERY = "\n{\n    metadata {\n        type\n        databaseMetadataList {\n            name\n            tableMetadataList {\n                name\n                columnMetadataList {\n                    name\n                    type\n                }\n            }\n        }\n    }\n}\n";
export declare const INITIAL_MYSQL_METADATA: MySqlMetadata;
