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
};

export default DBUtil;
