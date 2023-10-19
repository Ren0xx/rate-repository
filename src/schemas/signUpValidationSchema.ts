import * as yup from "yup";

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required()
        .min(5, "Username must have atleast 5 characters.")
        .max(30, "Username cannot be longer than 30 characters"),
    password: yup
        .string()
        .required()
        .min(5, "Password must have atleast 5 characters.")
        .max(50, "Password cannot be longer than 50 characters"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default validationSchema;
