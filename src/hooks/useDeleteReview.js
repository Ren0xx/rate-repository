import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = (refetch) => {
    const [mutate] = useMutation(DELETE_REVIEW);

    const deleteReview = async ( reviewId ) => {
        const c = await mutate({
            variables: { deleteReviewId: reviewId },
        });
        refetch();
        return;
    };

    return [deleteReview];
};

export default useDeleteReview;
