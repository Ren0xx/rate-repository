import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Formik } from "formik";
import validationSchema from "../schemas/reviewFormSchema";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";
const ReviewForm = () => {
    const initialValues = {
        ownerName: "",
        repositoryName: "",
        rating: 0,
        review: "",
    };
    const [createReview] = useCreateReview();
    const navigate = useNavigate();
    const onSubmit = async (values) => {
        //const { ownerName, repositoryName, rating, review} = values;
        try {
            const data = await createReview(values);
            const repositoryId = data.data.createReview.repositoryId;
            if (data) navigate(repositoryId);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <ReviewFormContainer
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        />
    );
};
export const ReviewFormContainer = ({
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
                    <FormikTextInput name='ownerName' />
                    <FormikTextInput name='repositoryName' />
                    <FormikTextInput name='rating' />
                    <FormikTextInput name='review' isMultiline={true} />
                    <Button title='Submit' onPress={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

export default ReviewForm;
