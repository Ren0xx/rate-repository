import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [mutate] = useMutation(CREATE_REVIEW);

    const createReview = async ({
        ownerName,
        repositoryName,
        rating,
        review,
    }) => {
        const r = parseInt(rating);
        const d = await mutate({
            variables: { ownerName, repositoryName, rating: r, review },
        });
        return d;
    };

    return [createReview];
};

export default useCreateReview;
