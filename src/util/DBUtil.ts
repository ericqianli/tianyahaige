import * as poemData from "../data/poem.json";
// import * as poemData from "../data/poem_debug2.json";

import Immutable from "immutable";
import { Poem } from "../type/Types";

const DBUtil = {
    fetchAllPoems(): Promise<any> {
        const poems: any[] = (poemData as any).default;

        return new Promise((resolve) =>
            resolve(Immutable.List(poems).map((poem: any) => poem as Poem))
        );
    },

    fetchPoemsByCollection(collection: number, sampled: boolean): Promise<any> {
        const poems: any[] = (poemData as any).default;

        // poems.sort(() => 0.5 - Math.random());

        return new Promise((resolve) => {
            const collectionPoems = Immutable.List(poems)
                .map((poem: any) => poem as Poem)
                .filter((poem) => poem.collections.includes(collection));
            // if (sampled) {
            //     resolve(collectionPoems
            //         .sort(() => 0.5 - Math.random())
            //         .slice(0, 18)
            //         .sort((p1, p2) => p1.date.localeCompare(p2.date)));
            // }
            resolve(collectionPoems);
            // resolve(
            //     Immutable.List(poems)
            //         .map((poem: any) => poem as Poem)
            //         .filter((poem) => poem.collections.includes(collection))
            //         .sort(() => 0.5 - Math.random())
            //         .slice(0, 18)
            //         .sort((p1, p2) => p1.date.localeCompare(p2.date))
            // );
        });
    },
};

export default DBUtil;
