import { PaletteType } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

export const getTheme = (paletteType: PaletteType) =>
    createMuiTheme({
        props: {
            MuiButtonBase: {
                disableRipple: true,
            },
        },
        palette: {
            type: paletteType,
            background: {
                default: paletteType === "light" ? "#e8e8e8" : "#303030",
            },
            text: {
                primary: paletteType === "light" ? "#000000" : "#ffffff",
            },
        },
        typography: {
            fontFamily: [
                "Zi Yue Song Ke Ben",
                "Adobe Kaiti Std",
                "KaiTi_GB2312",
                "KaiTi",
                "STKaiti",
                "SimSun",
                "STFangsong",
                "STSong",
                "Arial Unicode MS",
            ].join(","),

            h1: {
                fontWeight: 700,
            },
            h2: {
                fontWeight: 700,
            },
            h3: {
                fontSize: "2rem",
                lineHeight: 1,
                writingMode: "vertical-rl",
            },
            h4: {
                fontWeight: 500,
            },
            h5: {
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.6,
            },
            h6: {
                fontSize: "1rem",
                fontWeight: 500,
                lineHeight: 1.6,
            },
            body1: {
                fontSize: "2rem",
                lineHeight: 2,
                writingMode: "vertical-rl",
            },
            body2: {
                fontSize: "1.5rem",
            },
            subtitle1: {
                fontSize: "0.75rem",
                lineHeight: "1.5rem",
                fontFamily: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "'Segoe UI'",
                    "Roboto",
                    "Oxygen",
                    "Ubuntu",
                    "Cantarell",
                    "'Fira Sans'",
                    "'Droid Sans'",
                    "'Helvetica Neue'",
                    "sans-serif",
                ].join(","),
                opacity: 0.75,
            },
            subtitle2: {
                fontSize: "2rem",
                lineHeight: "1ex",
                fontFamily: "'Libre Barcode 39 Extended'",
            },
        },
    });

// export const theme = getTheme("dark");

// export const theme = getTheme("light");

// export default theme;
