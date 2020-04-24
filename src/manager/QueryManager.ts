import {
    FALLEN_STAR, IMMORTALS, INDIA_TRAVEL, LANDING
} from "../constant/Routes";

export function getSqlFromRouterPath(path: string) {
    switch (path) {
        case LANDING:
        default:
            return "select * from poem_by_date limit 0, 10";
        case FALLEN_STAR:
            return "select * from poem_by_date limit 10, 20";
        case INDIA_TRAVEL:
            return "select * from poem_by_date limit 20, 30";
        case IMMORTALS:
            return "select * from poem_by_date limit 30, 40";
    }
}
