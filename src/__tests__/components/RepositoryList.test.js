import { render, fireEvent, screen } from "@testing-library/react-native";
import {
    RepositoryListContainer,
    formatCount,
} from "../../components/RepositoryList";

describe("RepositoryList", () => {
    describe("RepositoryListContainer", () => {
        it("renders repository information correctly", () => {
            const r = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                    startCursor:
                        "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                },
                edges: [
                    {
                        node: {
                            id: "jaredpalmer.formik",
                            fullName: "jaredpalmer/formik",
                            description:
                                "Build forms in React, without the tears",
                            language: "TypeScript",
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                "https://avatars2.githubusercontent.com/u/4060187?v=4",
                        },
                        cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
                    },
                    {
                        node: {
                            id: "async-library.react-async",
                            fullName: "async-library/react-async",
                            description:
                                "Flexible promise-based React data loader",
                            language: "JavaScript",
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                "https://avatars1.githubusercontent.com/u/54310907?v=4",
                        },
                        cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
                    },
                ],
            };

            render(
                <RepositoryListContainer
                    repositories={r}
                    loading={false}
                    error={false}
                />
            );
            const repositoryItems = screen.getAllByTestId("repositoryItem");
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

            const n1 = r.edges[0].node;
            const n2 = r.edges[1].node;
            //First item
            expect(firstRepositoryItem).toHaveTextContent(n1.fullName);
            expect(firstRepositoryItem).toHaveTextContent(n1.description);
            expect(firstRepositoryItem).toHaveTextContent(n1.language);
            expect(firstRepositoryItem).toHaveTextContent(
                formatCount(n1.forksCount)
            );
            expect(firstRepositoryItem).toHaveTextContent(
                formatCount(n1.ratingAverage)
            );
            expect(firstRepositoryItem).toHaveTextContent(
                formatCount(n1.reviewCount)
            );
            expect(firstRepositoryItem).toHaveTextContent(
                formatCount(n1.stargazersCount)
            );
            //Second item
            expect(secondRepositoryItem).toHaveTextContent(n2.fullName);
            expect(secondRepositoryItem).toHaveTextContent(n2.description);
            expect(secondRepositoryItem).toHaveTextContent(n2.language);
            expect(secondRepositoryItem).toHaveTextContent(
                formatCount(n2.forksCount)
            );
            expect(secondRepositoryItem).toHaveTextContent(
                formatCount(n2.ratingAverage)
            );
            expect(secondRepositoryItem).toHaveTextContent(
                formatCount(n2.reviewCount)
            );
            expect(secondRepositoryItem).toHaveTextContent(
                formatCount(n2.stargazersCount)
            );
        });
    });
});
