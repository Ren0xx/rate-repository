import { Platform } from "react-native";

const font = () => {
    if (Platform.OS === "android") return "Roboto";
    if (Platform.OS === "ios") return "Arial";
    return "System";
};
const theme = {
    colors: {
        textPrimary: "#24292e",
        textSecondary: "#586069",
        primary: "#0366d6",
        background: "#010101ad",
        mainBackground: "#e1e4e8",
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: font(),
    },
    fontWeights: {
        normal: 400,
        bold: 700,
    },
};

export default theme;
