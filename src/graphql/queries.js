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
