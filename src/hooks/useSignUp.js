import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
const useSignUp = () => {
    const [mutate] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        const d = await mutate({ variables: { username, password } });
        return d;
    };

    return [signUp];
};

export default useSignUp;
