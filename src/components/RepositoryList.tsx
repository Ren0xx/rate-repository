import { FlatList, View, StyleSheet, Image, Pressable } from "react-native";
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    smallLogo: {
        width: 50,
        height: 50,
    },
    bottomBar: {
        display: "flex",
        flexDirection: "row",
        gap: 4,
    },
    languageBtn: {
        width: 100,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        elevation: 3,
    },
    statsItem: {
        display: "flex",
        margin: 6,
        gap: 8,
    },
});
const ItemSeparator = () => <View style={styles.separator} />;

const Item = ({
    fullName,
    description,
    language,
    stars,
    forks,
    reviews,
    rating,
    ownerAvatarUrl,
}) => (
    <View style={{ backgroundColor: "#fff" }}>
        <Image style={styles.smallLogo} source={{ uri: ownerAvatarUrl }} />
        <Text
            fontWeight='bold'
            fontSize='subheading'
            color={undefined}
            style={undefined}>
            {fullName}
        </Text>
        <Text
            color='textSecondary'
            fontSize={undefined}
            fontWeight={undefined}
            style={undefined}>
            {description}
        </Text>
        <Pressable style={styles.languageBtn}>
            <Text
                style={{ color: "#fff" }}
                color={undefined}
                fontSize={undefined}
                fontWeight={undefined}>
                {language}
            </Text>
        </Pressable>
        <View style={styles.bottomBar}>
            <View style={styles.statsItem}>
                <Text
                    fontWeight='bold'
                    color={undefined}
                    fontSize={undefined}
                    style={undefined}>
                    {formatCount(stars)}
                </Text>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Stars{" "}
                </Text>
            </View>
            <View style={styles.statsItem}>
                <Text
                    fontWeight='bold'
                    color={undefined}
                    fontSize={undefined}
                    style={undefined}>
                    {formatCount(forks)}
                </Text>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Forks
                </Text>
            </View>
            <View style={styles.statsItem}>
                <Text
                    fontWeight='bold'
                    color={undefined}
                    fontSize={undefined}
                    style={undefined}>
                    {formatCount(reviews)}
                </Text>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Reviews
                </Text>
            </View>
            <View style={styles.statsItem}>
                <Text
                    fontWeight='bold'
                    color={undefined}
                    fontSize={undefined}
                    style={undefined}>
                    {formatCount(rating)}
                </Text>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Rating
                </Text>
            </View>
        </View>
    </View>
);

const RepositoryList = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network",
    });

    if (loading) {
        return (
            <View>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Is loading
                </Text>
            </View>
        );
    }
    if (error) {
        return (
            <View>
                <Text
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    Error
                </Text>
            </View>
        );
    }
    const repositoryNodes =
        data ? data.repositories.edges.map((edge) => edge.node) : [];
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <Item
                    fullName={item.fullName}
                    description={item.description}
                    language={item.language}
                    stars={item.stargazersCount}
                    forks={item.forksCount}
                    reviews={item.reviewCount}
                    rating={item.ratingAverage}
                    ownerAvatarUrl={item.ownerAvatarUrl}
                />
            )}
        />
    );
};
const formatCount = (count: number) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "k";
    } else {
        return count.toString();
    }
};

export default RepositoryList;
