import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query Repositories(
        $orderDirection: OrderDirection
        $orderBy: AllRepositoriesOrderBy
        $searchKeyword: String
        $after: String
        $first: Int
    ) {
        repositories(
            orderBy: $orderBy
            orderDirection: $orderDirection
            searchKeyword: $searchKeyword
            after: $after
            first: $first
        ) {
            totalCount
            edges {
                node {
                    ownerAvatarUrl
                    ratingAverage
                    reviewCount
                    forksCount
                    stargazersCount
                    language
                    description
                    fullName
                    id
                }
                cursor
            }
            pageInfo {
                endCursor
                startCursor
                hasNextPage
            }
        }
    }
`;
export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        # review fields...
                        id
                        text
                        rating
                        createdAt
                        repositoryId
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;
export const GET_REPOSITORY = gql`
    query Repository($repositoryId: ID!) {
        repository(id: $repositoryId) {
            id
            fullName
            url
            language
            stargazersCount
            ratingAverage
            ownerAvatarUrl
            forksCount
            description
            reviewCount
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;
