import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import theme from "../theme";
import AppBarTab from "./AppBarTab";
import { useQuery } from "@apollo/client";
import { IS_LOGGED } from "../graphql/queries";
import Text from "./Text";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: theme.colors.background,
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        columnGap: 8,
        gap: 10,
    },
});

const AppBar = () => {
    const { data, error, loading } = useQuery(IS_LOGGED, {
        fetchPolicy: "cache-and-network",
    });
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                style={{ display: "flex", flexDirection: "row" }}>
                <AppBarTab name={"Repositories"} to={"/"} />
                {!loading && <SignInOrSignOut data={data} />}
            </ScrollView>
        </View>
    );
};
const SignInOrSignOut = ({ data }) => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };
    if (data.me !== null) {
        return (
            <Pressable onPress={signOut}>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Sign Out
                </Text>
            </Pressable>
        );
    }
    return <AppBarTab name={"SignIn"} to={"/sign-in"} />;
};
export default AppBar;
