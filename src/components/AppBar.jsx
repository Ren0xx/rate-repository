import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        marginTop: Constants.statusBarHeight,
        padding: 8,
        backgroundColor: theme.colors.background,
        alignSelf: "stretch",
        // ...
    },
    // ...
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <AppBarTab />
        </View>
    );
};

export default AppBar;
