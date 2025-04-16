import { QueryType } from "../../type/Types";
import { MySqlMetadata, MySqlMetadataConfig } from "../type/Types";

export const GRAPHQL_METADATA_QUERY = `
{
    metadata {
        type
        databaseMetadataList {
            name
            tableMetadataList {
                name
                columnMetadataList {
                    name
                    type
                }
            }
        }
    }
}
`;

export const INITIAL_MYSQL_METADATA: MySqlMetadata = {
    type: QueryType.MYSQL,
    databaseMetadataList: []
};
