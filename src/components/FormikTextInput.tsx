import { StyleSheet } from "react-native";
import { useField } from "formik";
import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    errorText: {
        marginTop: 5,
        color: "#d73a4a",
    },
    textInput: {
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1,
    },
});
type InputProps = {
    name: string;
    onSubmit: () => void;
};
const FormikTextInput = ({ name, onSubmit }: InputProps) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                style={styles.textInput}
                onChangeText={(value: string) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                placeholder={name}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={name === "password" ? true : false}
                error={showError}
            />
            {showError && (
                <Text
                    style={styles.errorText}
                    color={undefined}
                    fontSize={undefined}
                    fontWeight={undefined}>
                    {meta.error}
                </Text>
            )}
        </>
    );
};

export default FormikTextInput;
