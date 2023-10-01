import { View, StyleSheet, ScrollView } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: theme.colors.background,
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        columnGap: 8,
    },
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab name={"Home"} to={"/"} />
                <AppBarTab name={"SignIn"} to={"/sign-in"} />
            </ScrollView>
        </View>
    );
};

export default AppBar;
