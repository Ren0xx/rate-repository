/* eslint-disable jest/expect-expect */
import {
    render,
    screen,
    fireEvent,
    waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
import validationSchema from "../../schemas/signInValidationSchema";

describe("SignIn", () => {
    describe("SignInContainer", () => {
        it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
            const onSubmit = jest.fn();
            const initialValues = {
                username: "",
                password: "",
            };
            render(
                <SignInContainer
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                />
            );

            fireEvent.changeText(
                screen.getByPlaceholderText("username"),
                "kalle"
            );
            fireEvent.changeText(
                screen.getByPlaceholderText("password"),
                "password"
            );
            fireEvent.press(screen.getByText("Submit"));

            await waitFor(() => {
                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: "kalle",
                    password: "password",
                });
            });
        });
    });
});
