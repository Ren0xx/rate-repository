import { View } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";
const AppBarTab = ({ name, to }) => {
    return (
        <View style={{ margin: 4 }}>
            <Link to={to}>
                <Text
                    color='secondary'
                    fontSize={undefined}
                    fontWeight={undefined}
                    style={undefined}>
                    {name}
                </Text>
            </Link>
        </View>
    );
};

export default AppBarTab;
