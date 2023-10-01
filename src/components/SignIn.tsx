import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";

const initialValues = {
    username: "",
    password: "",
};
const onSubmit = (values) => {
    console.log(values);
};
const SignIn = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
