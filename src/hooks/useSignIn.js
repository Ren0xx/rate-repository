import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

//import { useContext } from "react";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();

    const [mutate] = useMutation(AUTHENTICATE, {
        awaitRefetchQueries: true,
    });

    const signIn = async ({ username, password }) => {
        const d = await mutate({ variables: { username, password } });
        await authStorage.setAccessToken(d.data.authenticate.accessToken);
        apolloClient.resetStore();
        return d;
    };

    return [signIn];
};

export default useSignIn;
