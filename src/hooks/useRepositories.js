import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
const useRepositories = (variables) => {
    const { data, loading, fetchMore, error, ...result } = useQuery(
        GET_REPOSITORIES,
        {
            variables,
        }
    );

    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        error,
        ...result,
    };
};
export default useRepositories;
