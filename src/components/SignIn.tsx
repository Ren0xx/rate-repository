import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import validationSchema from "../schemas/signInValidationSchema";

const initialValues = {
    username: "",
    password: "",
};
const onSubmit = (values) => {
    console.log(values);
};
const SignIn = () => {
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
