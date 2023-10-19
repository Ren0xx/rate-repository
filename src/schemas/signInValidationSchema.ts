import * as yup from "yup";

const validationSchema = yup.object().shape({
    username: yup.string().required().min(1),
    password: yup.string().required().min(1),
});

export default validationSchema;
