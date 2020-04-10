import {
    fetchQueryResultPromise, MySqlQueryConfig, MySqlQueryResult
} from "data-sweet-query";

export async function fetchNativeQueryResultPromise(
    queryConfig: MySqlQueryConfig
): Promise<string> {
    try {
        const result = await fetchQueryResultPromise(queryConfig);
        console.log(result);
        const content = getContent(result);
        console.log(content);
        return content;
    } catch (error) {
        throw error;
    }
}

// TODO: Move to reducer once switched to redux
function getContent(result: MySqlQueryResult) {
    const content = result.rows
        ?.map((row) => "  " + row.title + "\n" + row.content)
        .join("\n");
    return content || "";
}
