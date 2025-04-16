import axios from "axios";

import { adaptMySqlMetadata } from "../adaptor/MySqlMetadataAdapter";
import { GRAPHQL_METADATA_QUERY } from "../constant/Constant";
import {
    MySqlMetadata,
    MySqlMetadataConfig,
    QuerySourceConfig
} from "../type/Types";

export async function fetchMetadataPromise(
    mySqlMetadataConfig: MySqlMetadataConfig
): Promise<MySqlMetadata> {
    const { source } = mySqlMetadataConfig;

    try {
        const response = await axios.post(source.url, {
            query: GRAPHQL_METADATA_QUERY
        });
        const mySqlMetadata = adaptMySqlMetadata(response.data.data.metadata);
        return mySqlMetadata;
    } catch (error) {
        throw error;
    }
}