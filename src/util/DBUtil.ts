import * as poemData from "../data/poem.json";
// import * as poemData from "../data/poem_debug.json";

import Immutable from "immutable";
import { Poem } from "../type/Types";

const DBUtil = {
    fetchAllPoems(): Promise<any> {
        const poems: any[] = (poemData as any).default;

        return new Promise((resolve) =>
            resolve(Immutable.List(poems).map((poem: any) => poem as Poem))
        );
    },

    fetchPoemsByCollection(collection: number): Promise<any> {
        const poems: any[] = (poemData as any).default;

        return new Promise((resolve) =>
            resolve(
                Immutable.List(poems)
                    .map((poem: any) => poem as Poem)
                    .filter((poem) => poem.collections.includes(collection))
            )
        );
    },
};

export default DBUtil;
