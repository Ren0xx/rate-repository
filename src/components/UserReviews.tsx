import { FlatList, View } from "react-native";
import { ReviewItem } from "./RepositoryView";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Text from "./Text";
const UserReviews = () => {
    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        fetchPolicy: "cache-and-network",
        variables: {
            includeReviews: true,
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
    const Header = () => {
        return (
            <View>
                <Text fontWeight='bold'>My reviews</Text>
            </View>
        );
    };
    console.log(data.me.reviews.edges);
    return (
        <FlatList
            data={data.me.reviews.edges}
            style={{ width: 400 }}
            renderItem={({ item }) => <ReviewItem review={item.node} />}
            ListHeaderComponent={Header}
        />
    );
};

export default UserReviews;
