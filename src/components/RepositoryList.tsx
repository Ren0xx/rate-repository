import { FlatList, View, StyleSheet, Image, Pressable } from "react-native";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import OrderSelection from "./OrderSelection";
import SearchBar from "./SearchBar";
import theme from "../theme";
import { useState } from "react";
import { useNavigate } from "react-router-native";
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
const ItemSeparator = () => <View style={styles.separator}> </View>;

export const Item = ({
    id,
    fullName,
    description,
    language,
    stars,
    forks,
    reviews,
    rating,
    ownerAvatarUrl,
}) => {
    const formatCount = (count: number) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + "k";
        } else {
            return count.toString();
        }
    };

    const navigate = useNavigate();
    const redirect = () => {
        navigate(id);
    };
    return (
        <View style={{ backgroundColor: "#fff" }} testID='repositoryItem'>
            <Pressable onPress={redirect}>
                <Image
                    style={styles.smallLogo}
                    source={{ uri: ownerAvatarUrl }}
                />
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
            </Pressable>
        </View>
    );
};

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState<"CREATED_AT" | "RATING_AVERAGE">(
        "CREATED_AT"
    );
    const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("ASC");
    const [searchInput, setSearchInput] = useState<string>("");
    const handleSearchInputChange = (query: string) => {
        setSearchInput(query);
    };
    const setOrderingByLatest = () => {
        setOrderBy("CREATED_AT");
        setOrderDirection("DESC");
    };
    const setOrderingByHighestRating = () => {
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("DESC");
    };
    const setOrderingByLowestRating = () => {
        setOrderBy("RATING_AVERAGE");
        setOrderDirection("ASC");
    };
    const onEndReach = () => {
        console.log("You have reached the end of the list");
    };
    const { repositories, fetchMore, loading, error, ...result } =
        useRepositories({
            orderBy,
            orderDirection,
            searchKeyword: searchInput,
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
    return (
        <>
            <SearchBar
                searchInput={searchInput}
                handleSearchInputChange={handleSearchInputChange}
            />
            <OrderSelection
                setOrderingByLatest={setOrderingByLatest}
                setOrderingByHighestRating={setOrderingByHighestRating}
                setOrderingByLowestRating={setOrderingByLowestRating}
            />
            <RepositoryListContainer
                repositories={repositories}
                onEndReach={onEndReach}
            />
        </>
    );
};
export const RepositoryListContainer = ({ repositories, onEndReach }) => {
    const repositoriesData = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoriesData}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
                <Item
                    id={item.id}
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
export const formatCount = (count: number) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "k";
    } else {
        return count.toString();
    }
};

export default RepositoryList;
