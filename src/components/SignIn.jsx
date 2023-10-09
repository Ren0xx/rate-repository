import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import validationSchema from "../schemas/signInValidationSchema";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
const initialValues = {
    username: "",
    password: "",
};

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const data = await signIn({ username, password });
            if (data) navigate("/");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {({ handleSubmit }) => (
                <View>
                    <FormikTextInput name='username' onSubmit={handleSubmit} />
                    <FormikTextInput name='password' onSubmit={handleSubmit} />
                    <Button title='Submit' onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

export default SignIn;
