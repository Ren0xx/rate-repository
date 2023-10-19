import * as yup from "yup";
// ...

const validationSchema = yup.object().shape({
    ownerName: yup.string().required().min(1),
    repositoryName: yup.string().required(),
    rating: yup.number().required().min(0).max(100),
    review: yup.string().optional()
});

export default validationSchema;
