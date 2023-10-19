import { Item } from "./RepositoryList";
import { format, parseISO } from "date-fns";
import { FlatList, View, Button, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";
import { useParams } from "react-router-native";
import Text from "./Text";
const style = StyleSheet.create({
    container: {
        width: 400,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
    },
    rating: {
        textAlign: "center",
        width: 40,
        height: 40,
        padding: 4,
        borderWidth: 4,
        borderColor: "#2266a5",
        borderRadius: 20,
    },
});
const RepositoryInfo = ({ repository }) => {
    return (
        <View>
            <Item
                id={repository.id}
                fullName={repository.fullName}
                description={repository.description}
                language={repository.language}
                stars={repository.stargazersCount}
                forks={repository.forksCount}
                reviews={repository.reviewCount}
                rating={repository.ratingAverage}
                ownerAvatarUrl={repository.ownerAvatarUrl}
            />
            <Button
                title='Github'
                onPress={() => Linking.openURL(repository.url)}
            />
        </View>
    );
};
const ReviewItem = ({ review }) => {
    return (
        <View style={style.itemContainer}>
            <View style={style.rating}>
                <Text style={{ textAlign: "center", color: "#2266a5" }}>
                    {review.rating}
                </Text>
            </View>
            <View>
                <Text fontWeight='bold'>{review.user.username}</Text>
                <Text fontColor='textSecondary'>
                    {format(parseISO(review.createdAt), "dd-MM-yyyy")}
                </Text>
                <Text style={{ display: "flex", flexWrap: "wrap" }}>
                    {review.text}
                </Text>
            </View>
        </View>
    );
};
const SingleRepository = () => {
    const { repositoryId } = useParams();
    const { loading, error, data } = useQuery(GET_REPOSITORY, {
        fetchPolicy: "cache-and-network",
        variables: {
            repositoryId: repositoryId,
        },
    });
    if (loading) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    if (error) {
        return (
            <View>
                <Text>Error occurred</Text>
            </View>
        );
    }
    return (
        <FlatList
            data={data.repository.reviews.edges}
            style={style.container}
            renderItem={({ item }) => <ReviewItem review={item.node} />}
            ListHeaderComponent={() => (
                <RepositoryInfo repository={data.repository} />
            )}
        />
    );
};

export default SingleRepository;
