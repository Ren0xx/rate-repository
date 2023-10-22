import { FlatList, View, StyleSheet } from "react-native";
import { ReviewItem } from "./RepositoryView";
import { useState } from "react";
import { GET_CURRENT_USER } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";
const UserReviews = () => {
    const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
        //fetchPolicy: "cache-and-network",
        variables: {
            includeReviews: true,
        },
    });
    const navigate = useNavigate();

    const Header = () => {
        return (
            <View>
                <Text fontWeight='bold'>My reviews</Text>
            </View>
        );
    };
    const style = StyleSheet.create({
        buttonsContainer: {
            display: "flex",
            flexDirection: "row",
            gap: 12,
            margin: 8,
        },
    });
    const [deleteModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deleteReview] = useDeleteReview(refetch({ includeReviews: true }));
    const Item = ({ node }) => {
        return (
            <View>
                <ReviewItem review={node} />
                <View style={style.buttonsContainer}>
                    <Button
                        onPress={() => navigate(`/${node.repositoryId}`)}
                        buttonColor='#0366d6'
                        mode='contained'>
                        Open repository
                    </Button>
                    <Button
                        buttonColor='#bd2424'
                        mode='contained'
                        onPress={() => {
                            setIsModalOpen(true);
                        }}>
                        Delete Review
                    </Button>
                </View>
                <DeleteReviewModal
                    isOpen={deleteModalOpen}
                    setIsOpen={setIsModalOpen}
                    deleteReview={deleteReview}
                    repositoryId={node.id}
                />
            </View>
        );
    };
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
            data={data.me.reviews.edges}
            style={{ width: 400 }}
            renderItem={({ item }) => <Item node={item.node} />}
            ListHeaderComponent={Header}
        />
    );
};

const DeleteReviewModal = ({
    isOpen,
    setIsOpen,
    deleteReview,
    repositoryId,
}) => {
    return (
        <PaperProvider>
            <Portal>
                <Modal
                    visible={isOpen}
                    onDismiss={() => {
                        setIsOpen(false);
                    }}>
                    <Button
                        onPress={() => {
                            deleteReview(repositoryId);
                        }}>
                        Delete Review
                    </Button>
                </Modal>
            </Portal>
        </PaperProvider>
    );
};
export default UserReviews;
