import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import validationSchema from "../schemas/signUpValidationSchema";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
const SignUp = () => {
    const initialValues = {
        username: "",
        password: "",
        passwordConfirm: "",
    };
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const signUpData = await signUp({ username, password });
            if (signUpData) {
                const signInData = await signIn({ username, password });
                if (signInData) navigate("/");
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SignInContainer
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    );
};
export const SignInContainer = ({
    initialValues,
    onSubmit,
    validationSchema,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {({ handleSubmit }) => (
                <View>
                    <FormikTextInput name='username' />
                    <FormikTextInput name='password' isPassword={true} />
                    <FormikTextInput name='passwordConfirm' isPassword={true} />
                    <Button title='Submit' onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

export default SignUp;
