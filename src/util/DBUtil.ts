import * as poemData from "../data/poem.json";

import Immutable from "immutable";
import { Poem } from "../type/Types";

const DBUtil = {
    fetchAllPoems(): Promise<any> {
        const poems: any[] = (poemData as any).default;

        return new Promise((resolve) =>
            resolve(Immutable.List(poems).map((poem: any) => poem as Poem))
        );
    },

    // Implements Durstenfeld shuffle, an optimized version of Fisher-Yates.
    shuffle(array: any[]) {
        for (var i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },

    fetchPoemsByCollection(collection: number, sampled: boolean): Promise<any> {
        const poems: any[] = (poemData as any).default;
        const collectionPoems = poems.filter((poem) =>
            poem.collections.includes(collection)
        );
        return new Promise((resolve) => {
            if (sampled) {
                this.shuffle(collectionPoems);
                const selectedPoems = collectionPoems
                    .slice(0, 18)
                    .sort((p1, p2) => p1.id - p2.id);
                resolve(
                    Immutable.List(selectedPoems).map(
                        (poem: any) => poem as Poem
                    )
                );
            } else {
                resolve(
                    Immutable.List(collectionPoems).map(
                        (poem: any) => poem as Poem
                    )
                );
            }
        });
    },
};

export default DBUtil;
