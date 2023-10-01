import { FlatList, View, StyleSheet, Image, Pressable } from "react-native";
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

const repositories = [
    {
        id: "jaredpalmer.formik",
        fullName: "jaredpalmer/formik",
        description: "Build forms in React, without the tears",
        language: "TypeScript",
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
    },
    {
        id: "rails.rails",
        fullName: "rails/rails",
        description: "Ruby on Rails",
        language: "Ruby",
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
    },
    {
        id: "django.django",
        fullName: "django/django",
        description: "The Web framework for perfectionists with deadlines.",
        language: "Python",
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
    },
    {
        id: "reduxjs.redux",
        fullName: "reduxjs/redux",
        description: "Predictable state container for JavaScript apps",
        language: "TypeScript",
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
    },
];

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
        <Text fontWeight='bold' fontSize='subheading'>
            {fullName}
        </Text>
        <Text color='textSecondary'>{description}</Text>
        <Pressable style={styles.languageBtn}>
            <Text style={{ color: "#fff" }}>{language}</Text>
        </Pressable>
        <View style={styles.bottomBar}>
            <View style={styles.statsItem}>
                <Text fontWeight='bold'>{formatCount(stars)}</Text>
                <Text>Stars </Text>
            </View>
            <View style={styles.statsItem}>
                <Text fontWeight='bold'>{formatCount(forks)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.statsItem}>
                <Text fontWeight='bold'>{formatCount(reviews)}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.statsItem}>
                <Text fontWeight='bold'>{formatCount(rating)}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    </View>
);

const RepositoryList = () => {
    return (
        <FlatList
            data={repositories}
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
const formatCount = (count) => {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + "k";
    } else {
        return count.toString();
    }
};

export default RepositoryList;
