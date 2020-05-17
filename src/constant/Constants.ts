import { QueryType } from "data-sweet-query";

import TitleImageOneDark from "../image/title1_2x_dark.png";
import TitleImageOneLight from "../image/title1_2x_light.png";
import TitleImageTwoDark from "../image/title2_2x_dark.png";
import TitleImageTwoLight from "../image/title2_2x_light.png";
import TitleImageThreeDark from "../image/title3_2x_dark.png";
import TitleImageThreeLight from "../image/title3_2x_light.png";
import TitleImageFourDark from "../image/title4_2x_dark.png";
import TitleImageFourLight from "../image/title4_2x_light.png";
import { FALLEN_STAR, IMMORTALS, INDIA_TRAVEL, LANDING } from "./Routes";

export const INITIAL_CONTENT_STATE = {
    content: { type: QueryType.MYSQL },
};

export const BODY_CHARACTERS_PER_LINE = 20;

export const SUBTITLE_CHARACTERS_PER_LINE = 40;
export const SUBTITLE_NO_WRAP_LIMIT = 4;

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
        key: string;
        sql: string;
        title: string;
        backgroundLight: string;
        backgroundDark: string;
    };
} = {
    [LANDING]: {
        key: "all",
        sql: "select * from poem_by_date",
        title: "天涯海槎",
        backgroundLight: TitleImageOneLight,
        backgroundDark: TitleImageOneDark,
    },
    [FALLEN_STAR]: {
        key: "fallen_star",
        sql: "select * from poem_by_date where fallen_star=true",
        title: "落星集",
        backgroundLight: TitleImageTwoLight,
        backgroundDark: TitleImageTwoDark,
    },
    [INDIA_TRAVEL]: {
        key: "india_travel",
        sql: "select * from poem_by_date where india_travel=true",
        title: "天竺散記",
        backgroundLight: TitleImageThreeLight,
        backgroundDark: TitleImageThreeDark,
    },
    [IMMORTALS]: {
        key: "immortals",
        sql: "select * from poem_by_date limit 30, 40",
        title: "列仙集",
        backgroundLight: TitleImageFourLight,
        backgroundDark: TitleImageFourDark,
    },
};
