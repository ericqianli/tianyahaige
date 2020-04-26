import { createSelector } from "reselect";

import { PaletteType } from "@material-ui/core";

import { getTheme } from "../theme/muiTheme";

export const getThemePaletteType = (state: { themePaletteType: PaletteType }) =>
    state.themePaletteType;

// NOTE: We need this so that in App we do NOT need to re-calculate theme, which
// causes double render with css animation.
export const getThemeReselect = createSelector([getThemePaletteType], getTheme);
