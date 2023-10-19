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
    isMultiline?: boolean;
    isPassword?: boolean;
};
const FormikTextInput = ({ name, isMultiline, isPassword }: InputProps) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                style={styles.textInput}
                onChangeText={(value: string) => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                multiline={isMultiline || false}
                placeholder={name}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={isPassword}
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
