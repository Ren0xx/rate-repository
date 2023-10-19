import AppBar from "./AppBar";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./RepositoryView";
import SignIn from "./SignIn";
import ReviewForm from "./ReviewForm";
import theme from "../theme";
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 8,
        backgroundColor: theme.colors.mainBackground,
        alignItems: "center",
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/create-review' element={<ReviewForm/>} />

                <Route path=':repositoryId' element={<SingleRepository />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </View>
    );
};

export default Main;
