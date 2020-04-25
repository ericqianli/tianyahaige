import { QueryType } from "data-sweet-query";

import TitleImageOne from "../image/title_1.jpg";
import TitleImageTwo from "../image/title_2.jpg";
import TitleImageThree from "../image/title_3.jpg";
import TitleImageFour from "../image/title_4.jpg";
import { FALLEN_STAR, IMMORTALS, INDIA_TRAVEL, LANDING } from "./Routes";

export const INITIAL_CONTENT_STATE = {
    content: { type: QueryType.MYSQL },
};

export const CONTENT_HEIGHT_IN_REM = 44;
export const COLUMN_WIDTH_IN_REM = 2.375;
export const COLUMNS_PER_BACKGROUD = 48;
export const BACKGROUND_WIDTH_IN_REM =
    COLUMN_WIDTH_IN_REM * COLUMNS_PER_BACKGROUD;
export const BACKGROUND_HEIGHT_IN_REM = 48;

export const CONTENT_HEIGHT = CONTENT_HEIGHT_IN_REM + "rem";
export const COLUMN_WIDTH = COLUMN_WIDTH_IN_REM + "rem";
export const HALF_COLUMN_WIDTH = COLUMN_WIDTH_IN_REM / 2 + "rem";

export const BACKGROUND_SIZE_BY_WIDTH = `${BACKGROUND_WIDTH_IN_REM}rem ${BACKGROUND_HEIGHT_IN_REM}rem`;
// Fractional line height causes column width to shrink by 1px. Use absolute
// re-calculated width in pixel to offset.
export const BACKGROUND_ADJUSTED_SIZE_BY_WIDTH = `1344px ${BACKGROUND_HEIGHT_IN_REM}rem`;
export const BACKGROUND_SIZE_BY_HEIGHT = `auto ${BACKGROUND_HEIGHT_IN_REM}rem`;

export const ROUTE_INFO_MAP: {
    [key: string]: {
        sql: string;
        title: string;
        image: string;
    };
} = {
    [LANDING]: {
        sql: "select * from poem_by_date",
        title: "天涯海槎",
        image: TitleImageOne,
    },
    [FALLEN_STAR]: {
        sql: "select * from poem_by_date where fallen_star=true",
        title: "落星集",
        image: TitleImageTwo,
    },
    [INDIA_TRAVEL]: {
        sql: "select * from poem_by_date where india_travel=true",
        title: "天竺散記",
        image: TitleImageThree,
    },
    [IMMORTALS]: {
        sql: "select * from poem_by_date limit 30, 40",
        title: "列仙集",
        image: TitleImageFour,
    },
};
