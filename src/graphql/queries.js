import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
    query {
        repositories {
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
            }
        }
    }
`;
export const IS_LOGGED = gql`
    query {
        me {
            id
            username
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
