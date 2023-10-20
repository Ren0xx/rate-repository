import { useState } from "react";
import { View } from "react-native";
import { Button, Menu, Divider, PaperProvider } from "react-native-paper";
type OrderProps = {
    setOrderingByLatest: () => void;
    setOrderingByHighestRating: () => void;
    setOrderingByLowestRating: () => void;
};
const OrderSelection = ({
    setOrderingByLatest,
    setOrderingByHighestRating,
    setOrderingByLowestRating,
}: OrderProps) => {
    const [visible, setVisible] = useState<boolean>(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <PaperProvider>
            <View
                style={{
                    marginBottom: 100,
                    height: 250,
                }}>
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}>Show menu</Button>}
                    anchorPosition="top">
                    <Menu.Item
                        onPress={setOrderingByLatest}
                        title='Latest Repositories'
                    />
                    <Menu.Item
                        onPress={setOrderingByHighestRating}
                        title='Highest Rated Repositories'
                    />
                    <Divider />
                    <Menu.Item
                        onPress={setOrderingByLowestRating}
                        title='Lowest Rated Repositories'
                    />
                </Menu>
            </View>
        </PaperProvider>
    );
};

export default OrderSelection;
