
import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import { navigate } from "../utils/rootNavigation";
import userHandler from "../utils/userHandler";
import Icon from "react-native-vector-icons/FontAwesome";



const CreateOffer = (props) => {

    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                <Text>CREATE OFFER</Text>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 18
    },
    infoContainer: {
        flexDirection: "column",
        marginLeft: 32
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infoContent: {
        fontSize: 18,
    },
    tinyIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 2
    },
});

export default CreateOffer;