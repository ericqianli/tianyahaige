import { QueryType } from "data-sweet-query";

export const INITIAL_CONTENT_STATE = {
    content: { type: QueryType.MYSQL },
};

export const ROOT_FONT_SIZE = 16;

export const CONTENT_HEIGHT_IN_REM = 44;
export const COLUMN_WIDTH_IN_REM = 2.375;
export const COLUMNS_PER_BACKGROUD = 48;
export const BACKGROUND_WIDTH_IN_REM =
    COLUMN_WIDTH_IN_REM * COLUMNS_PER_BACKGROUD;
export const BACKGROUND_HEIGHT_IN_REM = 48;

// export const COLUMN_WIDTH_IN_PIXEL = Math.floor(
//     ROOT_FONT_SIZE * COLUMN_WIDTH_IN_REM
// );
// console.log("COLUMN_WIDTH_IN_PIXEL", COLUMN_WIDTH_IN_PIXEL);

// export const BACKGROUND_WIDTH_IN_PIXEL =
//     COLUMN_WIDTH_IN_PIXEL * COLUMNS_PER_BACKGROUD;
// export const BACKGROUND_WIDTH_IN_PIXEL =
//     ROOT_FONT_SIZE * BACKGROUND_WIDTH_IN_REM;
// console.log(BACKGROUND_WIDTH_IN_PIXEL);

export const CONTENT_HEIGHT = CONTENT_HEIGHT_IN_REM + "rem";
export const COLUMN_WIDTH = COLUMN_WIDTH_IN_REM + "rem";
export const HALF_COLUMN_WIDTH = COLUMN_WIDTH_IN_REM / 2 + "rem";
// export const BACKGROUND_SIZE = `${BACKGROUND_WIDTH_IN_PIXEL}px auto`;

export const BACKGROUND_SIZE = `${BACKGROUND_WIDTH_IN_REM}rem auto`;
export const BACKGROUND_SIDE_SIZE = `auto ${BACKGROUND_HEIGHT_IN_REM}rem`;

console.log(BACKGROUND_SIZE);
