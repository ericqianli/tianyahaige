import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    palette: {},
    typography: {
        // fontFamily: [
        //     "Roboto",
        //     "-apple-system",
        //     "BlinkMacSystemFont",
        //     '"Segoe UI"',
        //     "Oxygen",
        //     "Ubuntu",
        //     "Cantarell",
        //     "Fira Sans",
        //     "Droid Sans",
        //     '"Helvetica Neue"',
        //     "Arial",
        //     "sans-serif",
        //     '"Apple Color Emoji"',
        //     '"Segoe UI Emoji"',
        //     '"Segoe UI Symbol"',
        // ].join(","),

        fontFamily: [
            "Zi Yue Song Ke Ben",
            "Adobe Kaiti Std",
            "KaiTi_GB2312",
            "KaiTi",
            "STKaiti",
            "SimSun",
            "STFangsong",
            "STSong",
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
            fontFamily: `"Zi Yue Song Ke Ben", "Adobe Kaiti Std", "KaiTi_GB2312", "KaiTi", "STKaiti", "SimSun", "STFangsong", "STSong"`,
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
            fontFamily: `"Zi Yue Song Ke Ben", "Adobe Kaiti Std", "KaiTi_GB2312", "KaiTi", "STKaiti", "SimSun", "STFangsong", "STSong"`,
        },
        subtitle1: {
            fontSize: "1rem",
            color: "#444444",
        },
        subtitle2: {
            fontSize: "2rem",
            lineHeight: "1ex",
            fontFamily: "'Libre Barcode 39 Extended'",
        },
    },
});

export default theme;
